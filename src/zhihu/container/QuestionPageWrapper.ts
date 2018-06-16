import { connect } from 'react-redux';
import QuestionPage from '../component/QuestionPage';
import { getQuestion, AsyncStatus, TActions, logIn, logOut } from '../../actions';
import { IRootState } from '../../reducer';
import { IReceivedQuestionAndAnswer } from '../types';
import { TZhihuQuestionTree } from '../../reducer/zhihuQuestions';
import { host } from '../../utils';

const getQuestionUrl = (questionId: number) => `${host}/api/question/${questionId}?ts=${Date.now()}`;
interface IOwnProps {
    questionId: number;
}

interface IStateToProps {
    questionTree: TZhihuQuestionTree;
}
function mapStateToProps(state: IRootState, ownProps: IOwnProps): IStateToProps {
    const questionId = ownProps.questionId;
    const questionTree = state.zhihuQuestions.find(questionTree => questionTree.questionId === questionId);
    if (questionTree === undefined) {
        return {
            questionTree: {
                questionTitle: '问题加载中...',
                questionDetail: '问题加载中...',
                questionId,
                publishTime: 0,
                asyncStatus: AsyncStatus.failed,
                totalNumberOfAnswers: 0,
                answers: [],
            },
        };
    } else {
        return {
            questionTree,
        };
    }
}
interface IDispatchToProps {
    getQuestion: (questionId: number) => void;
}
type Dispatch = (action: TActions) => void;

function mapDispatchToProps(dispatch: Dispatch, ownProps: IOwnProps): IDispatchToProps {
    const questionId = ownProps.questionId;
    return {
        getQuestion: async () => {
            dispatch(getQuestion(questionId, AsyncStatus.pending));

            fetch(
                getQuestionUrl(questionId),
                {
                    'credentials': 'include',
                }
            ).then(
                res => {
                    if (res.headers.has('loggingUid') && res.headers.has('loggingUserName')) {
                        const userName = res.headers.get('loggingUserName') as string;
                        const uid = Number.parseInt(res.headers.get('loggingUid') as string);
                        if (Number.isInteger(uid)) {
                            console.log('question page auto log in', userName);
                            dispatch(logIn(userName, AsyncStatus.done, uid));
                        }
                    } else {
                        dispatch(logOut(AsyncStatus.done));
                    }
                    return res.json() as Promise<IReceivedQuestionAndAnswer>;
                }
            ).then(
                res => {
                    if (res.error.length > 0) {
                        return Promise.reject(res.error);
                    } else {
                        dispatch(
                            getQuestion(
                                questionId, 
                                AsyncStatus.done, 
                                res.totalNumberOfAnswers, 
                                res.question!, 
                                res.answers!
                            )
                        );
                        return Promise.resolve('done');
                    }
                }
            ).catch(
                reason => {
                    console.error(reason);
                    dispatch(getQuestion(questionId, AsyncStatus.failed));
                }
            );
        },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(QuestionPage);
