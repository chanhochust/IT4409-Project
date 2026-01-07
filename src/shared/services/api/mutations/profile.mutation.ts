import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ProfileService } from '../profile.service';
import type { UpdateProfilePayload, ProfileResponse } from 'src/shared/types/api/profile/profile.type';
import type { AxiosError } from 'axios';

export function useUpdateProfileMutation() {
  const queryClient = useQueryClient();
  return useMutation<ProfileResponse, AxiosError, UpdateProfilePayload>({
    mutationKey: ['update-profile'],
    mutationFn: (payload) => ProfileService.updateProfile(payload),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['get-profile'] });
    },
  });
}
