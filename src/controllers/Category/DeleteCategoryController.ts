import { Request, Response } from "express";
import DeleteCategoryService from "../../services/Category/DeleteCategoryService";

class DeleteCategoryController {
  async handle(request: Request, response: Response){
    const category_id = request.params.id

    await DeleteCategoryService.execute(category_id)

    return response.sendStatus(200)
  }
}
export default new DeleteCategoryController()