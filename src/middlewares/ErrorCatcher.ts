import { NextFunction, Request, Response } from "express";

export function ErrorCatcher(error: Error, request: Request, response: Response, next: NextFunction) {
  const [ message, statusString ] = error.message.split('status:')

  const status = Number(statusString) || 500
  
  if(error instanceof Error){
    return response.status(status).send({ error: message.trim() })
  }
}