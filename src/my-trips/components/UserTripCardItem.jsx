import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

function UserTripCardItem({ trip, onDeleteTrip }) {
  const [photoUrl, setPhotoUrl] = useState();
  const [hover, setHover] = useState(false);

  useEffect(() => {
    trip && GetPlacePhoto();
  }, [trip]);

  const GetPlacePhoto = async () => {
    const data = {
      textQuery: trip?.userSelection?.location?.label,
    };
    const result = await GetPlaceDetails(data).then((resp) => {
      const PhotoUrl = PHOTO_REF_URL.replace('{NAME}', resp.data.places[0].photos[3].name);
      setPhotoUrl(PhotoUrl);
    });
  };

  const handleDeleteTrip = () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this trip? (Press OK for Yes, Cancel for No)");
    if (confirmDelete) {
      onDeleteTrip(trip.id);
    }
  };

  return (
    <Link to={'/view-trip/' + trip?.id}>
      <div
        className={`relative overflow-hidden rounded-xl h-[250px] w-full ${
          hover ? 'shadow-lg' : ''
        }`}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <img
          src={photoUrl ? photoUrl : '/placeholder.jpeg'}
          className={`object-cover rounded-xl h-[250px] w-full transition-all ${
            hover ? 'scale-105' : ''
          }`}
        />
        <div
          className={`absolute bottom-0 left-0 p-4 text-white ${
            hover ? 'bg-black bg-opacity-70' : 'bg-transparent'
          } transition-all`}
        >
          <h2 className="font-bold text-lg">{trip?.userSelection?.location?.label}</h2>
          <h2 className="text-sm text-gray-500">
            {trip?.userSelection?.noOfDays} Days trip {trip?.userSelection?.budget} with Budget
          </h2>
        </div>
        <button
          className="absolute top-2 right-2 text-red-500 hover:text-red-700 transition-all"
          onClick={handleDeleteTrip}
        >
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </div>
    </Link>
  );
}

export default UserTripCardItem;
