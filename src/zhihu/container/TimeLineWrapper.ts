import { connect } from 'react-redux';

import { IRootState } from '../../reducer';
import * as action from '../../actions';
import { host } from '../../utils';
import { ITimeLineItem } from '../types';
import TimeLine from '../component/TimeLine';

const timeLineUrl = host + '/api/timeline';

function mapStateToProps(state: IRootState, ownProps: {}) {
    return {
        timeLineItems: state.timeLineItems,
    };
}

type TDispatch = (action: action.TActions) => void;
function mapDispatchToProps(dispatch: TDispatch, ownProps: {}) {
    return {
        getTimeLine: async () => {
            dispatch(action.getTimeLine(action.AsyncStatus.pending));
            fetch(timeLineUrl + `?ts=${Date.now()}`, {
                'credentials': 'include',
            }).then(
                res => {
                    if (res.headers.has('loggingUid') && res.headers.has('loggingUserName')) {
                        const userName = res.headers.get('loggingUserName') as string;
                        const uid = Number.parseInt(res.headers.get('loggingUid') as string);
                        if (Number.isInteger(uid)) {
                            console.log('auto log in', userName);
                            dispatch(action.logIn(userName, action.AsyncStatus.done, uid));
                        }
                    } else {
                        dispatch(action.logOut(action.AsyncStatus.done));
                    }
                    return res.json() as Promise<{ 
                        items: ITimeLineItem[],
                    } & {
                        error: string,
                    }>;
                }
            ).then(
                res => {
                    if (res.error && res.error.length > 0) {
                        return Promise.reject(res.error);
                    } else {
                        // console.log(res.items);
                        dispatch(action.getTimeLine(action.AsyncStatus.done, res.items));
                        return Promise.resolve('');
                    }
                }
            ).catch(reason => {
                console.error(reason);
                dispatch(action.getTimeLine(action.AsyncStatus.failed));
            });

        },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(TimeLine);
