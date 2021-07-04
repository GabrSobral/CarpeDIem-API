import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne } from "typeorm";
import { Category } from "./Category";
import { User } from "./User";

@Entity()
export class ActivitiesOfTheDay {
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
}