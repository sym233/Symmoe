import * as React from 'react';

import TimeLineItemAnswer from '../component/TimeLineItemAnswer';
import { ITimeLineItem } from '../types';
import TimeLineItemQuestion from './TimeLineItemQuestion';
interface IProps {
  timeLineItem: ITimeLineItem;
}

const TimeLineItem: React.StatelessComponent<IProps> = ({ timeLineItem }) => {
  if (timeLineItem.itemType === 'answer') {
    return <TimeLineItemAnswer timeLineItem={timeLineItem} />;
  } else if (timeLineItem.itemType === 'question') {
    return <TimeLineItemQuestion timeLineItem={timeLineItem} />;
  } else {
    return null;
  }

};

export default TimeLineItem;
