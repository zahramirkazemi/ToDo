import TaskStateType from "./task-state-type";

interface Task {
  id: string;
  title: string;
  state: TaskStateType;
}

export default Task;
