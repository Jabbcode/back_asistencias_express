import { DataSource } from "typeorm";
import { DB_DATABASE, DB_HOST, DB_PASSWORD, DB_USERNAME } from "./const";
import { Student } from "../entities/Student.entity";
import { Attended } from "../entities/Attended.entity";
import { AnthropometricMeasurement } from "../entities/AnthropometricMeasurement.entity";

export const Connection = new DataSource({
  type: "mysql",
  host: DB_HOST,
  port: parseInt(process.env.DB_HOST || "3306"),
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  entities: [Attended, Student, AnthropometricMeasurement],
  synchronize: false,
});

Connection.initialize()
  .then(async () => {
    console.log("Database connection established successfully.");
  })
  .catch((error) => {
    console.error("Error connecting to the database:", error);
  });
