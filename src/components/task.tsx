import { Task as TaskType, TaskState } from "../types";

interface TaskProps {
  task: TaskType;
  removeTask: (id: string) => void;
}

const Task: React.FC<TaskProps> = ({ task, removeTask }: TaskProps) => {
  return (
    <div className="relative my-4">
      <input
        type="checkbox"
        className="peer absolute opacity-0 w-0 h-0 cursor-pointer"
        id={task.id}
        checked={task.state === TaskState.Done}
      />
      <span className="absolute w-4 h-4 sm:w-5 sm:h-5 border-2 border-secondary rounded-md top-0.5 left-4 checkmark peer-checked:after:block peer-checked:bg-secondary after:hidden after:absolute cursor-pointer after:left-1.5 after:w-1.5 after:h-3.5 after:border-white after:border-b-2 after:border-r-2 after:rotate-45"></span>
      <label
        htmlFor={task.id}
        className="block cursor-pointer select-none text-white text-left pl-11 pr-5 sm:text-sm text-xs peer-checked:text-dipricate peer-checked:line-through peer-checked:decoration-secondary peer-checked:decoration-2"
      >
        {task.title}
      </label>
      <button
        onClick={() => removeTask(task.id)}
        className="absolute -top-px right-4 text-secondary sm:text-sm text-xs"
      >
        X
      </button>
    </div>
  );
};

export default Task;
