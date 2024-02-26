import * as firebaseAdmin "firebase-admin";

import ITaskService from "../interfacestaskService";
import MgTask, { Task } from "../../models/task.model";
import { CreateTaskDTO, TaskDTO, UpdateTaskDTO } from "../../types";
import { getErrorMessage } from "../../utilities/errorUtils";
import logger from "../../utilities/logger";

const Logger = logger(__filename);

const getMongoTaskById = async (taskId: string): Promise<Task> => {
  const task: Task | null = await MgTask.findById(taskId);
  if (!task) {
    throw new Error(`task with id ${taskId} not found.`);
  }
  return task;
};

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
      Logger.error(
        `Failed to get tasks. Reason = ${getErrorMessage(error)}`,
      );
      throw error;
    }
  }

  async createTask(
    task: CreateTaskDTO,
  ): Promise<TaskDTO> {
    let newTask: Task | null;
    try {
      newTask = await MgTask.create(task);
      if (newTask) {
        return {
            id: newTask.id,
            title: newTask.title,
            description: task.description,
            requiresApproval: task.requiresApproval,
            status: task.status,
            document: task.document,
            dueDate: task.dueDate,
            expiry: task.expiry,
        };
      }
    } catch (error: unknown) {
      Logger.error(
        `Failed to create task. Reason = ${getErrorMessage(error)}`,
      );
      throw error;
    }
  }

  async deleteTask(taskId: string): Promise<void> {
    try {
      const task = await getMongoTaskById(taskId);

      if (!task) {
        throw new Error(`taskId ${taskId} not found.`);
      }

      await MgTask.findByIdAndDelete(taskId);

    } catch (error: unknown) {
      Logger.error(`Failed to delete task. Reason = ${getErrorMessage(error)}`);
      throw error;
    }
  }
}

export default TaskService;
