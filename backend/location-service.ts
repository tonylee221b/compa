export interface Prediction {
  description: string;
  place_id: string;
}
const GOOGLE_MAP_API_KEY = '';
if (GOOGLE_MAP_API_KEY.length === 0)
  throw new Error('Missing google map api key');

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
