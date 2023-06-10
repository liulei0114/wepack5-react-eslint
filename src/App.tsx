import React from 'react';
import styles from './app.module.less';
import Test1 from './components/Test1';
import { Button } from 'antd';
import Tip2 from './components/Tip2';

function App() {
  return (
    <>
      <span className={styles['font-color']}>通过less module 修改颜色111112222</span>
      <Test1 />
      <Tip2 />
      <Button type='primary'>Button12222</Button>
    </>
  );
}
export default App;
