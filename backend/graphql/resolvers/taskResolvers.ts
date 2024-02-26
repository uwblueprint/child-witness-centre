import TaskService from "../../services/implementations/taskService";
import ITaskService from "../../services/interfaces/taskService";
import { CreateTaskDTO, UpdateTaskDTO, TaskDTO } from "../../types";

const taskService: ITaskService = new TaskService();

const userResolvers = {
  Query: {
    taskById: async (
      _parent: undefined,
      { id }: { id: string },
    ): Promise<TaskDTO> => {
      return taskService.getTaskById(id);
    },
    tasks: async (): Promise<TaskDTO[]> => {
      return taskService.getTask();
    },
  },
  Mutation: {
    createTask: async (
      _parent: undefined,
      { task }: { task: CreateTaskDTO },
    ): Promise<TaskDTO> => {
      const newTask = await taskService.createTask(task);
      return newTask;
    },
    updateTask: async (
      _parent: undefined,
      { id, task }: { id: string; task: UpdateTaskDTO },
    ): Promise<TaskDTO> => {
      return taskService.updateTaskById(id, task);
    },
    deleteTask: async (
      _parent: undefined,
      { id }: { id: string },
    ): Promise<void> => {
      return taskService.deleteTask(id);
    },
  },
};

export default userResolvers;
