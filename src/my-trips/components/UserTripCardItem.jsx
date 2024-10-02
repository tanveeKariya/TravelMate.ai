
// import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi';
// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';

// function UserTripCardItem({ trip }) {
//   const [photoUrl, setPhotoUrl] = useState();
//   const [hover, setHover] = useState(false);

//   useEffect(() => {
//     trip && GetPlacePhoto();
//   }, [trip]);

//   const GetPlacePhoto = async () => {
//     const data = {
//       textQuery: trip?.userSelection?.location?.label,
//     };
//     const result = await GetPlaceDetails(data).then((resp) => {
//       const PhotoUrl = PHOTO_REF_URL.replace('{NAME}', resp.data.places[0].photos[3].name);
//       setPhotoUrl(PhotoUrl);
//     });
//   };

//   return (
//     <Link to={'/view-trip/' + trip?.id}>
//       <div
//         className={`relative overflow-hidden rounded-xl h-[250px] w-full ${
//           hover ? 'shadow-lg' : ''
//         }`}
//         onMouseEnter={() => setHover(true)}
//         onMouseLeave={() => setHover(false)}
//       >
//         <img
//           src={photoUrl ? photoUrl : '/placeholder.jpeg'}
//           className={`object-cover rounded-xl h-[250px] w-full transition-all ${
//             hover ? 'scale-105' : ''
//           }`}
//         />
//         <div
//           className={`absolute bottom-0 left-0 p-4 text-white ${
//             hover ? 'bg-black bg-opacity-50' : 'bg-transparent'
//           } transition-all`}
//         >
//           <h2 className="font-bold text-lg">{trip?.userSelection?.location?.label}</h2>
//           <h2 className="text-sm text-gray-500">
//             {trip?.userSelection?.noOfDays} Days trip {trip?.userSelection?.budget} with Budget
//           </h2>
//         </div>
//         <div
//           className={`absolute top-0 left-0 w-full h-full ${
//             hover ? 'bg-gradient-to-r from-transparent to-black' : 'bg-transparent'
//           } transition-all`}
//         />
//       </div>
//     </Link>
//   );
// }

// export default UserTripCardItem;
import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

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
    onDeleteTrip(trip.id);
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
            hover ? 'bg-black bg-opacity-50' : 'bg-transparent'
          } transition-all`}
        >
          <h2 className="font-bold text-lg">{trip?.userSelection?.location?.label}</h2>
          <h2 className="text-sm text-gray-500">
            {trip?.userSelection?.noOfDays} Days trip {trip?.userSelection?.budget} with Budget
          </h2>
        </div>
        <div
          className={`absolute top-0 left-0 w-full h-full ${
            hover ? 'bg-gradient-to-r from-transparent to-black' : 'bg-transparent'
          } transition-all`}
        />
        <button
          className="absolute top-2 right-2 text-red-500 hover:text-red-700 transition-all"
          onClick={handleDeleteTrip}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
            <path fill="none" d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2Z" />
            <path fill="currentColor" d="M17 7L17 17M7 17L7 7" />
          </svg>
        </button>
      </div>
    </Link>
  );
}

export default UserTripCardItem;