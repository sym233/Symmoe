import * as Redux from 'redux';
import { TActions } from '../actions';
import timeLineItems from './timeLineItems';
import zhihuQuestions, { TZhihuQuestionTree } from './zhihuQuestions';
import myAnswers, { IMyAnswer } from './myAnswers';
import loggingState, { ILoggingState } from './loggingState';
import { ITimeLineItem } from '../zhihu/types';

export interface IRootState {
    readonly timeLineItems: ReadonlyArray<ITimeLineItem>;
    readonly zhihuQuestions: ReadonlyArray<TZhihuQuestionTree>;
    readonly myAnswers: ReadonlyArray<IMyAnswer>;
    readonly loggingState: ILoggingState;
}

type TReducers = {
    [P in keyof IRootState]: (state: IRootState[P] | undefined, action: TActions) => IRootState[P];
};

const reducers: TReducers = {
    timeLineItems,
    zhihuQuestions,
    myAnswers,
    loggingState,
};

const reducer = Redux.combineReducers<IRootState, TActions>(reducers);

export default reducer;
