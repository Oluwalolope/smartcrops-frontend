export interface LocationResult {
  city?: string;
  state?: string;
  country?: string;
  displayName?: string;
}

export const reverseGeocode = async (
  latitude: number,
  longitude: number
): Promise<LocationResult> => {
  const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;

  const response = await fetch(url, {
    headers: {
      "User-Agent": "smartcrops-frontend/1.0",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch location");
  }

  const data = await response.json();

  return {
    city:
      data.address.city ||
      data.address.town ||
      data.address.village ||
      "",
    state: data.address.state || "",
    country: data.address.country || "",
    displayName: data.display_name || "",
  };
}
