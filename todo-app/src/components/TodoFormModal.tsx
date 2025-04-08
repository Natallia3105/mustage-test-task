import { Form, Input, Modal, Select } from 'antd';
import { useEffect, useState } from 'react';
import { Todo, TodoStatus } from '../models/todo';
import { updateTodo, createTodo } from '../api/todos';

type TodoFormValues = {
  title: string;
  description: string;
  status: TodoStatus;
};

type Props = {
  open: boolean;
  todo?: Todo;

  onCancel(): void;
  onSuccess(todo: Todo): void;
};

const TodoFormModal = ({ open, onCancel, onSuccess, todo }: Props) => {
  const [form] = Form.useForm<TodoFormValues>();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (open && todo) {
      form.setFieldsValue({
        title: todo.title,
        description: todo.description,
      });
    } else {
      form.resetFields();
    }
  }, [open, todo, form]);

  const handleSubmit = async (values: TodoFormValues) => {
    try {
      setLoading(true);

      if (todo) {
        await updateTodo(todo.id, values);

        onSuccess({ ...todo, ...values });
      } else {
        const createdTodo = await createTodo({
          ...values,
          status: TodoStatus.InProgress,
        });
        onSuccess(createdTodo);
      }

      form.resetFields();
    } catch (error) {
      console.log(error.message);
    }

    setLoading(false);
  };

  const titleText = todo ? 'Update task' : 'Add new task';
  const AddBtnText = todo ? 'Edit' : 'Add';

  return (
    <Modal
      title={titleText}
      open={open}
      onCancel={onCancel}
      onOk={() => form.submit()}
      okText={AddBtnText}
      loading={loading}
    >
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item
          name="title"
          label="Title"
          rules={[{ required: true, message: 'Please enter a title' }]}
        >
          <Input placeholder="Task title" />
        </Form.Item>

        <Form.Item
          name="description"
          label="Description"
          rules={[{ required: true, message: 'Please enter a description' }]}
        >
          <Input.TextArea placeholder="Description..." rows={3} />
        </Form.Item>

        {todo && (
          <Form.Item name="status" label="Status">
            <Select
              defaultValue={todo.status}
              options={[
                { value: TodoStatus.InProgress, label: 'In Progress' },
                { value: TodoStatus.Done, label: 'Done' },
              ]}
              style={{ width: 150 }}
            />
          </Form.Item>
        )}
      </Form>
    </Modal>
  );
};

export default TodoFormModal;
