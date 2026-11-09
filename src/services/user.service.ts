import { CreateUserDto, UpdateUserDto, User } from "../types/user";

// In-memory mock "database"
let users: User[] = [
  { id: 1, name: "Alice", email: "alice@example.com" },
  { id: 2, name: "Bob", email: "bob@example.com" },
];
let nextId = 3;

export const userService = {
  getAll(): User[] {
    return users;
  },

  getById(id: number): User | undefined {
    return users.find((u) => u.id === id);
  },

  create(data: CreateUserDto): User {
    const user: User = { id: nextId++, ...data };
    users.push(user);
    return user;
  },

  update(id: number, data: UpdateUserDto): User | undefined {
    const user = users.find((u) => u.id === id);
    if (!user) return undefined;
    Object.assign(user, data);
    return user;
  },

  remove(id: number): boolean {
    const before = users.length;
    users = users.filter((u) => u.id !== id);
    return users.length < before;
  },
};
