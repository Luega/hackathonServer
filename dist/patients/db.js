"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoDB = __importStar(require("mongodb"));
const dotenv_1 = __importDefault(require("dotenv"));
const uuid_1 = require("uuid");
dotenv_1.default.config();
const CONN_STRING = process.env.MONGO_URI;
const DB = process.env.DB_NAME;
const COLLECTION = process.env.DB_COLLECTIONS;
const generateId = () => (0, uuid_1.v4)();
const getPatients = () => __awaiter(void 0, void 0, void 0, function* () {
    const client = new mongoDB.MongoClient(CONN_STRING);
    yield client.connect();
    const db = client.db(DB);
    const col = db.collection(COLLECTION);
    const data = yield col.find({}).toArray();
    const patients = data;
    yield client.close();
    return patients;
});
const getPatientById = (patientId) => __awaiter(void 0, void 0, void 0, function* () {
    const client = new mongoDB.MongoClient(CONN_STRING);
    yield client.connect();
    const db = client.db(DB);
    const col = db.collection(COLLECTION);
    const data = yield col.find({ id: `${patientId}` }).toArray();
    const patient = data[0];
    yield client.close();
    return patient;
});
const createNewPatient = (newPatient) => __awaiter(void 0, void 0, void 0, function* () {
    const patientToAdd = {
        id: generateId(),
        name: newPatient.name,
        surname: newPatient.surname,
        age: newPatient.age,
        phone: newPatient.phone,
        address: newPatient.address,
        email: newPatient.email,
        treatments: [],
    };
    const client = new mongoDB.MongoClient(CONN_STRING);
    yield client.connect();
    const db = client.db(DB);
    const col = db.collection(COLLECTION);
    yield col.insertOne(patientToAdd);
    yield client.close();
    return patientToAdd;
});
const addTreatment = (treatment, patientId) => __awaiter(void 0, void 0, void 0, function* () {
    const client = new mongoDB.MongoClient(CONN_STRING);
    yield client.connect();
    const db = client.db(DB);
    const col = db.collection(COLLECTION);
    yield col.updateOne({
        id: patientId,
    }, {
        $set: {
            treatments: [treatment],
        },
    });
    yield client.close();
    const updatedPatient = yield getPatientById(patientId);
    return updatedPatient;
});
const deletePatient = (patientId) => __awaiter(void 0, void 0, void 0, function* () {
    const client = new mongoDB.MongoClient(CONN_STRING);
    yield client.connect();
    const db = client.db(DB);
    const col = db.collection(COLLECTION);
    yield col.deleteOne({ id: `${patientId}` });
    yield client.close();
});
exports.default = {
    getPatients,
    getPatientById,
    createNewPatient,
    addTreatment,
    deletePatient,
};
