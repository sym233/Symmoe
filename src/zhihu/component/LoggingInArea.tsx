import * as React from 'react';

import { ILoggingState } from '../../reducer/loggingState';
export interface IPropsFromState {
  loggingState: ILoggingState;
}
export interface IPropsFromDispatch {
  logIn: (userName: string, password: string) => void;
  logOut: () => void;
}

type TProps = IPropsFromState & IPropsFromDispatch;

let userName: string = '';
let password: string = '';

// function loggingInButtonClick(e: React.MouseEvent<HTMLButtonElement>) {

//   e.preventDefault();
// }

const LoggingInArea: React.StatelessComponent<TProps> = ({ loggingState, logIn, logOut }) => {
  if (loggingState.isLoggedIn) {
    return (
      <div>
        <p>{`欢迎您，${loggingState.userName}.`}</p>
        <button
          onClick={
            (e: React.MouseEvent<HTMLButtonElement>) => {
              logOut();
              e.preventDefault();
            }
          }
        >登出</button>
      </div>
    );
  } else {
    return (
      <div>
        <h4>登录后可以回答问题</h4>
        <form>
          <label>
            用户名：
            <br />
            <input
              type="text"
              placeholder="Input User Name"
              onChange={
                (e: React.ChangeEvent<HTMLInputElement>) => userName = e.target.value
              }
            />
          </label>
          <br />
          <label>
            密码：
            <br />
            <input
              type="password"
              placeholder="Input Password"
              onChange={
                (e: React.ChangeEvent<HTMLInputElement>) => password = e.target.value
              }
            />
          </label>
          <br />
          <br />
          <button
            type="submit"
            onClick={
              (e: React.MouseEvent<HTMLButtonElement>) => {
                logIn(userName, password);
                e.preventDefault();
              }
            }
          >
            登入
          </button>
        </form>
        <br />
        <p>测试：请使用test/test登录</p>
        <p>我并不会写后端，请不要攻击后端、恶意/善意xss</p>
      </div>
    );
  }
};

export default LoggingInArea;
