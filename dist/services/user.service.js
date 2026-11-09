"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
// In-memory mock "database"
let users = [
    { id: 1, name: "Alice", email: "alice@example.com" },
    { id: 2, name: "Bob", email: "bob@example.com" },
];
let nextId = 3;
exports.userService = {
    getAll() {
        return users;
    },
    getById(id) {
        return users.find((u) => u.id === id);
    },
    create(data) {
        const user = { id: nextId++, ...data };
        users.push(user);
        return user;
    },
    update(id, data) {
        const user = users.find((u) => u.id === id);
        if (!user)
            return undefined;
        Object.assign(user, data);
        return user;
    },
    remove(id) {
        const before = users.length;
        users = users.filter((u) => u.id !== id);
        return users.length < before;
    },
};
