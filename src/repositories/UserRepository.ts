import { EntityRepository, getCustomRepository, Repository } from "typeorm";
import { User } from "../entities/User";

@EntityRepository(User)
class UserRepository extends Repository<User> {}

export default getCustomRepository(UserRepository)