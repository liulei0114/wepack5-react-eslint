import React, { useEffect } from 'react';
import './app.less';
import MyImage from './asset/test.png';
import Tip from '@/components/Tip';
import Tip2 from '@/components/Tip2';
import Tip3 from './components/Tip3';

function App() {
  useEffect(() => {
    const { a, b, c } = { a: 1, b: 2, c: 3 };
    console.log(a, b, c);
  }, []);
  return (
    <>
      <h2>{process.env.NODE_ENV}</h2>
      <h2>{process.env.BASE_ENV}</h2>
      <h3>你好1</h3>
      <img src={MyImage} />
      <div className='smallImg' />
      <Tip />
      <Tip2 />
      <Tip3 />
    </>
  );
}
export default App;
