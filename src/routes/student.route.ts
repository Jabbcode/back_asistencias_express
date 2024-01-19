import { Router } from "express";
import {
  create,
  enable_disable,
  getOne,
  getAll,
  update,
} from "../controllers/student.controller";

const router = Router();

router.get("/", getAll);

router.post("/", create);

router.get("/:id", getOne);

router.patch("/:id", update);

router.patch("/enable-disable/:id", enable_disable);

export default router;
