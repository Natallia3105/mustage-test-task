import React from 'react';
import { Button, Layout, Menu } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';
import { ROUTES } from '../constants';
import { signOut } from '../api/auth';
import { useNavigate } from 'react-router-dom';

const { Header, Content, Footer } = Layout;

const AppLayout = ({ children }: React.PropsWithChildren) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    signOut();
    navigate(ROUTES.SignIn);
  };

  return (
    <Layout>
      <Header
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
        }}
      >
        <Button
          onClick={handleLogout}
          type="text"
          icon={<LogoutOutlined />}
          style={{ color: 'white' }}
        >
          Logout
        </Button>
      </Header>
      <Content style={{ padding: '0 48px' }}>
        <div>{children}</div>
      </Content>
    </Layout>
  );
};

export default AppLayout;
