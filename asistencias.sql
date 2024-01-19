-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 19-01-2024 a las 19:07:40
-- Versión del servidor: 10.4.27-MariaDB
-- Versión de PHP: 7.4.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `asistencias`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `anthropometric_measurement`
--

CREATE TABLE `anthropometric_measurement` (
  `id` int(11) NOT NULL,
  `height` decimal(10,2) NOT NULL,
  `weight` decimal(10,2) NOT NULL,
  `waist_circumference` decimal(10,2) NOT NULL,
  `hip_circumference` decimal(10,2) NOT NULL,
  `imc` decimal(10,2) NOT NULL,
  `date` date NOT NULL,
  `studentId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `attended`
--

CREATE TABLE `attended` (
  `id` int(11) NOT NULL,
  `date` datetime NOT NULL DEFAULT current_timestamp(),
  `isAttended` tinyint(4) NOT NULL,
  `studentId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `student`
--

CREATE TABLE `student` (
  `id` int(11) NOT NULL,
  `firstName` varchar(20) NOT NULL,
  `lastName` varchar(20) NOT NULL,
  `age` int(11) NOT NULL,
  `isActive` tinyint(4) NOT NULL DEFAULT 1,
  `birthDate` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `anthropometric_measurement`
--
ALTER TABLE `anthropometric_measurement`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_b1d0aa1b346b33051a7362a8a4e` (`studentId`);

--
-- Indices de la tabla `attended`
--
ALTER TABLE `attended`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_f25d2fde5ca54a72fbcf6c5ab5e` (`studentId`);

--
-- Indices de la tabla `student`
--
ALTER TABLE `student`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `anthropometric_measurement`
--
ALTER TABLE `anthropometric_measurement`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `attended`
--
ALTER TABLE `attended`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `student`
--
ALTER TABLE `student`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `anthropometric_measurement`
--
ALTER TABLE `anthropometric_measurement`
  ADD CONSTRAINT `FK_b1d0aa1b346b33051a7362a8a4e` FOREIGN KEY (`studentId`) REFERENCES `student` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `attended`
--
ALTER TABLE `attended`
  ADD CONSTRAINT `FK_f25d2fde5ca54a72fbcf6c5ab5e` FOREIGN KEY (`studentId`) REFERENCES `student` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
