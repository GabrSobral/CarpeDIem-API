import { EntityRepository, Repository } from "typeorm";
import { Category } from "../entities/Category";

@EntityRepository(Category)
export class CategoryRepository extends Repository<Category> {}