import * as React from 'react';
import { Link } from 'react-router-dom';

import { IQuestion } from '../types/index';
interface IProps {
  timeLineItem: {
    question?: IQuestion;
  };
}
const questionUrl = (questionId: number) => `/zhihu/question/${questionId}`;

const TimeLineItemQuestion: React.StatelessComponent<IProps> = ({ timeLineItem: { question }}) => (
  <div>
    <h4>
      新问题：
      <Link to={questionUrl(question!.questionId)}>
        {question!.questionTitle}
      </Link>
    </h4>
    <p>{question!.questionDetail}</p>
    <span>
      提问于：
      {new Date(question!.publishTime).toDateString()}
    </span>
  </div>
);

export default TimeLineItemQuestion;
