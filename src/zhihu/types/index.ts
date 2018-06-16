export interface IQuestion {
    questionId: number;
    questionTitle: string;
    questionDetail: string;
    publishTime: number;
}
export interface IAnswer {
    answererUid: number;
    answererName: string;
    questionId: number;
    answerId: number;
    answerDetail: string;
    publishTime: number;
}

export interface IReceivedQuestionAndAnswer {
    error: string;
    question?: IQuestion;
    answers?: IAnswer[];
    totalNumberOfAnswers: number;
}

export interface ITimeLineItem {
    itemType: 'question' | 'answer';
    
    question?: IQuestion;
    answer?: IAnswer;
}
