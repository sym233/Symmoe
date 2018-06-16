import * as React from 'react';
// import { ReceivedQuestionAndAnswer } from '../types/index';
import QuestionPageWrapper from '../container/QuestionPageWrapper';
// const url = (questionId: string) => `http://127.0.0.1:3000/api/question/${questionId}`;

interface IProps {
  match: {
    params: {
      questionId: string;
    };
  };
}

const ZhihuQuestion: React.StatelessComponent<IProps> = ({
  match: {
    params: {
      questionId,
    }
  }
}) => {
  const parsedQuestionId = Number.parseInt(questionId);
  if (!isNaN(parsedQuestionId)) {
    return (
      <QuestionPageWrapper questionId={parsedQuestionId} />
    );
  } else {
    return (
      <div>问题id错误</div>
    );
  }
};
  // // 
// //     <div>
// //         这是问题{props.match.params.questionId}
// //     </div>
// // );
// interface State {
//   loading: boolean;
//   receivedQuestionAndAnswer?: ReceivedQuestionAndAnswer;
// }

// class ZhihuQuestion extends React.Component<Props, State> {
//   constructor(props: Props) {
//     super(props);
//     this.state = {
//       loading: true,
//     };
//   }
//   public componentDidMount() {
//     fetch(url(this.props.match.params.questionId))
//       .then(res => res.json())
//       .then(json => this.setState({
//         receivedQuestionAndAnswer: json as ReceivedQuestionAndAnswer
//       }))
//       .catch(reason => this.setState({
//         receivedQuestionAndAnswer: {
//           error: reason as string,
//         },
//       }))
//       .then(res => this.setState({
//         loading: false,
//       }));
//   }
//   public render() {
//     const loading = this.state.loading;
//     const receivedQuestionAndAnswer = this.state.receivedQuestionAndAnswer;
//     if (loading) {
//       return <div>loading</div>;
//     } else if (receivedQuestionAndAnswer) {
//       if (receivedQuestionAndAnswer.error && receivedQuestionAndAnswer.error.length > 0) {
//         return (
//           <div>
//             <h3>question error</h3>
//             <p>{receivedQuestionAndAnswer.error}</p>
//           </div>
//         );
//       } else {
//         return <QuestionPage questionAndAnswer={receivedQuestionAndAnswer} />;
//       }
//     } else {
//       return null;
//     }
//   }
// }

export default ZhihuQuestion;