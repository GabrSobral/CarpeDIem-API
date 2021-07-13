import { Column, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity('archives')
export class Archive {
  @PrimaryColumn()
  id: string;

  @Column()
  url: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  author: string;

  @Column()
  format: string;

  @Column()
  duration: string;

  constructor(){
    if(!this.id){
      this.id = uuid()
    }
  }
}