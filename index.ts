import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { patients } from './DB/patients';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;
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
  const data: Patient[] = patients;
  const newPatient: Patient = {
    id: req.body.id,
    name: req.body.name,
    surname: req.body.surname,
    age: req.body.age,
    gender: req.body.gender, // if true male
    phone: req.body.phone,
    address: req.body.address,
    email: req.body.email,
  };
  data.push(newPatient);
  res.json(newPatient);
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
