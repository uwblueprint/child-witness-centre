import { gql } from "apollo-server-express";

const taskType = gql`
  enum TaskStatus {
    Pending
    Completed
    Approved
  }

  type TaskDTO {
    id: ID!
    title: String!
    description: String
    requiresApproval: Boolean!
    status: TaskStatus!
    document: String
    dueDate: Date
    expiry: Date
  }

  input CreateTaskDTO {
    title: String!
    description: String
    requiresApproval: Boolean!
    status: TaskStatus!
    document: String
    dueDate: Date
    expiry: Date
  }

  input UpdateTaskDTO {
    title: String!
    description: String
    requiresApproval: Boolean!
    status: TaskStatus!
    document: String
    dueDate: Date
    expiry: Date
  }

  input DeleteTaskDTO {
    id: ID!
  }

  extend type Query {
    taskById(id: ID!): TaskDTO!
    tasks: [taskDTO!]!
  }

  extend type Mutation {
    createTask(input: CreateTaskInput!): Task!
    deleteTask(input: DeleteTaskInput!): Boolean!
  }
`;

export default taskType;
