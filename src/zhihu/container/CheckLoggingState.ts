// import { IRootState } from '../../reducer';
// import * as action from '../../actions';
// import { connect } from 'react-redux';
// import { ILoggingState } from '../../reducer/loggingState';

// interface IPropsFromState {
//     loggingState: ILoggingState;
// }

// function mapStateToProps(state: IRootState): IPropsFromState {
//     return {
//         loggingState: state.loggingState,
//     };
// }
// type TDispatch = (action: action.TActions) => void;
// interface IPropsFromDispatch {
//     logIn: (userName: string, uid: number) => void;
//     logOut: () => void;
// }
// function mapDispatchToProps(dispatch: TDispatch): IPropsFromDispatch {
//     return {
//         logIn: (userName: string, uid: number) => {
//             dispatch(action.logIn(userName, action.AsyncStatus.done, uid));
//         },
//         logOut: () => {
//             dispatch(action.logOut(action.AsyncStatus.done));
//         },
//     };
// }

// const Checker: React.StatelessComponent<IPropsFromState & IPropsFromDispatch> = ({
//     loggingState,
//     logIn,
//     logOut,
// }) => {
//     console.log('checking');
//     const cookies = document.cookie.split(';');
//     const loggingStateCookie =  cookies.find(cookie => cookie.startsWith('miao='));
//     if (loggingStateCookie === undefined) {
//         if (loggingState.isLoggedIn) {
//             logOut();
//         }
//     } else if (loggingStateCookie.length < 7) {
//         if (loggingState.isLoggedIn) {
//             logOut();
//         }
//     } else {
//         logIn('test', 0);
//     }

//     return null;
// };

// export default connect(mapStateToProps, mapDispatchToProps)(Checker);
