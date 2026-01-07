import { axiosClient } from './axios';
import { ProfileResponse, UpdateProfilePayload } from 'src/shared/types/api/profile/profile.type';
export class ProfileService {
  static async getProfile(this: void): Promise<ProfileResponse> {
    return axiosClient.get<ProfileResponse>('/users/profile/my-profile').then((res) => res.data);
  }

  static async updateProfile(this: void, payload: UpdateProfilePayload): Promise<ProfileResponse> {
    const form = new FormData();

    const isPrimitive = (v: unknown): v is string | number | boolean => {
      const type = typeof v;
      return type === 'string' || type === 'number' || type === 'boolean';
    };

    const appendIfDefined = (key: string, value: unknown) => {
      if (value === undefined || value === null) return;
      if (value instanceof Blob) {
        form.append(key, value);
        return;
      }
      if (isPrimitive(value)) {
        form.append(key, String(value));
        return;
      }
      if (value instanceof Date) {
        form.append(key, value.toISOString());
        return;
      }
      // As a fallback for objects/arrays, serialize to JSON to avoid default [object Object]
      form.append(key, JSON.stringify(value));
    };

    appendIfDefined('avatar', payload.avatar);
    appendIfDefined('nickname', payload.nickname);
    appendIfDefined('dob_day', payload.dob_day);
    appendIfDefined('dob_month', payload.dob_month);
    appendIfDefined('dob_year', payload.dob_year);
    appendIfDefined('gender', payload.gender);
    appendIfDefined('nationality', payload.nationality);
    appendIfDefined('phone', payload.phone);

    return axiosClient
      .put<ProfileResponse>('/users/profile', form, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then((res) => res.data);
  }
}
