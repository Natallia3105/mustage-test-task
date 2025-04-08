import { Button, Form, Input, Typography } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { signUp } from '../api/auth';
import { ROUTES } from '../constants';
import { useState } from 'react';
import AuthLayout from '../components/AuthLayout';

const SignUpPage = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: any) => {
    try {
      setLoading(true);
      await signUp(values);
      navigate(ROUTES.Dashboard);
    } catch (error: any) {
      const message = error?.message || 'Sign up failed';

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
      <Typography.Title level={2}>Sign Up</Typography.Title>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item
          name="name"
          label="Name"
          rules={[{ required: true, message: 'Please enter your name!' }]}
        >
          <Input placeholder="John Doe" />
        </Form.Item>
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
            {
              min: 2,
              message: 'Password must be at least 2 characters long!',
            },
          ]}
        >
          <Input.Password placeholder="Password" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block loading={loading}>
            Sign Up
          </Button>
        </Form.Item>
      </Form>
      <Typography.Paragraph style={{ marginTop: 16 }}>
        Already have an account? <Link to={ROUTES.SignIn}>Sign In</Link>
      </Typography.Paragraph>
    </AuthLayout>
  );
};

export default SignUpPage;
