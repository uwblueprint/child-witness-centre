export type Role = "Volunteer" | "Staff" | "Admin";

export type TaskStatus = "Pending" | "Completed" | "Approved";

export type Token = {
  accessToken: string;
  refreshToken: string;
};

export type UserDTO = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: Role;
};

export type CreateUserDTO = Omit<UserDTO, "id"> & { password: string };

export type UpdateUserDTO = Omit<UserDTO, "id">;

export type RegisterUserDTO = Omit<CreateUserDTO, "role">;

export type TaskDTO = {
  id: string;
  title: string;
  description?: string;
  requiresApproval: boolean;
  status: TaskStatus;
  document?: string;
  dueDate?: Date;
  expiry?: Date;
};

export type CreateTaskDTO = Omit<TaskDTO, "id">;

export type UpdateTaskDTO = Omit<TaskDTO, "id">;

export type AuthDTO = Token & UserDTO;

export type Letters = "A" | "B" | "C" | "D";

export type NodemailerConfig = {
  service: "gmail";
  auth: {
    type: "OAuth2";
    user: string;
    clientId: string;
    clientSecret: string;
    refreshToken: string;
  };
};

export type SignUpMethod = "PASSWORD" | "GOOGLE";
