import * as React from 'react';
import { Link } from 'react-router-dom';

const About = () => (
  <div className="about">
    <h3>About</h3>
    <p>
      尝试着做一个网站，不知道写什么
      <br />
      <Link to="/zhihu">纸糊</Link>是一个模仿知乎功能的demo，作为使用redux的练习
      <br />
      后端很简陋，基本是到处复制的
      <br />
      使用到的技术栈/轮子：
      <br />
      React、Redux、React-Router、Typescript、Ant-Design、Express
      <br />
      <br />
      Lorem ipsum dolor sit amet consectetur adipisicing elit.
      <br/>
      Ex harum architecto officia illo exercitationem ullam
      <br/>
      tempore excepturi recusandae reiciendis beatae unde
      <br/>
      accusamus inventore, quibusdam debitis incidunt 
      <br/>
      fugit minima molestiae dolor!
    </p>
  </div>
);

export default About;
