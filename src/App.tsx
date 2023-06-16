import React, { useState } from 'react';
import { Button, ConfigProvider, Divider, Tag } from 'antd';
import ButtonA from './components/ButtonA';
import './btn.css';

function App() {
  const [size, setSize] = useState(14);

  return (
    <>
      {/* <span className={styles['font-color']}>通过less module 修改颜色</span> */}
      {/* <Test1 /> */}
      {/* <Tip2 /> */}
      <Button
        type='primary'
        onClick={() => {
          setSize(size + 2);
        }}
      >
        +2 Button【{size}】
      </Button>
      <Button
        onClick={() => {
          setSize(size - 2);
        }}
      >
        -2 Button【{size}】
      </Button>
      <br />
      {/* <ButtonA>Default</ButtonA> */}
      {/* <ButtonA className='btn-override'>Override By ClassName</ButtonA> */}
      <ConfigProvider
        theme={{
          token: {
            mySize: size
          }
        }}
      >
        <ButtonA>Override By ConfigProvider</ButtonA>
      </ConfigProvider>
      <span className='test-btn'>覆盖样式</span>
      <div style={{ marginTop: '10px' }}>
        <Tag color='magenta'>magenta</Tag>
      </div>
      <Divider orientation={'left'}>Test</Divider>
    </>
  );
}
export default App;
