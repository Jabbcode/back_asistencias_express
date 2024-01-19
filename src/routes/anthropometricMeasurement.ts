import { Router } from "express";
import {
  create,
  deleteOne,
  getAll,
  getOne,
  update,
} from "../controllers/anthropometricMeasurement.controller";

export const router = Router();

router.get("/", getAll);

router.post("/", create);

router.get("/:id", getOne);

router.patch("/:id", update);

router.delete("/:id", deleteOne);

export default router;
