import { ButtonProps, GlobalToken, theme } from 'antd';
import { useStyleRegister } from '@ant-design/cssinjs';
import type { CSSInterpolation } from '@ant-design/cssinjs';
import classNames from 'classnames';
import React, { FC } from 'react';

const { useToken } = theme;

interface ButtonAProps extends ButtonProps {
  children?: any;
}

const ButtonA: FC<ButtonAProps> = ({ className, ...restProps }: ButtonAProps) => {
  const prefixCls = 'test-btn';

  const genStatusButtonStyle = (prefixCls: string, token: GlobalToken) => {
    return [
      {
        [`.${prefixCls}-error`]: {
          backgroundColor: token.colorErrorBg,
          color: token.colorErrorText
        },
        [`.${prefixCls}-success`]: {
          backgroundColor: token.colorSuccessBg,
          color: token.colorSuccessText
        }
      }
    ];
  };

  const genDefaultButtonStyle = (prefixCls: string, token: GlobalToken): CSSInterpolation => {
    return [
      {
        [`.${prefixCls}`]: {
          fontSize: token.mySize,
          color: token.colorText,
          '&:hover': {
            borderColor: token.colorFillContentHover
          }
        }
      }
    ];
  };

  const { theme, token, hashId } = useToken();

  // 全局注册，内部会做缓存优化
  const wrapSSR = useStyleRegister({ theme, token, hashId, path: [prefixCls] }, () => [
    genDefaultButtonStyle(prefixCls, token),
    genStatusButtonStyle(prefixCls, token)
  ]);

  const statusCls = {
    [`${prefixCls}-success`]: token.mySize === 16,
    [`${prefixCls}-error`]: token.mySize === 18
  };

  return wrapSSR(
    <button className={classNames(prefixCls, statusCls, hashId, className)} {...restProps} />
  );
};

export default ButtonA;
