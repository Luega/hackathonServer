import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { Patient, Treatment } from './types';
import { v4 as uuidv4 } from 'uuid';
import {
  getPatients, getPatient, createPatient, addTreatmentToPatient, deletePatient,
} from './patients/index';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;
app.use(cors());
app.use(express.json());

app.get('/api/patients', async (req: Request, res: Response) => {
  const data: Patient[] = await getPatients();
  res.json(data);
});

app.get('/api/patients/:id', async (req: Request, res: Response) => {
  const patient: Patient = await getPatient(req.params.id);
  res.json(patient);
});

app.post('/api/patients', async (req: Request, res: Response) => {
  const newPatient: Patient = {
    name: req.body.name,
    surname: req.body.surname,
    age: req.body.age,
    phone: req.body.phone,
    address: req.body.address,
    email: req.body.email,
    treatments: [],
  };
  const patient: Patient = await createPatient(newPatient);
  res.json(patient);
});

app.post('/api/patients/:id/treatments', async (req: Request, res: Response) => {
  const newTreatment: Treatment = {
    id: uuidv4(),
    date: req.body.date,
    medicalHistory: req.body.medicalHistory,
    symptoms: req.body.symptoms,
    tests: req.body.tests,
    physicalExamination: req.body.physicalExamination,
    diagnosis: req.body.diagnosis,
    treatmentPlan: req.body.treatmentPlan,
    techniques: req.body.techniques,
    treatmentExpectations: req.body.treatmentExpectations,
    notes: req.body.notes,
  };
  const patient: Patient = await addTreatmentToPatient(newTreatment, req.params.id);
  res.json(patient);
});

app.delete('/api/patients/:id', async (req: Request, res: Response) => {
  await deletePatient(req.params.id);
  res.send('Patient removed');
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
