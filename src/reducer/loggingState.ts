import { TActions, ActionTypes, AsyncStatus } from '../actions';

export interface ILoggingState {
    isLoggedIn: boolean;
    userName?: string;
    uid?: number;
    processing: boolean;
}
const defaultLogState: ILoggingState = {
    isLoggedIn: false,
    processing: false,
};

function LoggingState(
    LoggingState: ILoggingState = defaultLogState,
    action: TActions,
): ILoggingState {
    switch (action.type) {
        case ActionTypes.LOG_IN: {
            switch (action.asyncStatus) {
                case AsyncStatus.done: {
                    const newLoggingState: ILoggingState = {
                        isLoggedIn: true,
                        userName: action.userName!,
                        uid: action.uid!,
                        processing: false,
                    };
                    return newLoggingState;
                }
                case AsyncStatus.pending: {
                    const newLoggingState: ILoggingState = {   
                            ...LoggingState,
                            processing: true,
                        };
                    return newLoggingState;
                }
                case AsyncStatus.failed: {
                    const newLoggingState: ILoggingState = {
                        ...LoggingState,
                        processing: false,
                    };
                    return newLoggingState;
                }

                default: {
                    return LoggingState;
                }
            }
        }
        case ActionTypes.LOG_OUT: {
            switch (action.asyncStatus) {
                case AsyncStatus.done: {
                    const newLoggingState: ILoggingState = {
                        processing: false,
                        isLoggedIn: false,
                        userName: undefined,
                        uid: undefined,
                    };
                    return newLoggingState;
                }

                default: {
                    return LoggingState;
                }
            }
        }
        default: {
            return LoggingState;
        }
    }

}

export default LoggingState;
