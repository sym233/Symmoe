import * as React from 'react';

import { IMyAnswer } from '../../reducer/myAnswers';
import { ILoggingState } from '../../reducer/loggingState';
// interface IPostAnswer {
//     questionId: number;
//     answerDetail: string;
// }
// function newAnswer(postQuestion: IPostAnswer) {
//     return fetch('http://localhost:3000/api/zhihu/new_answer', {
//         body: JSON.stringify(postQuestion),
//         headers: {
//             'content-type': 'application/json',
//         },
//         'method': 'post',
//     });
// }

export interface IPropsFromState {
  loggingState: ILoggingState;
  answer: IMyAnswer;
}
export interface IPropsFromDispatch {
  postAnswer: (answerDetail: string) => void;
}
type TProps = IPropsFromState & IPropsFromDispatch;

let answerDetail = '';

const QuestionPageAddAnswer: React.StatelessComponent<TProps> = ({ loggingState, answer, postAnswer }) => {
  if (loggingState.isLoggedIn) {
    return (
      <div>
        <div>
          {answer.answerTimeLocal === 0 ?
            '未保存' :
            `上次保存于${new Date(answer.answerTimeLocal).toDateString()}`
          }
        </div>
        <textarea
          defaultValue={answer.answerDetail}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => answerDetail = e.target.value}
        />
        <br />
        <button
          onClick={() => postAnswer(answerDetail)}
        >
          提交
        </button>
      </div>
    );
  } else {
    return (
      <p>can't answer without logging in</p>
    );
  }
};
export default QuestionPageAddAnswer;
