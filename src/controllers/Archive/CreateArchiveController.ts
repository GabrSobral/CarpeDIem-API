import { Request, Response } from "express";
import CreateArchiveService from "../../services/Archive/CreateArchiveService";

class CreateArchiveController {
  async handle(request: Request, response: Response){
    const files = request.file as Express.Multer.File
  
    const archive = await CreateArchiveService.execute({ files })

    return response.json(archive)
  }
}
export default new CreateArchiveController()