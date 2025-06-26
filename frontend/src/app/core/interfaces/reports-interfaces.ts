export interface ReportApiResponse {
  id: string;
  id_doctor: string;
  id_patient: string;
  text: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ReportRow {
  doctorId: string;
  patientId: string;
  text: string;
  creationDate: Date;
  lastUpdate: Date;
}
