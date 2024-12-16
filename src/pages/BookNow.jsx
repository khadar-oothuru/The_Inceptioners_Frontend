import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import BookingForm from '../components/BookForm';
import axios from 'axios';

const BookNow = () => {
    const { id } = useParams();
    const [packageDetails, setPackageDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchPackageDetails = async () => {
            try {
                const response = await axios.get(
                   `https://the-inceptioners-backend.vercel.app/api/packages/${id}`
                //      `http://localhost:4000/api/packages/${id}`
                );
                setPackageDetails(response.data);
                setLoading(false);
            } catch (err) {
                setError('Failed to load package details. Please try again later.');
                setLoading(false);
            }
        };

        fetchPackageDetails();
    }, [id]);

    if (loading) {
        return <p>Loading package details...</p>;
    }

    if (error) {
        return <p className="text-red-500">{error}</p>;
    }

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Book Your Package</h1>
            {packageDetails ? (
                <div>
                    <img
                        src={packageDetails.image}
                        alt={packageDetails.title}
                        className="w-full h-64 object-cover rounded mb-4"
                    />
                    <h2 className="text-xl font-bold mb-2">{packageDetails.title}</h2>
                    <p className="text-gray-600 mb-4">{packageDetails.description}</p>
                    <p className="text-blue-600 font-bold mb-4">Price: ${packageDetails.price}</p>
                    <BookingForm
                        packageId={packageDetails._id}
                        price={packageDetails.price}
                        title={packageDetails.title}
                    />
                </div>
            ) : (
                <p>No package details found.</p>
            )}
        </div>
    );
};

export default BookNow;
