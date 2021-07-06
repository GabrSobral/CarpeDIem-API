import { CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { Activity } from "./Activity";

import { User } from "./User";

@Entity('activities_of_the_day')
export class ActivitiesOfTheDay {
  @PrimaryColumn()
  activity: string;

  @JoinColumn({ name: 'activity' })
  @ManyToOne( () => Activity, { cascade: true } )
  JoinActivity: Activity

  @PrimaryColumn()
  destined_to: string;

  @JoinColumn({ name: 'destined_to' })
  @ManyToOne(() => User, { cascade: true })
  JoinDestinedTo: User;

  @CreateDateColumn()
  date: Date;
}