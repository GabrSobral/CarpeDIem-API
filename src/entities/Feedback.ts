import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn
} from 'typeorm';
import { Activity } from './Activity';
import { Category } from './Category';
import { User } from './User';

@Entity('feedback')
export class Feedback {
  @PrimaryColumn()
  user: string;

  @JoinColumn({ name: 'user' })
  @ManyToOne(() => User, { cascade: true })
  JoinUser: User;

  @PrimaryColumn()
  activity: string;

  @JoinColumn({ name: 'activity' })
  @ManyToOne(() => Activity, { cascade: true })
  JoinActivity: Activity;

  @PrimaryColumn()
  category: string;

  @JoinColumn({ name: 'category' })
  @ManyToOne(() => Category, { cascade: true })
  JoinCategory: Category;

  @Column()
  feedback: boolean;

  @CreateDateColumn()
  created_at: Date;
}
