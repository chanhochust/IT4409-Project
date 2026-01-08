import { generateUseQueryHook } from 'src/shared/utils/reactQuery';
import { AddressService } from '../address.service';

export const useMyAddressesQuery = generateUseQueryHook(() => AddressService.getMyAddresses(), 'get-my-addresses');
