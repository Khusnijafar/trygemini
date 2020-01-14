import React from 'react';
import { Card, Typography, Alert, Icon } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';

export default (): React.ReactNode => (
  <PageHeaderWrapper content="This page can only be viewed with admin privileges.">
    <Card>
      <Alert
        message="New version is now available, welcome to start the experience with Gemini."
        type="success"
        showIcon
        banner
        style={{
          margin: -12,
          marginBottom: 48,
        }}
      />
      <Typography.Title level={2} style={{ textAlign: 'center' }}>
        <Icon type="smile" theme="twoTone" /> Gemini Next Generation{' '}
        <Icon type="heart" theme="twoTone" twoToneColor="#eb2f96" /> You
      </Typography.Title>
    </Card>
    <p style={{ textAlign: 'center', marginTop: 24 }}>
      Want to add more pages? Please refer to{' '}
      <a href="https://pro.ant.design/docs/block-cn" target="_blank" rel="noopener noreferrer">
        use block
      </a>
      。
    </p>
  </PageHeaderWrapper>
);
