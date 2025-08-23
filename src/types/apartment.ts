export interface ApartmentType {
  address: string;
  admins: string[];
  city: string;
  createdAt: string;
  delegates: string[] | null;
  displayImage: string | null;
  meterType: string;
  meters: string[];
  monthly_bills: any | null;
  name: string;
  pinCode: string;
  rate: number | null;
  uploadsByMonth: any;
}
