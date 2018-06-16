import { AsyncStatus, TActions, ActionTypes } from '../actions';

export interface IMyAnswer {
    questionId: number;
    answerDetail: string;
    answerAsyncStatus: AsyncStatus;
    answerTimeLocal: number;
}

function myAnswers(
    state: ReadonlyArray<IMyAnswer> = [],
    action: TActions,
): ReadonlyArray<IMyAnswer> {
    switch (action.type) {
        case ActionTypes.ANSWER_A_QUESTION: {
            let answerExists = false;
            const newState = state.map(answer => {
                if (answer.questionId === action.questionId) {
                    answerExists = true;
                    const newAnswer: IMyAnswer = {
                        questionId: action.questionId,
                        answerDetail: action.answerDetail,
                        answerAsyncStatus: action.asyncStatus,
                        answerTimeLocal: Date.now(),
                    };
                    return newAnswer;
                } else {
                    return answer;
                }
            });
            if (!answerExists) {
                const stateAndNewAnswer = state.concat({
                    questionId: action.questionId,
                    answerDetail: action.answerDetail,
                    answerAsyncStatus: action.asyncStatus,
                    answerTimeLocal: Date.now(),
                });
                return stateAndNewAnswer;
            }
            return newState;
        }
        default: {
            return state;
        }
    }
}

export default myAnswers;