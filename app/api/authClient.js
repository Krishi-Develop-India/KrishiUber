import { create } from 'apisauce';
import AuthStorage from '../auth/storage';
import Network from '../config/network';

const apiClient = create({
    baseURL: Network.server_host+'/auth/api',
});

apiClient.addAsyncRequestTransform(async request => {
    const token = await AuthStorage.getToken();
    if(!token) return;
    request.data.token = token;
});

export default apiClient;