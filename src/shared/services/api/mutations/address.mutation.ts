import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AddressService } from '../address.service';
import type { CreateAddressPayload, CreateAddressResponse } from 'src/shared/types/api/address/createAddress.type';
import type { AxiosError } from 'axios';

export function useCreateAddressMutation() {
  const queryClient = useQueryClient();
  return useMutation<CreateAddressResponse, AxiosError, CreateAddressPayload>({
    mutationKey: ['create-address'],
    mutationFn: (payload) => AddressService.createAddress(payload),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['get-my-addresses'] });
    },
  });
}
