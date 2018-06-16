import { IRootState } from '../../reducer';
import LoggingInArea, { IPropsFromState, IPropsFromDispatch } from '../component/LoggingInArea';
import { connect } from 'react-redux';
import * as action from '../../actions';
import { host } from '../../utils';

interface IOwnProps {
    empty?: any;
}

function mapStateToProps(state: IRootState, ownProps: IOwnProps): IPropsFromState {
    return {
        loggingState: state.loggingState,
    };
}

function logIn(userName: string, password: string) {
    return fetch(host + '/api/login', {
        body: JSON.stringify({
            userName,
            password,
        }),
        headers: {
            'content-type': 'application/json',
        },
        'method': 'post',
        'credentials': 'same-origin',
    });
}
function logOut() {
    return fetch(host + '/api/logout', {
        body: JSON.stringify({
        }),
        headers: {
            'content-type': 'application/json',
        },
        'method': 'post',
        'credentials': 'same-origin',
    });
}
type TDispatch = (action: action.TActions) => void;
function mapDispatchToProps(dispatch: TDispatch, ownProps: IOwnProps): IPropsFromDispatch {
    return {
        logIn: async (userName: string, password: string) => {
            dispatch(action.logIn(userName, action.AsyncStatus.pending));
            logIn(userName, password).then(
                res => res.json() as Promise<{
                    error: string,
                    userName?: string,
                    uid?: number,
                }> 
            ).then(
                res => {
                    if (res.error && res.error.length > 0) {
                        dispatch(action.logIn(userName, action.AsyncStatus.failed));
                        return Promise.reject(res.error);
                    } else {
                        dispatch(action.logIn(userName, action.AsyncStatus.done, res.uid!));
                        return Promise.resolve('Logging in successfully');
                    }
                }
            ).catch(
                reason => console.error(reason)
            );
        },
        logOut: async () => {
            dispatch(action.logOut(action.AsyncStatus.pending));
            logOut().then(
                res => res.json()
            ).then(
                (res: { error: string, userName?: string, uid?: number }) => {
                    if (res.error && res.error.length > 0) {
                        dispatch(action.logOut(action.AsyncStatus.failed));
                        return Promise.reject(res.error);
                    } else {
                        dispatch(action.logOut(action.AsyncStatus.done));
                        return Promise.resolve('Logging out successfully');
                    }
                }
            ).catch(
                reason => console.error(reason)
            );
        },
    };

}

export default connect(mapStateToProps, mapDispatchToProps)(LoggingInArea);
