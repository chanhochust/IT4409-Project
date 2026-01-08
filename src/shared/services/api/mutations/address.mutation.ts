import { useMutation, useQueryClient, type UseMutationResult } from '@tanstack/react-query';
import { AddressService, DeleteAddressResponse } from '../address.service';
import type { CreateAddressPayload, CreateAddressResponse } from 'src/shared/types/api/address/createAddress.type';
import type { AxiosError } from 'axios';

export function useCreateAddressMutation(): UseMutationResult<
  CreateAddressResponse,
  AxiosError<unknown>,
  CreateAddressPayload
> {
  const queryClient = useQueryClient();
  return useMutation<CreateAddressResponse, AxiosError<unknown>, CreateAddressPayload>({
    mutationKey: ['create-address'],
    mutationFn: (payload) => AddressService.createAddress(payload),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['get-my-addresses'] });
    },
  });
}

export function useUpdateAddressMutation(): UseMutationResult<
  CreateAddressResponse,
  AxiosError<unknown>,
  { id: string; payload: CreateAddressPayload }
> {
  const queryClient = useQueryClient();
  return useMutation<CreateAddressResponse, AxiosError<unknown>, { id: string; payload: CreateAddressPayload }>({
    mutationKey: ['update-address'],
    mutationFn: ({ id, payload }) => AddressService.updateAddress(id, payload),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['get-my-addresses'] });
    },
  });
}

export function useDeleteAddressMutation(): UseMutationResult<DeleteAddressResponse, AxiosError<unknown>, string> {
  const queryClient = useQueryClient();
  return useMutation<DeleteAddressResponse, AxiosError<unknown>, string>({
    mutationKey: ['delete-address'],
    mutationFn: (id) => AddressService.deleteAddress(id),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['get-my-addresses'] });
    },
  });
}
