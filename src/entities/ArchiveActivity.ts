import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { Activity } from "./Activity";
import { Archive } from "./Archive";
import { Category } from "./Category";

@Entity('archives')
export class ArchiveActivity {
  @PrimaryColumn()
  archive: string;

  @JoinColumn({ name: "archive" })
  @ManyToOne(() => Archive, { cascade: true })
  JoinArchive: Archive;

  @PrimaryColumn()
  activity: string;

  @JoinColumn({ name: "activity" })
  @ManyToOne(() => Activity, { cascade: true })
  JoinActivity: Activity;

  @PrimaryColumn()
  category: string;

  @JoinColumn({ name: "category" })
  @ManyToOne(() => Category, { cascade: true })
  JoinCategory: Category;
}