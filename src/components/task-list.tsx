import { Dispatch, SetStateAction, useState } from "react";
import {
  useSensors,
  useSensor,
  PointerSensor,
  DndContext,
  closestCorners,
  DragStartEvent,
  DragEndEvent,
  DragOverlay,
  DropAnimation,
  defaultDropAnimation,
} from "@dnd-kit/core";
import { TaskState, Task as TaskType } from "../types";
import Cart from "./cart";
import Task from "./task";

interface TasksListProps {
  tasks: TaskType[];
  removeTask: (id: string) => void;
  setTasks: Dispatch<SetStateAction<TaskType[]>>;
}

const TasksList: React.FC<TasksListProps> = ({
  tasks,
  removeTask,
  setTasks,
}: TasksListProps) => {
  const [activeTaskId, setActiveTaskId] = useState<null | string>(null);
  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    const newTasks = tasks.map((task) => {
      if (task.id === active.id) {
        task.state = over?.id as TaskState;
        return task;
      } else {
        return task;
      }
    });
    setTasks([...newTasks]);
    setActiveTaskId(null);
  };
  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragStart = ({ active }: DragStartEvent) => {
    setActiveTaskId(active.id as string);
  };

  const dropAnimation: DropAnimation = {
    ...defaultDropAnimation,
  };
  const task = activeTaskId
    ? tasks.find((task) => task.id === activeTaskId)
    : null;

  return (
    <div className="flex flex-wrap gap-4 w-11/12 border-2 rounded-md border-tertiary lg:mt-8 mt-4 mx-auto p-4 justify-center">
      {tasks.length === 0 ? (
        <p className="my-3 text-white text-base lg:text-xl">
          Take rest! You haven't any task{" "}
        </p>
      ) : (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCorners}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <Cart title={TaskState.ToDo}>
            {tasks
              .filter(
                (task) =>
                  task.state === TaskState.ToDo && task.id !== activeTaskId
              )
              ?.map((task) => (
                <Task task={task} removeTask={removeTask} />
              ))}
          </Cart>
          <Cart title={TaskState.Inprogress}>
            {tasks
              .filter(
                (task) =>
                  task.state === TaskState.Inprogress &&
                  task.id !== activeTaskId
              )
              ?.map((task) => (
                <Task task={task} removeTask={removeTask} />
              ))}
          </Cart>
          <Cart title={TaskState.Done}>
            {tasks
              .filter(
                (task) =>
                  task.state === TaskState.Done && task.id !== activeTaskId
              )
              ?.map((task) => (
                <Task task={task} removeTask={removeTask} />
              ))}
          </Cart>

          <DragOverlay dropAnimation={dropAnimation}>
            {task ? <Task task={task} removeTask={removeTask} grabbed /> : null}
          </DragOverlay>
        </DndContext>
      )}
    </div>
  );
};

export default TasksList;
