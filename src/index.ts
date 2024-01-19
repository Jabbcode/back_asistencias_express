import express from "express";
import cors from "cors";

import { SERVER_PORT } from "./config/const";
import { Connection } from "./config/typeOrm";

import routerStudent from "./routes/student.route";
import routerAttended from "./routes/attended.route";
import routeAnthropometricMeasurement from "./routes/anthropometricMeasurement";

//Configuracion de TypeOrm
Connection;

const app = express();

app.use(cors());

app.use(express.json());

// Routes
app.use("/api/v1/students", routerStudent);
app.use("/api/v1/attendeds", routerAttended);
app.use("/api/v1/anthropometric-measurements", routeAnthropometricMeasurement);

app.listen(SERVER_PORT, () => {
  console.log(`Server running on Port ${SERVER_PORT}`);
});
