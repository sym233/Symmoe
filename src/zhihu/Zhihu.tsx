import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import ZhihuMain from './component/ZhihuMain';
import ZhihuQuestion from './component/ZhihuQuestion';
import LoggingInAreaWrapper from './container/LoggingInAreaWrapper';
import { Layout } from 'antd';
const { Sider, Content } = Layout;

const Zhihu = () => (
  <Layout style={{
    backgroundColor: 'transparent',
  }}>
    <Content>
      <Switch>
        <Route exact={true} path="/zhihu" component={ZhihuMain} />
        <Route exact={true} path="/zhihu/question/:questionId" component={ZhihuQuestion} />
      </Switch>
    </Content>
    <Sider 
      width="25%"
      style={{
        backgroundColor: 'transparent',
        borderLeft: '1px solid #6ba4fb80',
        paddingLeft: '2em',
      }}
    >
      <LoggingInAreaWrapper />
    </Sider>
  </Layout>
);

export default Zhihu;
