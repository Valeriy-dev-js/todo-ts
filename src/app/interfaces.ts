export interface Task {
  name: string;
  done: boolean;
  uuid: string;
  createdAt: string;
}

export type Tasks = Task[]
