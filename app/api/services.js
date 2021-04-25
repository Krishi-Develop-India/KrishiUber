import authClient from './authClient';

const endpointPlaces = '/getPlaces';
const endpointDeletePlace = './deleteplace';
const endpointServices = '/getServices';
const endpointReverseGeoCoding = '/locationLabel';
const endpointNearestTractor = '/getNearestTractor';
const endpointBookTractor = '/bookTractor';

const getPlaces = () => (
    authClient.post(endpointPlaces, {})
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
    authClient.post(endpointServices, {})
)

const bookTractor = (latitude, longitude, area, price) => (
    authClient.post(endpointBookTractor, {latitude, longitude, area, price})
)

export default {
    getServices,
    getNearestTractor,
    getReverGeoCoding,
    getPlaces,
    deletePlace,
    bookTractor,
}