const API_URL = "https://rickandmortyapi.com/api";

export async function getCharacters(filters = {}) {
  const params = new URLSearchParams();

  const {
    name = "",
    status = "",
    species = "",
    gender = "",
    page = 1,
  } = filters;

  if (name.trim()) params.set("name", name.trim());
  if (status) params.set("status", status);
  if (species) params.set("species", species);
  if (gender) params.set("gender", gender);
  if (page) params.set("page", page);

  const query = params.toString();
  const url = `${API_URL}/character${query ? `?${query}` : ""}`;

  const response = await fetch(url);

  if (!response.ok) {
    if (response.status === 404) {
      return { results: [], info: { pages: 0 } };
    }

    throw new Error("Failed to fetch characters");
  }

  return response.json();
}

export async function getCharactersByIds(ids) {
  if (ids.length === 0) {
    return [];
  }

  const response = await fetch(`${API_URL}/character/${ids.join(",")}`);

  if (!response.ok) {
    throw new Error("Failed to fetch favourite characters");
  }

  const data = await response.json();

  return Array.isArray(data) ? data : [data];
}

export async function getEpisodes(page = 1) {
  const response = await fetch(`${API_URL}/episode?page=${page}`);

  if (!response.ok) {
    throw new Error("Failed to fetch episodes");
  }

  return response.json();
}

export async function getLocations(page = 1) {
  const response = await fetch(`${API_URL}/location?page=${page}`);

  if (!response.ok) {
    throw new Error("Failed to fetch locations");
  }

  return response.json();
}
