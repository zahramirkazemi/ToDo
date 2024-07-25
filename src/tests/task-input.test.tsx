import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, test, expect, beforeEach, vi } from "vitest";
import { TaskState } from "../types";
import TaskInput from "../components/task-input";

describe("TaskInput Component", () => {
  let addTask: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    addTask = vi.fn();
  });

  test("renders input and button", () => {
    render(<TaskInput addTask={addTask} />);

    const input = screen.getByRole("textbox");
    const button = screen.getByRole("button", { name: /add/i });

    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  test("updates input value on change", () => {
    render(<TaskInput addTask={addTask} />);

    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "New Task" } });

    expect(input).toHaveValue("New Task");
  });

  test("adds task on button click", () => {
    render(<TaskInput addTask={addTask} />);

    const input = screen.getByRole("textbox");
    const button = screen.getByRole("button", { name: /add/i });

    fireEvent.change(input, { target: { value: "New Task" } });
    fireEvent.click(button);

    expect(addTask).toHaveBeenCalledWith({
      id: expect.any(String),
      title: "New Task",
      state: TaskState.ToDo,
    });
    expect(input).toHaveValue("");
  });

  test("adds task on Enter key press", () => {
    render(<TaskInput addTask={addTask} />);

    const input = screen.getByRole("textbox");

    fireEvent.change(input, { target: { value: "New Task" } });
    fireEvent.keyUp(input, { key: "Enter", code: "Enter" });

    expect(addTask).toHaveBeenCalledWith({
      id: expect.any(String),
      title: "New Task",
      state: TaskState.ToDo,
    });
    expect(input).toHaveValue("");
  });
});
