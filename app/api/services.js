import client from './client';

const endpoint = '/services';

const getServices = () => client.get(endpoint);

export default {
    getServices
}