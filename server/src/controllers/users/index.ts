import express from "express";
import { something_wrong, not_change_email } from "../../config/static";
import { 
  getUsers, 
  getUserById, 
  updateUserById, 
  deleteUserById 
} from "../../db/users";

export const getAllUsers = async (
  req: express.Request, 
  res: express.Response
) => {
  try {
    const users = await getUsers();
    return res.status(200).json(users);
  } catch(error) {
    return res.status(400).json({ msg: something_wrong });
  }
}

export const viewUser = async (
  req: express.Request, 
  res: express.Response
) => {
  try {
    const { id } = req.params;
    const user = await getUserById(id);
    return res.json(user);
  } catch(error) {
    return res.status(400).json({ msg: something_wrong });
  }
}

export const updateUser = async (
  req: express.Request, 
  res: express.Response
) => {
  try {
    const { id } = req.params;
    const { email } = req.body;
    if (email) {
      return res.status(400).json({ msg: `${not_change_email} ${email}` });
    }

    const updateUserInfo = await updateUserById(id, req.body);
    return res.status(200).json(updateUserInfo).end();
  } catch(error) {
    return res.status(400).json({ msg: something_wrong });
  }
}

export const deleteUser = async (
  req: express.Request, 
  res: express.Response
) => {
  try {
    const { id } = req.params;
    const deleteRecord = await deleteUserById(id);
    return res.json(deleteRecord);
  } catch(error) {
    return res.status(400).json({ msg: something_wrong });
  }
}