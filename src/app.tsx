import { useState } from "react";

import TaskInput from "./components/task-input";
import { Task } from "./types";

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const addTask = (task: Task): void => {
    if (!task.title || /^\s*$/.test(task.title)) {
      return;
    }

    const newTasks = [task, ...tasks];

    setTasks(newTasks);
  };

  return (
    <div className="flex justify-center lg:mt-10 mt-6 h-full w-full">
      <div className="h-5/6 w-11/12 border-2 border-tertiary rounded-md text-center lg:p-8 p-4">
        <h1 className="lg:text-2xl text-lg font-bold">
          Clear your mind, tackle your tasks!
        </h1>
        <TaskInput addTask={addTask} />
      </div>
    </div>
  );
};

export default App;
