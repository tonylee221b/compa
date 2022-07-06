export interface Prediction {
  description: string;
  place_id: string;
}
const GOOGLE_MAP_API_KEY = '';
if (GOOGLE_MAP_API_KEY.length === 0)
  throw new Error('Missing google map api key');

export const searchLocation = async (search: string) => {
  const params = new URLSearchParams();
  params.append('input', search);
  params.append('types', 'establishment');
  params.append('key', GOOGLE_MAP_API_KEY);

  const url = new URL(
    `?${params.toString()}`,
    'https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/autocomplete/json'
  );

  const res = await fetch(url.toString(), {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = await res.json();
  return data.predictions as Prediction[];
};
