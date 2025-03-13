import axios from 'axios';
import { clientEnvironment } from 'src/shared/environments/client';

export const axiosClient = axios.create({
  baseURL: `${clientEnvironment.apiURL}/api/v1`,
  timeout: 30000,
});
