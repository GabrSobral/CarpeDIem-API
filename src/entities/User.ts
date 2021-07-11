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
  readonly id : string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column({ select: false })
  password: string;

  @Column()
  quantity_of_activities: number;

  @Column()
  activities_finished_today: number;

  @Column()
  all_activities_finished: number;

  @CreateDateColumn()
  created_at: string;

  @UpdateDateColumn()
  updated_at: string;

  constructor(){
    if(!this.id){
      this.id = uuid();
    }
  }
}