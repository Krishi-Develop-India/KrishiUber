import authClient from './authClient';

const endpointServices = '/services';
const endpointReverseGeoCoding = '/locationLabel';
const endpointNearestTractor = '/getNearestTractor';

const getReverGeoCoding = (latitude, longitude) => (
    authClient.post(endpointReverseGeoCoding, {latitude, longitude})
);

const getNearestTractor = (latitude, longitude) => (
    authClient.post(endpointNearestTractor, {latitude, longitude})
)

const getServices = () => (
    authClient.get(endpointServices)
)

export default {
    getServices,
    getNearestTractor,
    getReverGeoCoding,
}