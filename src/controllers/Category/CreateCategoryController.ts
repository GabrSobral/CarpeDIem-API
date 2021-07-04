import { Request, Response } from "express";
import CreateCategoryService from "../../services/Category/CreateCategoryService";

class CreateCategoryController {
  async handle(request: Request, response: Response){
    const { name } = request.body

    const category = await CreateCategoryService.execute({ name })

    return response.json(category)
  }
}
export default new CreateCategoryController()