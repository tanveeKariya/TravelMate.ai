import { db } from '@/service/firebaseConfig';
import { collection, getDocs, query, where, doc, deleteDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Ensure to import useNavigate
import UserTripCardItem from './components/UserTripCardItem';

function MyTrips() {
    const navigate = useNavigate();
    const [userTrips, setUserTrips] = useState([]);

    useEffect(() => {
        GetUserTrips();
    }, []);

    /**
     * Used to Get All User Trips
     * @returns
     */
    const GetUserTrips = async () => {
        const user = JSON.parse(localStorage.getItem('user'));

        if (!user) {
            navigate('/'); // Redirect to home if user not found
            return;
        }

        const q = query(collection(db, 'AITrips'), where('userEmail', '==', user?.email));
        const querySnapshot = await getDocs(q);
        const tripsArray = []; // Use an array to collect trips

        querySnapshot.forEach((doc) => {
            console.log(doc.id, " => ", doc.data());
            tripsArray.push({ id: doc.id, ...doc.data() }); // Include id in the trip data
        });

        setUserTrips(tripsArray); // Set userTrips to the collected array
    };

    const handleDeleteTrip = async (tripId) => {
        try {
            const tripRef = doc(db, 'AITrips', tripId);
            await deleteDoc(tripRef); // Delete trip from Firestore
            setUserTrips(userTrips.filter(trip => trip.id !== tripId)); // Update local state
            navigate('/my-trips'); // Redirect to My Trips page after deletion
        } catch (error) {
            console.error("Error deleting trip:", error);
        }
    };

    return (
        <div className='sm:px-10 md:px-132 lg:px-56 xl:px-72 px-5 mt-10'>
            <h2 className='font-bold text-3xl'>My Trips</h2>

            <div className='grid grid-cols-2 mt-10 md:grid-cols-3 gap-5'>
                {userTrips.length > 0 ? (
                    userTrips.map((trip) => (
                        <UserTripCardItem
                            trip={trip}
                            key={trip.id} // Use trip.id as the key
                            onDeleteTrip={handleDeleteTrip} // Pass handleDeleteTrip directly
                        />
                    ))
                ) : (
                    [1, 2, 3, 4, 5, 6].map((_, index) => (
                        <div
                            key={index}
                            className='h-[250px] w-full bg-slate-200 animate-pulse rounded-xl'
                        />
                    ))
                )}
            </div>
        </div>
    );
}

export default MyTrips;
