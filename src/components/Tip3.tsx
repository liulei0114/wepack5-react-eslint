import React, { Suspense, lazy, useState } from 'react';
const LazyDemo = lazy(
  () =>
    import(
      /* webpackPrefetch: true */ // 开启prefetch预获取
      '@/components/LazyDemo'
    )
); // 使用import语法配合react的Lazy动态引入资源

const Tip3: React.FC = () => {
  const [show, setShow] = useState(false);

  // 点击事件中动态引入css, 设置show为true
  const onClick = () => {
    setShow(true);
  };

  return (
    <>
      <h1>我是tip3</h1>
      <h2 onClick={onClick}>展示</h2>
      {/* show为true时加载LazyDemo组件 */}
      {show && (
        <Suspense fallback={null}>
          <LazyDemo />
        </Suspense>
      )}
    </>
  );
};

export default Tip3;
