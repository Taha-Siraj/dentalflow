import { Branch } from "../models/branch.model.js";

export async function getBranches(req, res, next) {
  try {
    const branches = await Branch.find().lean();
    return res.json({ success: true, count: branches.length, branches });
  } catch (error) {
    next(error);
  }
}

export async function createBranch(req, res, next) {
  try {
    const branch = await Branch.create(req.body);
    return res.status(201).json({ success: true, branch });
  } catch (error) {
    next(error);
  }
}
