import { Response, Request } from "express";
import { AnthropometricMeasurement as Anthropometric } from "../entities/AnthropometricMeasurement.entity";
import { Connection } from "../config/typeOrm";
import { Student } from "../entities/Student.entity";

const AnthropometricRepository = Connection.getRepository(Anthropometric);
const StudentRepository = Connection.getRepository(Student);

export const getAll = async (req: Request, res: Response) => {
  try {
    const anthropometrics = await AnthropometricRepository.find();

    return res.status(200).json(anthropometrics);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "Error",
      message: "Error en el servidor",
    });
  }
};

export const create = async (req: Request, res: Response) => {
  const {
    date,
    height,
    weight,
    waist_circumference,
    hip_circumference,
    studentId,
  } = req.body;

  if (
    !date ||
    !height ||
    !weight ||
    !waist_circumference ||
    !hip_circumference ||
    !studentId
  ) {
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

  const IMC = weight / Math.pow(height, 2);

  try {
    const anthropometric = await AnthropometricRepository.save({
      ...req.body,
      imc: IMC,
      student,
    });

    return res.status(201).json(anthropometric);
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
    const anthropometric = await AnthropometricRepository.findOneBy({
      id: parseInt(id),
    });

    if (!anthropometric) {
      return res.status(400).json({
        status: "Bad Request",
        message: `No existen medidas con el ${id}`,
      });
    }

    return res.status(200).json(anthropometric);
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
  const { height, weight } = req.body;
  let IMC = 0;

  try {
    const anthropometric = await AnthropometricRepository.findOneBy({
      id: parseInt(id),
    });

    if (!anthropometric) {
      return res.status(400).json({
        status: "Bad Request",
        message: `No existen medidas con el ${id}`,
      });
    }

    if (weight) {
      IMC = weight / Math.pow(anthropometric.height, 2);
    } else if (height) {
      IMC = anthropometric.weight / Math.pow(height, 2);
    } else if (weight && height) {
      IMC = weight / Math.pow(height, 2);
    } else {
      IMC = anthropometric.imc;
    }

    await AnthropometricRepository.update(
      { id: parseInt(id) },
      {
        ...req.body,
        imc: IMC,
      }
    );

    return res.status(200).json({ msg: "Medidas actualizadas correctamente" });
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
    const anthropometric = await AnthropometricRepository.findOneBy({
      id: parseInt(id),
    });

    if (!anthropometric) {
      return res.status(400).json({
        status: "Bad Request",
        message: `No existen medidas con el ${id}`,
      });
    }

    await AnthropometricRepository.delete({ id: parseInt(id) });

    return res.status(200).json({
      message: `Las medidas se eliminaron correctamente`,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "Error",
      message: "Error en el servidor",
    });
  }
};
