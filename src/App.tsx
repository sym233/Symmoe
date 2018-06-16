import * as React from 'react';
import { Layout, Menu, Row, Col } from 'antd';
const { Header, Content, Footer } = Layout;

import { Route, Link, BrowserRouter, Switch } from 'react-router-dom';
import './App.css';

import Home from './Home';
import About from './About';
import Zhihu from './zhihu/Zhihu';

class App extends React.Component {
  public render() {
    return (
      <BrowserRouter>
        <Layout style={{ backgroundColor: 'transparent' }}>
          <Header 
            className="header" 
            style={{ backgroundColor: 'rgba(238, 239, 173, 0.69)', padding: '0 2em' }}
          >
            <Row 
              align="bottom"
              style={{ backgroundColor: 'transparent' }}
              gutter={8}
            >
              <Col span={4}>
                <Link to="/">
                  <h3 className="logo">symmoe</h3>
                </Link>
              </Col>
              <Col span={20}>
                <Menu
                  className="nav-bar"
                  style={{ backgroundColor: 'transparent', border: 'none' }}
                  mode="horizontal"
                >
                  <Menu.Item key="1">
                    <Link to="/">home</Link>
                  </Menu.Item>
                  <Menu.Item key="2">
                    <Link to="/zhihu">zhihu</Link>
                  </Menu.Item>
                  <Menu.Item key="3">
                    <Link to="/about">about</Link>
                  </Menu.Item>
                </Menu>
              </Col>
            </Row>

          </Header>
          <Content 
            className="content" 
            style={{
              minHeight: window.innerHeight,
              padding: '2%',
            }}
          >
            <Switch>
              <Route exact={true} path="/" component={Home}/>
              <Route path="/about" component={About}/>
              <Route path="/zhihu" component={Zhihu} />
            </Switch>
          </Content>

          <Footer className="footer" style={{backgroundColor: 'rgba(238, 239, 173, 0.69)'}}>
            <p>2017-2018 - 喵喵喵 - 桂ICP备17013295号</p>
            <p>Powered by 喵喵喵</p>
          </Footer>
        </Layout>
      </BrowserRouter>  
    );
  }
}

export default App;
