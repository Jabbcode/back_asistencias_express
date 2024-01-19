import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Student } from "./Student.entity";

@Entity({ name: "attended" })
export class Attended {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "date" })
  date!: Date;

  @Column()
  isAttended!: boolean;

  @ManyToOne(() => Student, (student) => student.attendeds)
  student!: Student;
}
