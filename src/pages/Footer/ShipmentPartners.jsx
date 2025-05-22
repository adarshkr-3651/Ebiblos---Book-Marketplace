import React, { useState } from 'react';

const ShipmentPartners = () => {
  const [location, setLocation] = useState('');
  const [partners, setPartners] = useState([]);
  const [error, setError] = useState('');

  // Shipment partners data
  const nepaliPartners = [
    // Your partners data here
  ];

  // List of cities in Nepal
  const nepaliCities = [
    // Your city list here
  ];

  const handleSearch = () => {
    setError('');
    const searchLocation = location.trim().toLowerCase();

    // Check if the entered city is in the valid cities list (case-insensitive)
    const isValidCity = nepaliCities.some(city =>
      city.toLowerCase() === searchLocation
    );

    if (!isValidCity) {
      setError('Please enter a valid city in Nepal');
      setPartners([]);
      return;
    }

    // Filter partners by city (case-insensitive)
    const filteredPartners = nepaliPartners.filter(partner =>
      partner.location.toLowerCase() === searchLocation
    );

    setPartners(filteredPartners);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-10 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-10">
          <div className="inline-block bg-gradient-to-r from-blue-600 to-indigo-600 p-2 rounded-3xl mb-6 shadow-lg">
            <h1 className="text-4xl font-bold text-white px-6 py-3 rounded-xl">
              🇳🇵 Nepal Shipment Partners
            </h1>
          </div>
          <p className="text-gray-600 text-xl font-medium">Find trusted courier services in your city</p>
        </div>

        {/* Search Section */}
        <div className="bg-white rounded-3xl shadow-xl p-8 mb-12 border-t-8 border-blue-500">
          <div className="flex items-center justify-between">
            <div className="flex-1 relative">
              <svg
                className="w-6 h-6 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <input
                type="text"
                placeholder="Enter city (e.g., Kathmandu, Pokhara)"
                className="w-full pl-12 pr-4 py-4 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
            </div>
            <button
              onClick={handleSearch}
              className="ml-4 px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all font-semibold shadow-lg flex items-center gap-2"
            >
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              Search
            </button>
          </div>
          {error && <p className="text-red-500 text-sm mt-3 ml-2">{error}</p>}
        </div>

        {/* Results Section */}
        {partners.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {partners.map((partner) => (
              <div
                key={partner.id}
                className="bg-white rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all border border-gray-200 group"
              >
                <div className="flex items-start gap-5 mb-5">
                  <div className="bg-gradient-to-br from-blue-100 to-indigo-100 p-4 rounded-xl shadow-lg">
                    <span className="text-3xl">{partner.logo}</span>
                  </div>
                  <div className="flex-1">
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">{partner.name}</h2>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={`w-5 h-5 ${i < Math.floor(partner.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.84-.197-1.54-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.646 8.719c-.784-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z"
                            />
                          </svg>
                        ))}
                      </div>
                      <p className="text-gray-500 text-sm">{partner.rating} / 5</p>
                    </div>
                  </div>
                </div>
                <p className="text-gray-700 mb-4">{partner.services.join(', ')}</p>
                <p className="text-gray-600 text-sm">{partner.deliveryTime}</p>
                <p className="text-gray-600 text-sm">{partner.contact}</p>
              </div>
            ))}
          </div>
        ) : (
          location && <p className="text-center text-lg text-gray-500">No partners found for "{location}"</p>
        )}
      </div>
    </div>
  );
};

export default ShipmentPartners;
