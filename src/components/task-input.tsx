import { useState } from "react";
import { Task, TaskState } from "../types";

interface TaskInputProps {
  addTask: (task: Task) => void;
}

const TaskInput: React.FC<TaskInputProps> = ({ addTask }: TaskInputProps) => {
  const [input, setInput] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void =>
    setInput(event.target.value);

  const handleSubmit = (): void => {
    addTask({
      id: Date.now().toString(),
      title: input,
      state: TaskState.ToDo,
    });

    setInput("");
  };

  const handleEnterClick = (event: React.KeyboardEvent<HTMLElement>): void => {
    if (event.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <div className="w-11/12 m-auto lg:mt-8 mt-4">
      <input
        onChange={handleChange}
        onKeyUp={handleEnterClick}
        value={input}
        className="w-5/6 border border-secondary h-9 bg-primary text-white px-3 text-sm lg:text-xs rounded-l-md focus-visible:outline-none"
      ></input>
      <button
        onClick={handleSubmit}
        className="bg-secondary text-white w-1/6 h-9 text-sm lg:text-xs rounded-r-md"
      >
        Add
      </button>
    </div>
  );
};

export default TaskInput;
