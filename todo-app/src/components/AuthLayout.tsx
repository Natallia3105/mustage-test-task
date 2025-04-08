import { Layout } from 'antd';
import { Content } from 'antd/es/layout/layout';
import { PropsWithChildren } from 'react';

const AuthLayout = ({ children }: PropsWithChildren) => {
  return (
    <Layout>
      <Content
        style={{
          margin: '100px auto',
          width: '100%',
          maxWidth: 400,
          padding: '0 48px',
        }}
      >
        {children}
      </Content>
    </Layout>
  );
};

export default AuthLayout;
