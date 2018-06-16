import { IQuestion, IAnswer } from '../zhihu/types';

import { ActionTypes, AsyncStatus, TActions } from '../actions/index';

interface IAsyncStatus {
    asyncStatus: AsyncStatus;
}
export type TZhihuQuestionTree = IQuestion & IAsyncStatus & {
    totalNumberOfAnswers: number;
    answers: IAnswer[];
};

function zhihuQuestions(
    state: ReadonlyArray<TZhihuQuestionTree> = [],
    action: TActions
): ReadonlyArray<TZhihuQuestionTree> {
    switch (action.type) {
        case ActionTypes.GET_QUESTION: {

            if (action.asyncStatus === AsyncStatus.pending) {
                let questionExists = false;
                const newState = state.map(question => {
                    if (question.questionId === action.questionId) {
                        const newQuestion = Object.assign({}, question, {
                            asyncStatus: AsyncStatus.pending,
                        } as IAsyncStatus);
                        questionExists = true;
                        return newQuestion;
                    } else {
                        return question;
                    }
                });
                if (!questionExists) {
                    return newState.concat({
                        questionId: action.questionId,
                        questionTitle: '问题加载中...',
                        questionDetail: '问题加载中...',
                        publishTime: 0,
                        asyncStatus: AsyncStatus.pending,
                        answers: [],
                        totalNumberOfAnswers: 0,
                    } as TZhihuQuestionTree);
                }
                return newState;
            } else if (action.asyncStatus === AsyncStatus.done) {
                if (action.question) {
                    let questionExists = false;
                    const newState = state.map(question => {
                        if (question.questionId === action.questionId) {
                            // this question must have been in store
                            questionExists = true;
                            const newQuestion = Object.assign(
                                {},
                                action.question,
                                {   
                                    totalNumberOfAnswers: action.question!.totalNumberOfAnswers,
                                    asyncStatus: AsyncStatus.done,
                                },
                            );
                            return newQuestion;
                        } else {
                            return question;
                        }
                    });
                    if (!questionExists) {
                        throw new Error('question not exist in state');
                    }
                    return newState;
                } else {
                    throw new Error('action done without question property');
                }
            } else {
                // fetch question failed
                const newState = state.map(question => {
                    if (question.questionId === action.questionId) {
                        // this question must have been in store
                        const newQuestion = Object.assign(
                            {},
                            question,
                            {
                                questionTitle: '问题加载失败，请检查网络，重新加载',
                            } as Partial<IQuestion>,
                            {
                                asyncStatus: AsyncStatus.failed,
                            } as IAsyncStatus,
                        );
                        return newQuestion;
                    } else {
                        return question;
                    }
                });
                return newState;
            }
        }

        case ActionTypes.ADD_MY_ANSWER_TO_TREE: {
            let questionExists = false;
            let answerExists = false;
            const newQuestionTree = state.map(question => {
                if (question.questionId === action.answer.questionId) {
                    questionExists = true;
                    const newAnswer: IAnswer = {
                        answererUid: action.answer.answererUid,
                        answererName: action.answer.answererName,
                        questionId: action.answer.questionId,
                        answerId: action.answer.answerId,
                        answerDetail: action.answer.answerDetail,
                        publishTime: action.answer.publishTime,
                    };
                    const newAnswers = question.answers.map(answer => {
                        if (answer.answerId === newAnswer.answerId) {
                            answerExists = true;
                            return Object.assign({}, answer, newAnswer);
                        } else {
                            return answer;
                        }
                    });
                    if (!answerExists) {
                        newAnswers.push(newAnswer);
                    }
                    return Object.assign({}, question, {answers: newAnswers});
                } else {
                    return question;
                }
            });
            if (!questionExists) {
                throw new Error(`question ${action.answer.questionId} not in state`);
            }
            return newQuestionTree;
        }

        default: {
            return state;
        }
    }
}

export default zhihuQuestions;
