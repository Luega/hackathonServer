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
const cors_1 = __importDefault(require("cors"));
const uuid_1 = require("uuid");
const index_1 = require("./patients/index");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.get('/api/patients', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield (0, index_1.getPatients)();
    res.json(data);
}));
app.get('/api/patients/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const patient = yield (0, index_1.getPatient)(req.params.id);
    res.json(patient);
}));
app.post('/api/patients', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newPatient = {
        name: req.body.name,
        surname: req.body.surname,
        age: req.body.age,
        phone: req.body.phone,
        address: req.body.address,
        email: req.body.email,
        treatments: [],
    };
    const patient = yield (0, index_1.createPatient)(newPatient);
    res.json(patient);
}));
app.post('/api/patients/:id/treatments', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newTreatment = {
        id: (0, uuid_1.v4)(),
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
    const patient = yield (0, index_1.addTreatmentToPatient)(newTreatment, req.params.id);
    res.json(patient);
}));
app.delete('/api/patients/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, index_1.deletePatient)(req.params.id);
    res.send('Patient removed');
}));
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
