import React, { useEffect } from 'react';

function LazyDemo() {
  useEffect(() => {
    const a = [1, 2].includes(2);
    console.log(a);
  }, []);
  return <h3>我是懒加载组件组件1</h3>;
}

export default LazyDemo;
