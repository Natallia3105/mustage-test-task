import { useEffect, useState } from 'react';
import { Layout, List, Typography } from 'antd';
import AppLayout from '../components/Layout';
import TodoFormModal from '../components/TodoFormModal';
import FilterSection from '../components/FilterSection';
import { useTodos } from '../hooks/todos';
import TodoItem from '../components/TodoItem';
import { deleteTodo, markTodoAsDone } from '../api/todos';
import { Todo, TodoStatus } from '../models/todo';

const { Content } = Layout;

const DashboardPage = () => {
  const [showForm, setShowForm] = useState(false);
  const { data, search, updateTodo, removeTodo, addTodo } = useTodos();
  const [editingTodo, setEditingTodo] = useState<Todo | undefined>();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<TodoStatus | undefined>();

  const handleSearch = (q: string) => {
    setSearchQuery(q);
  };

  useEffect(() => {
    search(searchQuery, statusFilter);
  }, [statusFilter, searchQuery]);

  return (
    <AppLayout>
      <Content style={{ padding: 24, maxWidth: 1000, margin: '0 auto' }}>
        <Typography.Title level={2}>📝 To-Do List</Typography.Title>

        <FilterSection
          onAddTodo={() => setShowForm(true)}
          onChangeFilter={(status) => {
            setStatusFilter(status);
          }}
          onChangeSearch={(q) => handleSearch(q)}
        />

        <List
          bordered
          dataSource={data}
          locale={{ emptyText: 'No tasks found.' }}
          style={{ border: 'none' }}
          renderItem={(item) => (
            <TodoItem
              todo={item}
              onDelete={async () => {
                await deleteTodo(item.id);
                removeTodo(item.id);
              }}
              onEdit={() => {
                setEditingTodo(item);
                setShowForm(true);
              }}
              onMarkDone={async () => {
                await markTodoAsDone(item.id);

                updateTodo({ ...item, status: TodoStatus.Done });
              }}
            />
          )}
        />
      </Content>

      {showForm && (
        <TodoFormModal
          open={showForm}
          onCancel={() => {
            setShowForm(false);
            setEditingTodo(undefined);
          }}
          todo={editingTodo}
          onSuccess={(todo) => {
            if (editingTodo) {
              updateTodo(todo);
            } else {
              addTodo(todo);
            }

            setEditingTodo(undefined);
            setShowForm(false);
          }}
        />
      )}
    </AppLayout>
  );
};

export default DashboardPage;
