import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import { Activity } from "./Activity";

import { User } from "./User";

@Entity('activities_of_the_day')
export class ActivitiesOfTheDay {
  @PrimaryColumn()
  id: string;

  @Column()
  activity: string;

  @JoinColumn({ name: 'activity' })
  @ManyToOne( () => Activity, { cascade: true } )
  JoinActivity: Activity

  @Column()
  destined_to: string;

  @JoinColumn({ name: 'destined_to' })
  @ManyToOne(() => User, { cascade: true })
  JoinDestinedTo: User;

  @CreateDateColumn()
  date: Date;

  constructor(){
    if(!this.id){
      this.id = uuid()
    }
  }
}