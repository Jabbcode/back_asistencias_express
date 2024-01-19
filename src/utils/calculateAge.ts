import { parse, differenceInYears } from "date-fns";

export const CalculateAge = (fechaNacimiento: string, modifyFormat = false) => {
  let newFormat = null;

  if (modifyFormat) {
    newFormat = fechaNacimiento.substring(0, 10);
  } else {
    newFormat = parse(fechaNacimiento, "yyyy-MM-dd", new Date());
  }

  const fechaActual = new Date();
  return differenceInYears(fechaActual, newFormat);
};
