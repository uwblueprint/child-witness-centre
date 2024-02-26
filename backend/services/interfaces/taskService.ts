import { CreateTaskDTO, UpdateTaskDTO, TaskDTO } from "../../types";

interface ITaskService {
  /**
   * Get task associated with id
   * @param id task's id
   * @returns a TaskDTO with task's information
   * @throws Error if task retrieval fails
   */
  getTaskById(id: string): Promise<TaskDTO>;

  /**
   * Get all tasks
   * @returns array of TaskDTOs
   * @throws Error if task retrieval fails
   */
  getTasks(): Promise<Array<TaskDTO>>;

  /**
   * Create a task
   * @param task the task to be created
   * @returns a TaskDTO with the created task's information
   * @throws Error if task creation fails
   */
  createTask(task: CreateTaskDTO): Promise<TaskDTO>;

  /**
   * Update a task.
   * @param id task's id
   * @param task the task to be updated
   * @returns a TaskDTO with the updated task's information
   * @throws Error if task update fails
   */
  updateTaskById(id: string, task: UpdateTaskDTO): Promise<TaskDTO>;

  /**  
   * Delete a task by id
   * @param id task's id
   * @throws Error if task deletion fails
   */
  deleteTask(id: string): Promise<string>;
}

export default ITaskService;
