import { API_URL } from '../constants';
import { getAuthHeaders } from './auth';
import { Todo, TodoStatus } from '../models/todo';

export const deleteTodo = async (id: string): Promise<void> => {
  await fetch(`${API_URL}/todos/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });
};

export const updateTodo = async (
  id: string,
  data: Partial<Todo>,
): Promise<void> => {
  const response = await fetch(`${API_URL}/todos/${id}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Failed to update todo');
  }
};

export const markTodoAsDone = async (id: string): Promise<void> => {
  const response = await fetch(`${API_URL}/todos/${id}/complete`, {
    method: 'PATCH',
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    throw new Error('Failed to mark todo as done');
  }
};

export const searchTodos = async (
  q?: string,
  filterByStatus?: TodoStatus,
): Promise<Todo[]> => {
  const params = new URLSearchParams();

  if (q) params.append('search', q);

  if (filterByStatus) params.append('status', filterByStatus);

  const response = await fetch(`${API_URL}/todos?${params.toString()}`, {
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeaders(),
    },
  });

  const { data } = await response.json();

  return data;
};

export const createTodo = async (payload: Partial<Todo>): Promise<Todo> => {
  const response = await fetch(`${API_URL}/todos`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error('Failed to create todo');
  }

  const { data } = await response.json();

  return data as Todo;
};
