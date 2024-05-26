import { Entity, ObjectIdColumn, Column } from "typeorm";
import { ObjectId } from "mongodb";

@Entity()
export class Post {
  @ObjectIdColumn()
  id!: ObjectId;

  @Column()
  createdBy!: ObjectId;

  @Column()
  post!: string;
}