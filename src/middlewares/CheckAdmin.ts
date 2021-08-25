import { NextFunction, Request, Response } from 'express';
import handleGetRepositories from '../utils/handleGetRepositories';

export async function CheckAdmin(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const { userRepository } = handleGetRepositories()
  const user_id = request.user_id

  const user = await userRepository.findOne(user_id)
  console.log(user)

  if(user?.role !== 'admin'){
    return response.status(401).json({ error: "unauthorized" })
  }
  return next()
}
