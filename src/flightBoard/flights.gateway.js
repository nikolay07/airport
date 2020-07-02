const baseUrl = "https://api.iev.aero/api/flights";

export const fetchFlights = async (date) => {
  const res = await fetch(`${baseUrl}/${date}`);
  if (res.ok) return res.json();
  throw new Error(`Could not fetch, received ${res.status}`);
};
