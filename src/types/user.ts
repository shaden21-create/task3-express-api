export interface User {
  id: number;
  name: string;
  email: string;
}

export type CreateUserDto = Pick<User, "name" | "email">;
export type UpdateUserDto = Partial<CreateUserDto>;
