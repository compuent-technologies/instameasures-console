/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ApartmentType {
  id?: string
  address: string;
  admins: string[];
  city: string;
  createdAt: any;
  updateAt: any;
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
