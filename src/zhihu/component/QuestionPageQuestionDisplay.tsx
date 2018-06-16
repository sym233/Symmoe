import * as React from 'react';
import { IQuestion } from '../types/index';

interface IProps {
    question: IQuestion;
}

const QuestionPageQuestionDisplay: React.StatelessComponent<IProps> = ({ question }) => (
    <div>
        <h3>{question.questionTitle}</h3>
        <p>{question.questionDetail}</p>
        <span>提问于{new Date(question.publishTime).toDateString()}</span>
    </div>
);
export default QuestionPageQuestionDisplay;
