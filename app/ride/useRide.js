import { useContext } from 'react';

import RideContext from './context';

import RideStorage from './storage';

export default useRide = () => {
    const { ride, setRide } = useContext(RideContext);

    const storeTheRide = ride => {
        RideStorage.storeRide(ride);
        setRide(ride);
        console.log("New ride saved");
    };

    const removeTheRide = () => {
        RideStorage.removeRide();
        setRide(null);
        console.log("Ride removed successfully");
    };

    return { ride, storeTheRide, removeTheRide }

};
