import { 
  Column, 
  CreateDateColumn, 
  Entity, 
  PrimaryColumn, 
  UpdateDateColumn 
} from "typeorm";
import { v4 as uuid } from 'uuid'

@Entity('users')
export class User {
  @PrimaryColumn()
  id : string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @CreateDateColumn()
  created_at: string;

  @UpdateDateColumn()
  updated_at: string;

  constructor(){
    if(!this.password){
      this.password = uuid();
    }
  }
}