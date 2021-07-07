import { Request, Response } from "express";
import CreateArchiveService from "../../services/Archive/CreateArchiveService";

class CreateArchiveController {
  async handle(request: Request, response: Response){
    const { name, description, author } = request.body
    const files = request.files as Express.Multer.File[]
    
    files.forEach(item => {
      console.log(item)
    })

    const archive = await CreateArchiveService.execute({ name, description, author, files })

    return response.json(archive)
  }
}
export default new CreateArchiveController()