import { ITimeLineItem } from '../zhihu/types';
import { TActions, ActionTypes, AsyncStatus } from '../actions';

function timeLineItems(state: ReadonlyArray<ITimeLineItem> = [], action: TActions) {
    switch (action.type) {
        case ActionTypes.GET_TIME_LINE: {
            switch (action.asyncStatus) {
                case AsyncStatus.done: {
                    return action.items!;
                }
                default: {
                    return state;
                }
            }
            
        }
        default: {
            return state;
        }
    }
}

export default timeLineItems;
