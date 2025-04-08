import { Button, Card, Col, Row, Tag, Tooltip, Typography } from 'antd';
import {
  CheckCircleOutlined,
  DeleteOutlined,
  EditOutlined,
} from '@ant-design/icons';
import { Todo, TodoStatus } from '../models/todo';

type Props = {
  todo: Todo;

  onEdit(): void;
  onDelete(): void;
  onMarkDone(): void;
};

const statusLabel = {
  [TodoStatus.Done]: 'Done',
  [TodoStatus.InProgress]: 'In Progress',
};

const statusColor = {
  [TodoStatus.Done]: 'green',
  [TodoStatus.InProgress]: 'blue',
};

const TodoItem = ({ todo, onEdit, onDelete, onMarkDone }: Props) => {
  return (
    <Card size="small" style={{ marginBottom: 16 }}>
      <Row gutter={[16, 16]} align="middle" justify="space-between" wrap>
        <Col xs={24} sm={18}>
          <Typography.Text strong style={{ fontSize: 16 }}>
            {todo.title}
          </Typography.Text>
          <br />
          <Typography.Text type="secondary">{todo.description}</Typography.Text>
          <div style={{ marginTop: 8 }}>
            <Tag color={statusColor[todo.status]}>
              {statusLabel[todo.status]}
            </Tag>
          </div>
        </Col>

        <Col xs={24} sm={6}>
          <Row justify="end" gutter={[8, 8]}>
            {todo.status === TodoStatus.InProgress && (
              <Col>
                <Tooltip title="Mark as done">
                  <Button
                    icon={<CheckCircleOutlined />}
                    type="default"
                    onClick={onMarkDone}
                  />
                </Tooltip>
              </Col>
            )}
            <Col>
              <Button icon={<EditOutlined />} onClick={onEdit} />
            </Col>
            <Col>
              <Button danger icon={<DeleteOutlined />} onClick={onDelete} />
            </Col>
          </Row>
        </Col>
      </Row>
    </Card>
  );
};

export default TodoItem;
