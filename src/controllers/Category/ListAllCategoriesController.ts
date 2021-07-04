import { Request, Response } from "express";
import ListAllCategoriesService from "../../services/Category/ListAllCategoriesService";

class ListAllCategoriesController {
  async handle(request: Request, response: Response){
    const allCategories = await ListAllCategoriesService.execute()

    return response.json(allCategories)
  }
}
export default new ListAllCategoriesController()