import { Button, Col, Input, Row, Select, Space } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { TodoStatus } from '../models/todo';
import { useDebouncedCallback } from 'use-debounce';

interface Props {
  onAddTodo(): void;
  onChangeSearch(q: string): void;
  onChangeFilter(status: TodoStatus): void;
}

const FilterSection = ({
  onAddTodo,
  onChangeSearch,
  onChangeFilter,
}: Props) => {
  const debounced = useDebouncedCallback((value: string) => {
    onChangeSearch(value);
  }, 500);

  return (
    <Row gutter={[16, 16]} align="middle" style={{ marginBottom: 24 }}>
      <Col xs={24} md={12}>
        <Space.Compact style={{ width: '100%' }}>
          <Input
            placeholder="Search todos..."
            onChange={(e) => debounced(e.target.value)}
            allowClear
          />
          <Select
            onChange={(value) => {
              if (value === 'all') {
                onChangeFilter(undefined);
              } else {
                onChangeFilter(value as TodoStatus);
              }
            }}
            defaultValue="all"
            options={[
              { value: 'all', label: 'All' },
              { value: TodoStatus.InProgress, label: 'In Progress' },
              { value: TodoStatus.Done, label: 'Done' },
            ]}
            style={{ width: 150 }}
          />
        </Space.Compact>
      </Col>

      <Col xs={24} md={12} style={{ textAlign: 'right' }}>
        <Button type="primary" icon={<PlusOutlined />} onClick={onAddTodo}>
          Add Task
        </Button>
      </Col>
    </Row>
  );
};

export default FilterSection;
