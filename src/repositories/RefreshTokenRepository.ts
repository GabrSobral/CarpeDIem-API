import { EntityRepository, Repository } from "typeorm";
import { RefreshToken } from "../entities/RefreshToken";

@EntityRepository(RefreshToken)
export class RefreshTokenRepository extends Repository<RefreshToken> {}