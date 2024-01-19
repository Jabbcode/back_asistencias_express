import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Attended } from "./Attended.entity";
import { AnthropometricMeasurement } from "./AnthropometricMeasurement.entity";

@Entity({ name: "student" })
export class Student {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 20 })
  firstName!: string;

  @Column({ length: 20 })
  lastName!: string;

  @Column()
  age!: number;

  @Column({ default: true })
  isActive!: boolean;

  @Column()
  birthDate!: Date;

  @OneToMany(() => Attended, (attented) => attented.student, {
    cascade: true,
  })
  attendeds!: Attended[];

  @OneToMany(
    () => AnthropometricMeasurement,
    (anthropometric) => anthropometric.student,
    {
      cascade: true,
    }
  )
  anthropometrics!: AnthropometricMeasurement[];
}
