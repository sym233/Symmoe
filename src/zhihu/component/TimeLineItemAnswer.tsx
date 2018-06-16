import * as React from 'react';
import { Link } from 'react-router-dom';

import { IQuestion, IAnswer } from '../types/index';
interface IProps {
  timeLineItem: {
    question?: IQuestion;
    answer?: IAnswer;
  };
}
const questionUrl = (questionId: number) => `/zhihu/question/${questionId}`;

const TimeLineItemAnswer: React.StatelessComponent<IProps> = ({ timeLineItem }) => (
  <div>
    <h4>
      新回答：
      <Link 
        to={questionUrl(timeLineItem.question!.questionId)}
      >{timeLineItem.question!.questionTitle}</Link>
    </h4>
    <div>
      来自：
      {timeLineItem.answer!.answererName}
    </div>
    <p>{timeLineItem.answer!.answerDetail}</p>
    <span>发表于{new Date(timeLineItem.answer!.publishTime).toDateString()}</span>
  </div>
);

export default TimeLineItemAnswer;
