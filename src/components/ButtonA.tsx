import { ButtonProps, GlobalToken, theme } from 'antd';
import { useStyleRegister } from '@ant-design/cssinjs';
import type { CSSInterpolation, CSSObject } from '@ant-design/cssinjs';
import classNames from 'classnames';
import React, { FC } from 'react';

const { useToken } = theme;

interface ButtonAProps extends ButtonProps {
  children?: any;
}

const ButtonA: FC<ButtonAProps> = ({ className, ...restProps }: ButtonAProps) => {
  const prefixCls = 'test-btn';
  // 通用样式
  const genSharedButtonStyle = (prefixCls: string, token: GlobalToken): CSSInterpolation => ({
    [`.${prefixCls}`]: {
      fontSize: token.mySize
    },
  });

  // 实心底色样式
  const genSolidButtonStyle = (
    prefixCls: string,
    token: GlobalToken,
    postFn: () => CSSObject
  ): CSSInterpolation => [
    genSharedButtonStyle(prefixCls, token),
    {
      [`.${prefixCls}`]: {
        ...postFn()
      }
    }
  ];

  // 默认样式
  const genDefaultButtonStyle = (prefixCls: string, token: GlobalToken): CSSInterpolation =>
    genSolidButtonStyle(prefixCls, token, () => ({
      color: token.colorText,

      '&:hover': {
        borderColor: token.colorFillContentHover
      }
    }));

  const { theme, token, hashId } = useToken();

  // 全局注册，内部会做缓存优化
  const wrapSSR = useStyleRegister({ theme, token, hashId, path: [prefixCls] }, () => [
    genDefaultButtonStyle(prefixCls, token)
  ]);

  return wrapSSR(<button className={classNames(prefixCls, hashId, className)} {...restProps} />);
};

export default ButtonA;
