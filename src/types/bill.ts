export interface BillType {
  amount: number;
  apartmentId: string;
  billStatus: string;
  displayImage: string | null;
  email: string;
  flatNumber: string;
  isCorrect: boolean;
  isGenerated: boolean;
  isPaid: boolean;
  isUploaded: boolean;
  meterDocId: string;
  meterId: string;
  meterReading: number;
  month: string;
  ownerName: string;
  phoneNumber: string;
  timestamp: string;
  year: number;
}
