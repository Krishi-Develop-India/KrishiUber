import { create } from 'apisauce';
import AuthStorage from '../auth/storage';

const apiClient = create({
    baseURL: 'http://192.168.43.102/auth/api',
});

apiClient.addAsyncRequestTransform(async request => {
    const token = await AuthStorage.getToken();
    if(!token) return;
    request.data.token = token;
});

export default apiClient;