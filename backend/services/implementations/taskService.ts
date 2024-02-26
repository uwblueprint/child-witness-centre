import ITaskService from "../interfaces/taskService";
import MgTask, { Task } from "../../models/task.model";
import { CreateTaskDTO, TaskDTO, UpdateTaskDTO } from "../../types";
import { getErrorMessage } from "../../utilities/errorUtils";
import logger from "../../utilities/logger";

const Logger = logger(__filename);

class TaskService implements ITaskService {
  /* eslint-disable class-methods-use-this */
  async getTaskById(id: string): Promise<TaskDTO> {
    let task: Task | null;
    try {
      task = await MgTask.findById(id);
      if (!task) {
        throw new Error(`Task id ${id} not found.`);
      }
    } catch (error: unknown) {
      Logger.error(`Failed to get task. Reason = ${getErrorMessage(error)}`);
      throw error;
    }

    return {
      id: task.id,
      title: task.title,
      description: task.description,
      requiresApproval: task.requiresApproval,
      status: task.status,
      document: task.document,
      dueDate: task.dueDate,
      expiry: task.expiry,
    };
  }

  async getTasks(): Promise<TaskDTO[]> {
    try {
      const tasks: Array<TaskDTO> = await MgTask.find();
      return tasks.map((task) => ({
        id: task.id,
        title: task.title,
        description: task.description,
        requiresApproval: task.requiresApproval,
        status: task.status,
        document: task.document,
        dueDate: task.dueDate,
        expiry: task.expiry,
      }));
    } catch (error: unknown) {
      Logger.error(`Failed to get tasks. Reason = ${getErrorMessage(error)}`);
      throw error;
    }
  }

  async createTask(task: CreateTaskDTO): Promise<TaskDTO> {
    let newTask: Task;
    try {
      newTask = await MgTask.create(task);
    } catch (error: unknown) {
      Logger.error(`Failed to create task. Reason = ${getErrorMessage(error)}`);
      throw error;
    }
    return {
      id: newTask.id,
      title: newTask.title,
      description: newTask.description,
      requiresApproval: newTask.requiresApproval,
      status: newTask.status,
      document: newTask.document,
      dueDate: newTask.dueDate,
      expiry: newTask.expiry,
    };
  }

  async updateTaskById(id: string, task: UpdateTaskDTO): Promise<TaskDTO> {
    let updatedTask: Task | null;
    try {
      updatedTask = await MgTask.findByIdAndUpdate(id, task, {
        new: true,
        runValidators: true,
      });
      if (!updatedTask) {
        throw new Error(`Task id ${id} not found`);
      }
    } catch (error: unknown) {
      Logger.error(`Failed to update task. Reason = ${getErrorMessage(error)}`);
      throw error;
    }
    return {
      id: updatedTask.id,
      title: updatedTask.title,
      description: updatedTask.description,
      requiresApproval: updatedTask.requiresApproval,
      status: updatedTask.status,
      document: updatedTask.document,
      dueDate: updatedTask.dueDate,
      expiry: updatedTask.expiry,
    };
  }

  async deleteTask(id: string): Promise<string> {
    try {
      const deletedTask: Task | null = await MgTask.findByIdAndDelete(id);
      if (!deletedTask) {
        throw new Error(`Task id ${id} not found`);
      }
      return id;
    } catch (error: unknown) {
      Logger.error(`Failed to delete task. Reason = ${getErrorMessage(error)}`);
      throw error;
    }
  }
}

export default TaskService;
