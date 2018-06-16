import * as React from 'react';
// import { ReceivedQuestionAndAnswer } from '../types/index';
import QuestionPageQuestionDisplay from './QuestionPageQuestionDisplay';
import QuestionPageAnswersDisplay from './QuestionPageAnswersDisplay';
import { Link } from 'react-router-dom';
// import QuestionPageAddAnswer from './QuestionPageAddAnswer';
// import { IAnswer } from '../types';
import { TZhihuQuestionTree } from '../../reducer/zhihuQuestions';
import QuestionPageAddAnswerWrapper from '../container/QuestionPageAddAnswerWrapper';

interface IProps {
  // questionAndAnswer: ReceivedQuestionAndAnswer;
  questionTree: TZhihuQuestionTree;
  getQuestion: () => void;
}

// const QuestionPage: React.StatelessComponent<IProps> = ({
//   question,
//   getQuestion,
// }) => (
//   <div>
//     <Link to="/zhihu">back to timeline</Link>
//     <QuestionPageQuestionDisplay question={question!} />
//     <hr />
//     {/* <QuestionPageAnswersDisplay answers={answers!} />
//     <hr/> 
//     <QuestionPageAddAnswer questionId={question!.questionId} />*/}
//   </div>
// );

class QuestionPage extends React.PureComponent<IProps> {
  public componentDidMount() {
    this.props.getQuestion();
  }
  public render() {
    const questionTree = this.props.questionTree;
    return (
      <div>
        <button>
          <Link to="/zhihu">返回时间线</Link>
        </button>
        <br />
        <br />
        <QuestionPageQuestionDisplay question={questionTree} />
        <hr />
        <QuestionPageAnswersDisplay
          answers={questionTree.answers}
          totalNumberOfAnswers={questionTree.totalNumberOfAnswers}
        />
        <hr/>  
        <QuestionPageAddAnswerWrapper
          questionId={questionTree.questionId}
        />
      </div>
    );
  }
}

export default QuestionPage;