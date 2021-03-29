import { create } from 'apisauce';

const apiClient = create({
    baseURL: 'http://192.168.43.102/api',
});

export default apiClient;