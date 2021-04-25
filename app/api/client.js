import { create } from 'apisauce';
import Network from '../config/network';

const apiClient = create({
    baseURL: Network.server_host+'/api',
});

export default apiClient;