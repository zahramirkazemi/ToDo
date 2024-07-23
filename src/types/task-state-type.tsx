import TaskState from "./task-state-enum";

export type TaskStateType =
  | TaskState.ToDo
  | TaskState.Inprogress
  | TaskState.Done;

export default TaskStateType;
