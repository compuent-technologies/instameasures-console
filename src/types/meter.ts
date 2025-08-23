export interface MeterType {
  apartmentId: string;
  createdAt: string;
  createdBy: string;
  email: string;
  flatNumber: string;
  id: string;
  meterId: string;
  ownerName: string;
  phoneNumber: string;
  readings: any[];
  sampleGraphData: Record<string, any>;
  status: string;
  updatedAt: string;
  updatedBy: string | null;
}
