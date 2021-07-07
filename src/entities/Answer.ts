import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { Category } from "./Category";
import { Question } from "./Question";
import { User } from "./User";

@Entity('answers')
export class Answer {
  @PrimaryColumn()
  user: string;

  @JoinColumn({ name: "user" })
  @ManyToOne(() => User, { cascade: true })
  JoinUser: User;

  @PrimaryColumn()
  question: string;

  @JoinColumn({ name: "question" })
  @ManyToOne(() => Question, { cascade: true })
  JoinQuestion: Question;

  @PrimaryColumn()
  category: string;

  @JoinColumn({ name: "category" })
  @ManyToOne(() => Category, { cascade: true })
  JoinCategory: Category;

  @Column()
  answer: string;
}