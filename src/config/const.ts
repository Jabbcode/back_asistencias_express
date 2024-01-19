import dotenv from "dotenv";

dotenv.config();

export const SERVER_PORT = process.env.SERVER_PORT;
export const DB_DATABASE = process.env.DB_DATABASE;
export const DB_PASSWORD = process.env.DB_PASSWORD;
export const DB_USERNAME = process.env.DB_USERNAME;
export const DB_PORT = process.env.DB_PORT;
export const DB_HOST = process.env.DB_HOST;
