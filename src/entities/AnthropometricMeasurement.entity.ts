import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Student } from "./Student.entity";

@Entity({ name: "anthropometric_measurement" })
export class AnthropometricMeasurement {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  height!: number;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  weight!: number;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  waist_circumference!: number;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  hip_circumference!: number;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  imc!: number;

  @Column("date")
  date!: Date;

  @ManyToOne(() => Student, (student) => student.anthropometrics)
  student!: Student;
}
