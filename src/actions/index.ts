import { IQuestion, IAnswer, ITimeLineItem } from '../zhihu/types';
import { Action } from 'redux';
export enum ActionTypes {
    GET_TIME_LINE,
    GET_QUESTION,
    ANSWER_A_QUESTION,
    ADD_MY_ANSWER_TO_TREE,
    LOG_IN,
    LOG_OUT,
}
export enum AsyncStatus {
    unsubmitted = 'Unsubmitted',
    pending = 'Pending',
    done = 'Done',
    failed = 'Failed',
}

export interface IGetTimeLineAsync extends Action {
    type: ActionTypes.GET_TIME_LINE;
    items?: ITimeLineItem[];
    asyncStatus: AsyncStatus;
}
export interface IGetQuestionTreeAsync extends Action {
    type: ActionTypes.GET_QUESTION;
    asyncStatus: AsyncStatus;
    questionId: number;
    question?: IQuestion & {
        totalNumberOfAnswers: number;
        answers: IAnswer[];
    };
}
export interface IAnswerAQuestionAsync extends Action {
    type: ActionTypes.ANSWER_A_QUESTION;
    asyncStatus: AsyncStatus;
    questionId: number;
    answerDetail: string;
}
export interface IAddMyAnswerToTree extends Action {
    type: ActionTypes.ADD_MY_ANSWER_TO_TREE;
    answer: IAnswer;
}

export interface ILogInAsync extends Action {
    type: ActionTypes.LOG_IN;
    userName: string;
    uid?: number;
    asyncStatus: AsyncStatus;
}
export interface ILogOutAsync extends Action {
    type: ActionTypes.LOG_OUT;
    userName?: string;
    uid?: number;
    asyncStatus: AsyncStatus;
}
export type TActions = 
    IGetQuestionTreeAsync | 
    IGetTimeLineAsync |
    IAnswerAQuestionAsync | 
    IAddMyAnswerToTree |
    ILogInAsync |
    ILogOutAsync;

export function getQuestion(
    questionId: number,
    asyncStatus: AsyncStatus,
    totalNumberOfAnswers: number = 0,
    question?: IQuestion,
    answers?: IAnswer[],
): IGetQuestionTreeAsync {
    if (asyncStatus === AsyncStatus.done) {
        const o: IGetQuestionTreeAsync = {
            type: ActionTypes.GET_QUESTION,
            asyncStatus,
            questionId,
            question: Object.assign({}, question!, {
                totalNumberOfAnswers,
                answers: answers!,
            }),
        };
        // console.log('done', questionId, o);
        return o;
    } else {
        return {
            type: ActionTypes.GET_QUESTION,
            asyncStatus,
            questionId,
        };
    }
}

export function getTimeLine(
    asyncStatus: AsyncStatus,
    items?: ITimeLineItem[]
): IGetTimeLineAsync {
    return {
        type: ActionTypes.GET_TIME_LINE,
        items,
        asyncStatus,
    };
}

export function answerAQuestion(
    questionId: number,
    answerDetail: string,
    asyncStatus: AsyncStatus,
): IAnswerAQuestionAsync {
    return {
        type: ActionTypes.ANSWER_A_QUESTION,
        questionId,
        answerDetail,
        asyncStatus,
    };
}

export function addMyAnswerToTree(
    answer: IAnswer,
): IAddMyAnswerToTree {
    return {
        type: ActionTypes.ADD_MY_ANSWER_TO_TREE,
        answer,
    };
}

export function logIn(
    userName: string,
    asyncStatus: AsyncStatus,
    uid?: number,
): ILogInAsync {
    return {
        type: ActionTypes.LOG_IN,
        userName,
        asyncStatus,
        uid,
    };
}
export function logOut(
    asyncStatus: AsyncStatus,
    userName?: string,
    uid?: number,
): ILogOutAsync {
    return {
        type: ActionTypes.LOG_OUT,
        asyncStatus,
        userName,
        uid,
    };
}
