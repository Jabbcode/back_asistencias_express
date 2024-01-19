import { Response, Request } from "express";
import { Attended } from "../entities/Attended.entity";
import { Connection } from "../config/typeOrm";
import { Student } from "../entities/Student.entity";

const AttendedRepository = Connection.getRepository(Attended);
const StudentRepository = Connection.getRepository(Student);

export const getAll = async (req: Request, res: Response) => {
  try {
    const attendeds = await AttendedRepository.find();

    return res.status(200).json(attendeds);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "Error",
      message: "Error en el servidor",
    });
  }
};

export const create = async (req: Request, res: Response) => {
  const { date, isAttended, studentId } = req.body;

  if (!date || !studentId) {
    return res.status(400).json({
      status: "Bad Request",
      message: "Faltan datos necesarios",
    });
  }

  const student = await StudentRepository.findOneBy({
    id: parseInt(studentId),
  });

  if (!student) {
    return res.status(400).json({
      status: "Bad Request",
      message: `No existe estudiante con el ${studentId}`,
    });
  }

  try {
    const attended = await AttendedRepository.save({
      date,
      isAttended,
      student,
    });

    return res.status(201).json(attended);
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
    const attended = await AttendedRepository.findOneBy({ id: parseInt(id) });

    if (!attended) {
      return res.status(400).json({
        status: "Bad Request",
        message: `No existe asistencia con el ${id}`,
      });
    }

    return res.status(200).json(attended);
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

  try {
    const attended = await AttendedRepository.findOneBy({ id: parseInt(id) });

    if (!attended) {
      return res.status(400).json({
        status: "Bad Request",
        message: `No existe asistencia con el ${id}`,
      });
    }

    await AttendedRepository.update({ id: parseInt(id) }, req.body);

    return res
      .status(200)
      .json({ msg: "Asistencia actualizada correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "Error",
      message: "Error en el servidor",
    });
  }
};

export const deleteOne = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const attended = await AttendedRepository.findOneBy({ id: parseInt(id) });

    if (!attended) {
      return res.status(400).json({
        status: "Bad Request",
        message: `No existe asistencia con el ${id}`,
      });
    }
    await AttendedRepository.delete({ id: parseInt(id) });

    return res.status(200).json({
      message: "La asistencia se a eliminado correctamente",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "Error",
      message: "Error en el servidor",
    });
  }
};
