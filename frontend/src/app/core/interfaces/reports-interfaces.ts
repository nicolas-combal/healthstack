export interface ReportApiResponse {
  id: string;
  id_doctor: string;
  id_patient: string;
  text: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ReportRow {
  id: string;
  doctorName: string | undefined;
  patientName: string | undefined;
  text: string;
  creationDate: Date;
  lastUpdate: Date;
}
