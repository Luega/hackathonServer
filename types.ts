export type Patient = {
  id?: string;
  name: string;
  surname: string;
  age: number;
  phone: number;
  address: string;
  email: string;
  treatments:  Treatment[]
};

export type Treatment = {
  id?: string,
  date: string,
  medicalHistory: string,
  symptoms: string,
  tests: string,
  physicalExamination: string,
  diagnosis: string,
  treatmentPlan: string,
  techniques: string,
  treatmentExpectations: string,
  notes: string,
}
 


