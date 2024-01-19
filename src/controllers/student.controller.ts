import { Response, Request } from "express";
import { Student } from "../entities/Student.entity";
import { Connection } from "../config/typeOrm";
import { CalculateAge } from "../utils/calculateAge";

const StudentRepository = Connection.getRepository(Student);

export const getAll = async (req: Request, res: Response) => {
  try {
    const students = await StudentRepository.find({
      relations: ["attendeds", "anthropometrics"],
      where: { isActive: true },
    });

    return res.status(200).json(students);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "Error",
      message: "Error en el servidor",
    });
  }
};

export const create = async (req: Request, res: Response) => {
  const { firstName, lastName, birthDate } = req.body;

  if (!firstName || !lastName || !birthDate) {
    return res.status(400).json({
      status: "Bad Request",
      message: "Faltan datos necesarios",
    });
  }

  const age = CalculateAge(birthDate);

  try {
    const student = await StudentRepository.save({
      firstName,
      lastName,
      age,
      birthDate,
    });

    return res.status(201).json(student);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "Error",
      message: "Error en el servidor",
    });
  }
};

export const getOne = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const student = await StudentRepository.createQueryBuilder("student")
      .leftJoinAndSelect("student.attendeds", "attendeds")
      .leftJoinAndSelect("student.anthropometrics", "anthropometrics")
      .where("student.id = :id", { id: parseInt(id) })
      .getOne();

    if (!student) {
      return res.status(400).json({
        status: "Bad Request",
        message: `No existe estudiante con el ${id}`,
      });
    }

    return res.status(200).json(student);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "Error",
      message: "Error en el servidor",
    });
  }
};

export const update = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { firstName, lastName, birthDate } = req.body;
  let age = 0;

  try {
    const student = await StudentRepository.findOneBy({ id: parseInt(id) });

    if (!student) {
      return res.status(400).json({
        status: "Bad Request",
        message: `No existe estudiante con el ${id}`,
      });
    }

    if (!birthDate) {
      await StudentRepository.update(
        { id: parseInt(id) },
        {
          firstName,
          lastName,
          birthDate,
          age: student.age,
        }
      );
    } else {
      age = CalculateAge(birthDate, true);
      await StudentRepository.update(
        { id: parseInt(id) },
        { ...req.body, age }
      );
    }

    return res
      .status(200)
      .json({ msg: "Estudiante actualizado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "Error",
      message: "Error en el servidor",
    });
  }
};

export const enable_disable = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { isActive } = req.body;

  try {
    const student = await StudentRepository.update(
      { id: parseInt(id) },
      { isActive }
    );

    if (!student) {
      return res.status(400).json({
        status: "Bad Request",
        message: `No existe estudiante con el ${id}`,
      });
    }

    return res.status(200).json({
      message: `El estudiante se ${
        isActive ? "habilito" : "deshabilito"
      } correctamente`,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "Error",
      message: "Error en el servidor",
    });
  }
};
