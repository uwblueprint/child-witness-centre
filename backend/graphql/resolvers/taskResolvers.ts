import { TaskDTO, CreateTaskDTO, UpdateTaskDTO } from "../../types";
import TaskService from "../../services/implementations/taskService";
import ITaskService from "../../services/interfaces/taskService";

const taskService: ITaskService = new TaskService();

const taskResolvers = {
  Query: {
    task: async (
      _parent: undefined,
      { id }: { id: string },
    ): Promise<TaskDTO> => {
      return taskService.getTaskById(id);
    },
    tasks: async (): Promise<TaskDTO[]> => {
      return taskService.getTasks();
    },
  },
  Mutation: {
    createTask: async (
      _parent: undefined,
      { task }: { task: CreateTaskDTO },
    ): Promise<TaskDTO> => {
      return taskService.createTask(task);
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
    ): Promise<string> => {
      return taskService.deleteTask(id);
    },
  },
};

export default taskResolvers;
