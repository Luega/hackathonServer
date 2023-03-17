import * as mongoDB from 'mongodb';
import dotenv from 'dotenv';
import { v4 as uuidv4 } from 'uuid';
import { Patient, Treatment } from '../types';

dotenv.config();
const CONN_STRING = process.env.MONGO_URI;
const DB = process.env.DB_NAME;
const COLLECTION = process.env.DB_COLLECTIONS;

const generateId = () => uuidv4();

const getPatients = async (): Promise<Patient[]> => {
  const client: mongoDB.MongoClient = new mongoDB.MongoClient(
    CONN_STRING!
   );
  await client.connect();
  const db: mongoDB.Db = client.db(DB);
  const col: mongoDB.Collection = db.collection(COLLECTION!);
  const data: any = await col.find({}).toArray();
  const patients: Patient[] = data;
  await client.close();
  return patients;
};

const getPatientById = async (patientId: string): Promise<Patient> => {
  const client: mongoDB.MongoClient = new mongoDB.MongoClient(
    CONN_STRING!
  );
  await client.connect();
  const db: mongoDB.Db = client.db(DB);
  const col: mongoDB.Collection = db.collection(COLLECTION!);
  const data: any = await col.find({ id: `${patientId}` }).toArray();
  const patient: Patient = data[0];
  await client.close();
  return patient;
};

const createNewPatient = async (newPatient: Patient): Promise<Patient> => {
  const patientToAdd: Patient = {
    id: generateId(),
    name: newPatient.name,
    surname: newPatient.surname,
    age: newPatient.age,
    phone: newPatient.phone,
    address: newPatient.address,
    email: newPatient.email,
    treatments: [],
  };
  const client: mongoDB.MongoClient = new mongoDB.MongoClient(
    CONN_STRING!
  );
  await client.connect();
  const db: mongoDB.Db = client.db(DB);
  const col: mongoDB.Collection = db.collection(COLLECTION!);
  await col.insertOne(patientToAdd);
  await client.close();
  return patientToAdd;
};

const addTreatment = async (treatment: Treatment, patientId: string) => {
  const client: mongoDB.MongoClient = new mongoDB.MongoClient(
    CONN_STRING!
  );
  await client.connect();
  const db: mongoDB.Db = client.db(DB);
  const col: mongoDB.Collection = db.collection(COLLECTION!);  
  await col.updateOne(
    {
      id: patientId,
    },
    {
      $push: {
            treatments: treatment,
      },
    }
  );
  await client.close();
  const updatedPatient: Patient = await getPatientById(patientId);
  return updatedPatient;
};

const deletePatient = async (patientId: string) => {
  const client: mongoDB.MongoClient = new mongoDB.MongoClient(
    CONN_STRING!
  );
  await client.connect();
  const db: mongoDB.Db = client.db(DB);
  const col: mongoDB.Collection = db.collection(COLLECTION!);
  await col.deleteOne({ id: `${patientId}` });
  await client.close();
};

export default {
  getPatients,
  getPatientById,
  createNewPatient,
  addTreatment,
  deletePatient,
};
