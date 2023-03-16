import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { patients } from './DB/patients';
import { treatments } from './DB/treatments';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;
app.use(cors());
app.use(express.json());

app.get('/api/patients', async (req: Request, res: Response) => {
    const data: Patient[] = patients;
  res.json(patients);
});

app.get('/api/patients/:id', async (req: Request, res: Response) => {
  const data: Patient[] = patients;
  const patient: Patient[] = data.filter(
    (patient) => patient.id === req.params.id
  );
  res.json(patient);
});

app.post('/api/patients', async (req: Request, res: Response) => {
  console.log(req.body);
  const data: Patient[] = patients;
  const newPatient: Patient = {
    id: req.body.id,
    name: req.body.name,
    surname: req.body.surname,
    age: req.body.age,
    phone: req.body.phone,
    address: req.body.address,
    email: req.body.email,
    treatments: [],
  };
  data.push(newPatient);
  res.json(newPatient);
});

app.post('/api/patients/:id/treatments', async (req: Request, res: Response) => {
  console.log(req.body);
  const data: Patient[] = patients;
  const patient: Patient[] = data.filter(
    (patient) => patient.id === req.params.id
  );
  const newTreatment: Treatment = {
    id: req.body.id,
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
  patient[0].treatments.push(newTreatment);
  res.json(patient);
});

app.delete('/api/patients/:id', async (req: Request, res: Response) => {
  const data: Patient[] = patients;
  const patientIndex: number = data.findIndex(
    (patient) => patient.id === req.params.id
  );
  data.splice(patientIndex, 1);
  res.send('Patient removed');
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
