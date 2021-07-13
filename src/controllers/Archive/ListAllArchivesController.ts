import { Request, Response } from "express";
import ListAllArchivesService from "../../services/Archive/ListAllArchivesService";

class ListAllArchivesController {
  async handle(request: Request, response: Response){
    const archives = await ListAllArchivesService.execute()

    return response.json(archives)
  }
}
export default new ListAllArchivesController()