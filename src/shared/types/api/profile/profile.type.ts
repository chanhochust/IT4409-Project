import { ApiResponse } from '../common';
import { Gender } from 'src/shared/constants/enums';
export interface ProfileData {
  id: string;
  email: string;
  name: string;
  role: string;
  isActive: boolean;
  fullName?: string;
  nickname: string;
  avatar: string;
  gender: Gender;
  nationality: string;
  phone: string;
  dob_day?: number;
  dob_month?: number;
  dob_year?: number;
  defaultAddressId?: string | null;
  createdAt: string;
  updatedAt: string;
}
export type ProfileResponse = ApiResponse<ProfileData>;

export interface UpdateProfilePayload {
  avatar?: File | Blob | null;
  nickname?: string;
  dob_day?: number;
  dob_month?: number;
  dob_year?: number;
  gender?: Gender | string;
  nationality?: string;
  phone?: string;
  defaultAddressId?: string | null;
}
