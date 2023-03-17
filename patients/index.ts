import db from './db';
import { Patient, Treatment } from '../types';

const getPatients = async (): Promise<Patient[]> => db.getPatients();

const getPatient = async (patientId: string): Promise<Patient> => db.getPatientById(patientId);

const createPatient = async (newPatient: Patient): Promise<Patient> => db.createNewPatient(newPatient);

const addTreatmentToPatient = async (
  treatment: Treatment,
  patientId: string
): Promise<Patient> => db.addTreatment(treatment, patientId);

const deletePatient = async (patientId: string) => db.deletePatient(patientId);

export {
  getPatients,
  getPatient,
  createPatient,
  addTreatmentToPatient,
  deletePatient,
};
