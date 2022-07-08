export interface Prediction {
  description: string;
  place_id: string;
}

export interface Place {
  formatted_address: string;
  geometry: {
    location: {
      lat: number;
      lng: number;
    };
  };
}

export const searchLocation = async (search: string) => {
  const params = new URLSearchParams();
  params.append('q', search);

  const url = new URL(
    `?${params.toString()}`,
    'https://compa-api.vercel.app/api/places'
  );

  const res = await fetch(url.toString(), {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = await res.json();
  return data as Prediction[];
};

export const getPlaceDetail = async (placeId: string) => {
  const params = new URLSearchParams();
  params.append('placeId', placeId);

  const url = new URL(
    `?${params.toString()}`,
    'https://compa-api.vercel.app/api/placeDetails'
  );

  const res = await fetch(url.toString(), {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = await res.json();
  return data as Place;
};
