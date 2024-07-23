import { Task as TaskType } from "../types";
import Task from "./task";

interface TasksListProps {
  tasks: TaskType[];
  removeTask: (id: string) => void;
}

const TasksList: React.FC<TasksListProps> = ({
  tasks,
  removeTask,
}: TasksListProps) => {
  return (
    <div>
      <div className="inline-block w-11/12 border-2 rounded-md border-tertiary lg:mt-8 mt-4">
        {tasks.length === 0 ? (
          <p className="my-3 text-white text-base lg:text-xl">
            Take rest! You haven't any task{" "}
          </p>
        ) : (
          tasks.map((task) => (
            <Task key={task.id} task={task} removeTask={removeTask} />
          ))
        )}
      </div>
    </div>
  );
};

export default TasksList;
