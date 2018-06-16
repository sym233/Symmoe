import * as React from 'react';
import { Link } from 'react-router-dom';
import { Tooltip } from 'antd';
import { IAnswer } from '../types/index';

interface IProps {
  answer: IAnswer;
}
const margin: React.CSSProperties = {
  marginRight: '1em',
};

const AnAnswer: React.StatelessComponent<IProps> = ({ answer }) => (
  <section style={{
    margin: '0.5em',
  }}>
    <h4>{answer.answererName}</h4>
    <p>{answer.answerDetail}</p>
    <div>
      <span style={margin}>回答于{new Date(answer.publishTime).toDateString()}</span>
      <Tooltip placement="topLeft" title="暂时不可用">
        <Link to="#" style={margin}>赞</Link>
        <Link to="#" style={margin}>评论</Link>
      </Tooltip>
    </div>
  </section>
);
export default AnAnswer;