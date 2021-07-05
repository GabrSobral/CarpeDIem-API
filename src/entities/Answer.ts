import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { Category } from "./Category";
import { Question } from "./Question";
import { User } from "./User";

@Entity('answers')
export class Answer {
  @PrimaryColumn()
  user: string;

  @JoinColumn({ name: "user" })
  @ManyToOne(() => User)
  JoinUser: User;

  @PrimaryColumn()
  question: string;

  @JoinColumn({ name: "question" })
  @ManyToOne(() => Question)
  JoinQuestion: Question;

  @PrimaryColumn()
  category: string;

  @JoinColumn({ name: "category" })
  @ManyToOne(() => Category)
  JoinCategory: Category;

  @Column()
  answer: string;
}