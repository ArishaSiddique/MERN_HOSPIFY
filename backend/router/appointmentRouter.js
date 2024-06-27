import express from "express";
import { postAppointment,  updateAppointmentStatus, getAllAppointments, deleteAppointment} from "../controller/appointmentController.js";
import {
    isAdminAuthenticated,
    isPatientAuthenticated,
  } from "../middlewares/auth.js";

const router = express.Router();

//making the authentication for the users that will be creating an appointment

router.post("/post",isPatientAuthenticated, postAppointment);
router.get("/getall", isAdminAuthenticated, getAllAppointments);
router.put("/update/:id", isAdminAuthenticated, updateAppointmentStatus);
router.delete("/delete/:id", isAdminAuthenticated, deleteAppointment);

export default router;