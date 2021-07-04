import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";

import { Category } from "./Category";
import { User } from "./User";

@Entity()
export class ActivitiesOfTheDay {
  @PrimaryColumn()
  id: string;

  @Column()
  activity: string;

  @JoinColumn({ name: 'activity' })
  @ManyToOne( () => Category )
  JoinActivity: Category

  @Column()
  destined_to: string;

  @JoinColumn({ name: 'destined_to' })
  @ManyToOne(() => User)
  JoinDestinedTo: User;

  @CreateDateColumn()
  date: Date;

  constructor(){
    if(!this.id){
      this.id = uuid()
    }
  }
}