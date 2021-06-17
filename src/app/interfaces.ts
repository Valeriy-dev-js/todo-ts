export interface Task {
  name: string;
  done: boolean;
  uuid: string;
  createdAt: string;
}

export type Tasks = Task[]

export interface Alert {
  isAlert: boolean;
  message: string;
  status: number;
}
