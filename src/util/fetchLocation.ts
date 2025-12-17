const fetchLocation = async (URL: string) => {
  try {
    const locationResponse = await fetch(URL);
    const locationResult = await locationResponse.json();

    if (!locationResponse.ok) {
        throw new Error("Failed to get location");
    }

    if (locationResult.results !== undefined) {
      const refinedSearchResult = locationResult.results.map(
        (location: {
          name: string;
          country: string;
          country_code: string;
          admin1: string;
          admin2: string;
          latitude: number | string;
          longitude: number | string;
        }) => ({
          name: location.name,
          country: location.country,
          countryCode: location.country_code,
          city: location.admin1,
          popularlyKnownAs: location.admin2,
          latitude: location.latitude,
          longitude: location.longitude,
        })
      );
      
      const { latitude, longitude } = refinedSearchResult[0];
    
      return { latitude, longitude }
    }
    if (locationResult.results === undefined) {
        return { latitude: undefined, longitude: undefined }
    }
} catch (error) {
    console.log(error);
    return { latitude: undefined, longitude: undefined }
    }
};

export default fetchLocation;
