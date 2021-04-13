import authClient from './authClient';

const endpointPlaces = '/places';
const endpointDeletePlace = './deleteplace';
const endpointServices = '/services';
const endpointReverseGeoCoding = '/locationLabel';
const endpointNearestTractor = '/getNearestTractor';

const getPlaces = () => (
    authClient.get(endpointPlaces)
);

const deletePlace = item => (
    authClient.post(endpointDeletePlace, {item})
);

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
    getPlaces,
    deletePlace,
}