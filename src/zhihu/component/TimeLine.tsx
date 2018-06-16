import * as React from 'react';

import { ITimeLineItem } from '../types/index';
import TimeLineItem from './TimeLineItem';
import { Timeline } from 'antd';
// import { host } from '../../utils';

// const url = host + '/api/timeline';

export interface IPropsFromState {
  timeLineItems: ReadonlyArray<ITimeLineItem>;
}

export interface IPropsFromDispatch {
  getTimeLine: () => void;
}

type TProps = IPropsFromState & IPropsFromDispatch;

class TimeLine extends React.PureComponent<TProps> {
  constructor(props: TProps) {
    super(props);
  }
  public componentDidMount() {
    this.props.getTimeLine();
  }
  public render() {
    if (this.props.timeLineItems) {
      return (
        <Timeline>
        {this.props.timeLineItems.map((item, i) => (
          <Timeline.Item key={i} style={{
            paddingTop: '1em',
          }}>
            <TimeLineItem timeLineItem={item} />
          </Timeline.Item>
        ))}
        </Timeline>
      );
    } else {
      return <p>loading</p>;
    }
  }
}

export default TimeLine;
// interface IReceivedTimeLine {
//   error: string;
//   items?: Array<{
//     itemType: 'answer';
//     question?: IQuestion;
//     answer?: IAnswer;
//   }>;
// }

// interface IState {
//   receivedTimeLine?: IReceivedTimeLine;
//   loading: boolean;
// }
// class TimeLine extends React.Component<{}, IState> {
//   constructor(props: any) {
//     super(props);
//     this.state = {
//       loading: true,
//     };
//   }
//   public componentDidMount() {
//     fetch(url, {
//       'method': 'get',
//       'credentials': 'include',
//     })
//       .then(res => res.json())
//       .then(res => this.setState({
//         receivedTimeLine: res as IReceivedTimeLine,
//       }))
//       .catch(reason => this.setState({
//         receivedTimeLine: {
//           error: reason as string,
//         },
//       }))
//       .then(res => this.setState({
//         loading: false,
//       }));
//   }
//   public render() {
//     const loading = this.state.loading;
//     const receivedTimeLine = this.state.receivedTimeLine;
//     if (loading) {
//       return <div>loading</div>;
//     }
//     if (receivedTimeLine) {
//       if (receivedTimeLine.error && receivedTimeLine.error.length > 0) {
//         return (
//           <div>
//             <h3>question error</h3>
//             <p>{receivedTimeLine.error}</p>
//           </div>
//         );
//       } else if (receivedTimeLine.items && receivedTimeLine.items.length > 0) {
//         return (
//           <div>
//             {receivedTimeLine.items.map((item, i) => (
//               <TimeLineItem key={i} timeLineItem={item} />
//             ))}
//           </div>
//         );
//       } else {
//         return null;
//       }
//     } else {
//       return null;
//     }
//   }
// }
// export default TimeLine;
