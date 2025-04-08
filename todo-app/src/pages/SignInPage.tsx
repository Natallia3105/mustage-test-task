import { Button, Form, Input, Typography } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { signIn } from '../api/auth';
import { ROUTES } from '../constants';
import AuthLayout from '../components/AuthLayout';

const SignInPage = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: any) => {
    try {
      setLoading(true);
      await signIn(values);
      navigate(ROUTES.Dashboard);
    } catch (error: any) {
      const message = error?.message || 'Sign in failed';

      form.setFields([
        {
          name: 'email',
          errors: [message],
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <Typography.Title level={2}>Sign In</Typography.Title>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item
          name="email"
          label="Email"
          rules={[
            {
              required: true,
              message: 'Please enter your email!',
            },
            {
              type: 'email',
              message: 'Please enter a valid email address!',
            },
          ]}
        >
          <Input placeholder="you@example.com" />
        </Form.Item>
        <Form.Item
          name="password"
          label="Password"
          rules={[
            {
              required: true,
              message: 'Please enter your password!',
            },
          ]}
        >
          <Input.Password placeholder="Password" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block loading={loading}>
            Sign In
          </Button>
        </Form.Item>
      </Form>

      <Typography.Paragraph style={{ marginTop: 16 }}>
        Don't have an account? <Link to={ROUTES.SignUp}>Sign Up</Link>
      </Typography.Paragraph>
    </AuthLayout>
  );
};

export default SignInPage;
