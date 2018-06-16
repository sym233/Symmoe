import * as React from 'react';
import { List } from 'antd';

import { IAnswer } from '../types/index';
import AnAnswer from './AnAnswer';

interface IProps {
  totalNumberOfAnswers: number;
  answers: IAnswer[];
}
const QuestionPageAnswersDisplay: React.StatelessComponent<IProps> = (
  { answers, totalNumberOfAnswers }
) => {
  if (answers.length === 0) {
    return <h4>还没有回答</h4>;
  } else {
    return (
      <>
        <h4>{`有${totalNumberOfAnswers}个回答`}</h4>
        <List
          dataSource={answers}
          renderItem={(answer: IAnswer) => <AnAnswer answer={answer} />}
        />
      </>
    );
  }
};
export default QuestionPageAnswersDisplay;
