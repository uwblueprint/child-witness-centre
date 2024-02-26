import UserService from "../../services/implementations/userService";
import IUserService from "../../services/interfaces/userService";
import { CreateUserDTO, UpdateUserDTO, UserDTO } from "../../types";
import { generateCSV } from "../../utilities/CSVUtils";

const taskService: ITaskService = new TaskService();

const userResolvers = {
  Query: {
    userById: async (
      _parent: undefined,
      { id }: { id: string },
    ): Promise<UserDTO> => {
      return userService.getUserById(id);
    },
    userByEmail: async (
      _parent: undefined,
      { email }: { email: string },
    ): Promise<UserDTO> => {
      return userService.getUserByEmail(email);
    },
    users: async (): Promise<UserDTO[]> => {
      return userService.getUsers();
    },
    usersCSV: async (): Promise<string> => {
      const users = await userService.getUsers();
      const csv = await generateCSV<UserDTO>({ data: users });
      return csv;
    },
  },
  Mutation: {
    createUser: async (
      _parent: undefined,
      { user }: { user: CreateUserDTO },
    ): Promise<UserDTO> => {
      const newUser = await userService.createUser(user);
      await authService.sendEmailVerificationLink(newUser.email);
      return newUser;
    },
    updateUser: async (
      _parent: undefined,
      { id, user }: { id: string; user: UpdateUserDTO },
    ): Promise<UserDTO> => {
      return userService.updateUserById(id, user);
    },
    deleteUserById: async (
      _parent: undefined,
      { id }: { id: string },
    ): Promise<void> => {
      return userService.deleteUserById(id);
    },
    deleteUserByEmail: async (
      _parent: undefined,
      { email }: { email: string },
    ): Promise<void> => {
      return userService.deleteUserByEmail(email);
    },
  },
};

export default userResolvers;
