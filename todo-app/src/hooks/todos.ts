import { useState } from 'react';
import { Todo, TodoStatus } from '../models/todo';
import { searchTodos } from '../api/todos';

export const useTodos = () => {
  const [data, setData] = useState<Todo[]>([]);

  return {
    data,
    updateTodo(editedTodo: Todo) {
      setData(
        data.map((todo) =>
          todo.id === editedTodo.id ? { ...todo, ...editedTodo } : todo,
        ),
      );
    },
    removeTodo(id: string) {
      setData((prev) => prev.filter((todo) => todo.id !== id));
    },
    addTodo(todo: Todo) {
      setData([todo, ...data]);
    },
    async search(q?: string, status?: TodoStatus) {
      const todos = await searchTodos(q, status);

      setData(todos);
    },
  };
};
