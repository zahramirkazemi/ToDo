import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, test, expect, beforeEach, vi } from "vitest";
import { TaskState, Task as TaskType } from "../types";
import TaskBoard from "../components/task-board";

describe("TaskBoard Component", () => {
  const initialTasks: TaskType[] = [
    { id: "1", title: "Task 1", state: TaskState.ToDo },
    { id: "2", title: "Task 2", state: TaskState.Inprogress },
    { id: "3", title: "Task 3", state: TaskState.Done },
  ];
  let setTasks: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    setTasks = vi.fn();
  });

  test("renders the task board with tasks", () => {
    render(<TaskBoard tasks={initialTasks} setTasks={setTasks} />);

    expect(screen.getByText(TaskState.ToDo)).toBeInTheDocument();
    expect(screen.getByText(TaskState.Inprogress)).toBeInTheDocument();
    expect(screen.getByText(TaskState.Done)).toBeInTheDocument();

    expect(screen.getByText("Task 1")).toBeInTheDocument();
    expect(screen.getByText("Task 2")).toBeInTheDocument();
    expect(screen.getByText("Task 3")).toBeInTheDocument();
  });

  test("removes a task from the task board", () => {
    render(<TaskBoard tasks={initialTasks} setTasks={setTasks} />);

    // Find the remove button by its text content
    const task1RemoveButton = screen
      .getByText("Task 1")
      .parentElement?.querySelector("button");

    // Ensure the button exists before clicking it
    expect(task1RemoveButton).not.toBeNull();
    fireEvent.click(task1RemoveButton!);

    expect(setTasks).toHaveBeenCalledWith([
      { id: "2", title: "Task 2", state: TaskState.Inprogress },
      { id: "3", title: "Task 3", state: TaskState.Done },
    ]);
  });
});
