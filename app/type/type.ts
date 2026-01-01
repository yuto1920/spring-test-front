export interface Task {
  id: number;
  title: string;
}

// Javaの TaskForm と同じ形にする（作成用）
export interface TaskForm {
  title: string;
}