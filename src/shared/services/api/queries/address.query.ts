import { useQuery } from '@tanstack/react-query';
import { generateUseQueryHook } from 'src/shared/utils/reactQuery';
import { AddressService } from '../address.service';

export const useMyAddressesQuery = generateUseQueryHook(() => AddressService.getMyAddresses(), 'get-my-addresses');

export function useAddressByIdQuery(addressId: string | null | undefined) {
  return useQuery({
    queryKey: ['get-address-by-id', addressId],
    queryFn: () => AddressService.getAddressById(addressId!),
    enabled: !!addressId,
  });
}
