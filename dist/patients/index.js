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
exports.deletePatient = exports.addTreatmentToPatient = exports.createPatient = exports.getPatient = exports.getPatients = void 0;
const db_1 = __importDefault(require("./db"));
const getPatients = () => __awaiter(void 0, void 0, void 0, function* () { return db_1.default.getPatients(); });
exports.getPatients = getPatients;
const getPatient = (patientId) => __awaiter(void 0, void 0, void 0, function* () { return db_1.default.getPatientById(patientId); });
exports.getPatient = getPatient;
const createPatient = (newPatient) => __awaiter(void 0, void 0, void 0, function* () { return db_1.default.createNewPatient(newPatient); });
exports.createPatient = createPatient;
const addTreatmentToPatient = (treatment, patientId) => __awaiter(void 0, void 0, void 0, function* () { return db_1.default.addTreatment(treatment, patientId); });
exports.addTreatmentToPatient = addTreatmentToPatient;
const deletePatient = (patientId) => __awaiter(void 0, void 0, void 0, function* () { return db_1.default.deletePatient(patientId); });
exports.deletePatient = deletePatient;
