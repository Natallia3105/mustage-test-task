export enum TodoStatus {
  InProgress = 'in_progress',
  Done = 'done',
}

export type Todo = {
  id: string;
  title: string;
  description: string;
  userId: string;
  status: TodoStatus;
  createdAt: string;
  updatedAt: string;
};
