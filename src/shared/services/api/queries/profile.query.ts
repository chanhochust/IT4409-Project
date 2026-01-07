import { generateUseQueryHook } from 'src/shared/utils/reactQuery';
import { ProfileService } from '../profile.service';

/** Utilize the generateUseQueryHook to create a query quickly while keeping the type safety */
export const useProfileQuery = generateUseQueryHook(() => ProfileService.getProfile(), 'get-profile');
