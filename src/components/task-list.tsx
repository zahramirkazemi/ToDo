import { Dispatch, SetStateAction } from "react";
import { Task as TaskType } from "../types";
import TaskBoard from "./task-board";

interface TasksListProps {
  tasks: TaskType[];
  setTasks: Dispatch<SetStateAction<TaskType[]>>;
}

const TasksList: React.FC<TasksListProps> = (props: TasksListProps) => (
  <div className="flex flex-wrap gap-4 w-11/12 border-2 rounded-md border-tertiary lg:mt-8 mt-4 mx-auto p-4 justify-center">
    {props.tasks.length === 0 ? (
      <p className="my-3 text-white text-base lg:text-xl">
        Take rest! You haven't any task{" "}
      </p>
    ) : (
      <TaskBoard {...props} />
    )}
  </div>
);

export default TasksList;
