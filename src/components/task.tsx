import { useDraggable } from "@dnd-kit/core";
import { Task as TaskType } from "../types";

interface TaskProps {
  task: TaskType;
  removeTask: (id: string) => void;
  grabbed?: boolean;
}

const Task: React.FC<TaskProps> = ({
  task,
  grabbed,
  removeTask,
}: TaskProps) => {
  const { attributes, listeners, setNodeRef } = useDraggable({
    id: task.id,
  });

  return (
    <div className="relative my-2 bg-tertiary rounded-md">
      <label
        ref={setNodeRef}
        {...listeners}
        {...attributes}
        htmlFor={task.id}
        className={`block ${
          grabbed ? "cursor-grabbing" : "cursor-pointer"
        } select-none text-white text-left p-3 pr-10 sm:text-sm text-xs peer-checked:text-dipricate peer-checked:line-through peer-checked:decoration-secondary peer-checked:decoration-2`}
      >
        {task.title}
      </label>
      <button
        onClick={() => removeTask(task.id)}
        className="absolute top-3 right-4 text-secondary sm:text-sm text-xs"
      >
        X
      </button>
    </div>
  );
};

export default Task;
