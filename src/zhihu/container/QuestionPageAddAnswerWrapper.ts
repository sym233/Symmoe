import { IRootState } from '../../reducer';
import { IMyAnswer } from '../../reducer/myAnswers';
import { AsyncStatus, TActions, answerAQuestion, addMyAnswerToTree } from '../../actions';
import { connect } from 'react-redux';
import QuestionPageAddAnswer, { IPropsFromState, IPropsFromDispatch } from '../component/QuestionPageAddAnswer';
import { host } from '../../utils';

interface IPostAnswer {
    questionId: number;
    answerDetail: string;
}
function newAnswer(postQuestion: IPostAnswer) {
    return fetch(host + '/api/zhihu/new_answer', {
        body: JSON.stringify(postQuestion),
        headers: {
            'content-type': 'application/json',
        },
        'method': 'post',
        'credentials': 'include',
    });
}

interface IProps {
    questionId: number;
}

let isLoggingIn = false;
let userName: string | undefined;
let uid: number | undefined;

function mapStateToProps(state: IRootState, ownProps: IProps): IPropsFromState {
    isLoggingIn = state.loggingState.isLoggedIn;
    userName = state.loggingState.userName;
    uid = state.loggingState.uid;

    const questionId = ownProps.questionId;
    const answer = state.myAnswers.find(ans => ans.questionId === questionId);
    if (answer !== undefined) {
        return {
            loggingState: state.loggingState,
            answer,
        };
    } else {
        const tempAnswer: IMyAnswer = {
            questionId,
            answerDetail: '',
            answerAsyncStatus: AsyncStatus.unsubmitted,
            answerTimeLocal: 0,
        };
        return {
            loggingState: state.loggingState,
            answer: tempAnswer,
        };
    }
}

type TDispatch = (action: TActions) => void;

function mapDispatchToProps(dispatch: TDispatch, ownProps: IProps): IPropsFromDispatch {

    const questionId = ownProps.questionId;
    return {
        postAnswer: async (answerDetail: string) => {
            if (!isLoggingIn) {
                console.error('not logging in, can\'t answer question');
                return;
            }
            dispatch(answerAQuestion(questionId, answerDetail, AsyncStatus.pending));
            newAnswer({
                questionId,
                answerDetail,
            }).then(
                res => res.json() as Promise<{
                    error: string;
                    answerId?: number;
                }>
            ).then(
                res => {
                    if (res.error && res.error.length > 0) {
                        return Promise.reject(res.error);
                    } else {
                        dispatch(answerAQuestion(questionId, answerDetail, AsyncStatus.done));
                        dispatch(addMyAnswerToTree({
                            answererName: userName!,
                            answererUid: uid!,
                            questionId,
                            answerDetail,
                            answerId: res.answerId!,
                            publishTime: Date.now(),
                        }));
                        return Promise.resolve('done');
                    }
                }
            ).catch(
                reason => {
                    console.error(reason);
                    dispatch(answerAQuestion(questionId, answerDetail, AsyncStatus.failed));
                }
            );
        },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(QuestionPageAddAnswer);
