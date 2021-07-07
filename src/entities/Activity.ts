import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import { Category } from "./Category";

@Entity('activities')
export class Activity {
  @PrimaryColumn()
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  body: string;

  @Column()
  category: string;

  @JoinColumn({ name: 'category' })
  @ManyToOne(() => Category, { cascade: true })
  JoinCategory: Category;

  constructor(){
    if(!this.id){
      this.id = uuid()
    }
  }
}