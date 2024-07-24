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

interface TaskBoardProps {
  tasks: TaskType[];
  setTasks: Dispatch<SetStateAction<TaskType[]>>;
}

const TaskBoard: React.FC<TaskBoardProps> = ({
  tasks,
  setTasks,
}: TaskBoardProps) => {
  const boardStates = [TaskState.ToDo, TaskState.Inprogress, TaskState.Done];
  const [activeTaskId, setActiveTaskId] = useState<null | string>(null);
  const sensors = useSensors(useSensor(PointerSensor));
  const dropAnimation: DropAnimation = {
    ...defaultDropAnimation,
  };
  const task = activeTaskId
    ? tasks.find((task) => task.id === activeTaskId)
    : null;

  const removeTask = (id: string): void => {
    const removedTasks = [...tasks].filter((task) => task.id !== id);
    setTasks(removedTasks);
  };

  const handleDragEnd = ({ active, over }: DragEndEvent): void => {
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

  const handleDragStart = ({ active }: DragStartEvent): void =>
    setActiveTaskId(active.id as string);

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      {boardStates.map((boardState) => (
        <Cart title={boardState} key={boardState}>
          {tasks
            .filter(
              (task) => task.state === boardState && task.id !== activeTaskId
            )
            ?.map((task) => (
              <Task key={task.id} task={task} removeTask={removeTask} />
            ))}
        </Cart>
      ))}

      <DragOverlay dropAnimation={dropAnimation}>
        {task ? <Task task={task} removeTask={removeTask} grabbed /> : null}
      </DragOverlay>
    </DndContext>
  );
};

export default TaskBoard;
