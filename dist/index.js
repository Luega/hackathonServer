"use strict";
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
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const patients_1 = require("./DB/patients");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
app.use(express_1.default.json());
app.get('/api/patients', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = patients_1.patients;
    res.json(patients_1.patients);
}));
app.get('/api/patients/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = patients_1.patients;
    const patient = data.filter((patient) => patient.id === req.params.id);
    res.json(patient);
}));
app.post('/api/patients', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = patients_1.patients;
    const newPatient = {
        id: req.body.id,
        name: req.body.name,
        surname: req.body.surname,
        age: req.body.age,
        gender: req.body.gender,
        phone: req.body.phone,
        address: req.body.address,
        email: req.body.email,
    };
    data.push(newPatient);
    res.json(newPatient);
}));
app.delete('/api/patients/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = patients_1.patients;
    const patientIndex = data.findIndex((patient) => patient.id === req.params.id);
    data.splice(patientIndex, 1);
    res.send('Patient removed');
}));
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
