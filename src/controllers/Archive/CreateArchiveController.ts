import { Request, Response } from "express";
import CreateArchiveService from "../../services/Archive/CreateArchiveService";

class CreateArchiveController {
  async handle(request: Request, response: Response){
    const { name, description, author } = request.body
    const files = request.file as Express.Multer.File
  
    const archive = await CreateArchiveService.execute({ name, description, author, files })

    return response.json(archive)
  }
}
export default new CreateArchiveController()