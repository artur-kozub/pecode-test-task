import { Entity, ObjectId, ObjectIdColumn, Column, BeforeInsert } from "typeorm";
import * as bcrypt from "bcrypt";

@Entity()
export class User {
  @ObjectIdColumn()
  id!: ObjectId;

  @Column()
  name!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  async comparePassword(password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password);
  }
}