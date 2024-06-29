import React from 'react';
import { ReloadOutlined } from '@ant-design/icons';
import type { QRCodeProps } from 'antd';
import Button from '../../button';
import Spin from '../../spin';

import type { Locale } from '../../locale';

export type UseStatusRenderProps = {
  prefixCls: string;
  locale?: Locale['QRCode'];
  onRefresh?: QRCodeProps['onRefresh'];
  statusRender?: QRCodeProps['statusRender'];
};

export default function useStatusRender({
  prefixCls,
  locale,
  onRefresh,
  statusRender,
}: UseStatusRenderProps) {
  const defaultExpiredNode = (
    <>
      <p className={`${prefixCls}-expired`}>{locale?.expired}</p>
      {onRefresh && (
        <Button type="link" icon={<ReloadOutlined />} onClick={onRefresh}>
          {locale?.refresh}
        </Button>
      )}
    </>
  );
  const defaultSpin = <Spin />;

  const defaultScannedNode = <p className={`${prefixCls}-scanned`}>{locale?.scanned}</p>;

  const defaultNodes = {
    expired: defaultExpiredNode,
    loading: defaultSpin,
    scanned: defaultScannedNode,
  };

  const defaultStatusRender: QRCodeProps['statusRender'] = (_oriNode, info) =>
    defaultNodes[info.status];

  const mergedStatusRender = statusRender ?? defaultStatusRender;

  return {
    mergedStatusRender,
    defaultNodes,
  };
}