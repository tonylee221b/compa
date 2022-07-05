// state = 'ontario', country = 'canada'
export async function getAllCities(
  country: string,
  state: string
): Promise<string[]> {
  const body = {
    state,
    country,
  };
  const req = new Request(
    'https://countriesnow.space/api/v0.1/countries/state/cities',
    {
      body: JSON.stringify(body),
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  const res = await fetch(req);
  const data = await res.json();
  return data.data;
}

// country = 'canada'
export async function getAllProvinces(
  country: string
): Promise<{ name: string; state_code: string }[]> {
  const body = {
    country,
  };
  const req = new Request(
    'https://countriesnow.space/api/v0.1/countries/states',
    {
      body: JSON.stringify(body),
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  const res = await fetch(req);
  const data = await res.json();
  return data.data.states;
}
