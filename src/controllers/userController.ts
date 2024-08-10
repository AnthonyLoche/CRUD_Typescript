import { Request, Response } from "express";
import fs from "fs";
import path from "path";
import { User } from "../models/user";

const usersFilePath = path.join(__dirname, "../data/users.json");

const readUsersFromFile = (): User[] => {
  const data = fs.readFileSync(usersFilePath, "utf-8");
  return JSON.parse(data);
};

const writeUsersToFile = (users: User[]): void => {
  fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
};

export const homePage = (req: Request, res: Response): void => {
  res.send("Bem-vindo à página inicial!");
};

export const getUsers = (req: Request, res: Response): void => {
  const users = readUsersFromFile();
  res.status(200).json(users);
};

export const createUser = (req: Request, res: Response): void => {
  const users = readUsersFromFile();
  const newId = users.length > 0 ? users[users.length - 1].id + 1 : 1;
  const newUser: User = { id: newId, ...req.body };

  users.push(newUser);
  writeUsersToFile(users);

  res.status(201).json(newUser);
};

export const updateUser = (req: Request, res: Response): void => {
  const id = parseInt(req.params.id, 10);
  const updatedUser: User = req.body;
  const users = readUsersFromFile();
  const userIndex = users.findIndex((user) => user.id === id);

  if (userIndex === -1) {
    res.status(404).json({ message: "Usuário não encontrado" });
    return;
  } else {
    users[userIndex] = { ...users[userIndex], ...updatedUser };
    writeUsersToFile(users);
    res.status(200).json(users[userIndex]);
  }
};

export const deleteUser = (req: Request, res: Response): void => {
  const id = parseInt(req.params.id, 10);
  const users = readUsersFromFile();
  const filteredUsers = users.filter((user) => user.id !== id);

  if (filteredUsers.length === users.length) {
    res.status(404).json({ message: "Usuário não encontrado" });
    return;
  }

  writeUsersToFile(filteredUsers);
  res.status(200).json({ message: "Usuário deletado com sucesso" });
};
