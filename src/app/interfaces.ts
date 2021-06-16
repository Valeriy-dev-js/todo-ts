export interface Task {
  name: string;
  done: boolean;
  uuid: string;
}

export interface Tasks {
  tasks: Task[];
}
