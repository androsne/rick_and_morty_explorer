
const STORAGE_KEY = "rickAndMortyFavorites";

// Get all saved favourite character IDs
export function getFavorites() {
  const stored = localStorage.getItem(STORAGE_KEY);

  if (!stored) return [];

  try {
    const favorites = JSON.parse(stored);
    return Array.isArray(favorites) ? favorites : [];
  } catch {
    return [];
  }
}

// Check whether a character is a favourite
export function isFavorite(id) {
  return getFavorites().includes(Number(id));
}

// Add or remove a character from favourites
export function toggleFavorite(id) {
  const characterId = Number(id);
  const favorites = getFavorites();

  const updatedFavorites = favorites.includes(characterId)
    ? favorites.filter((favoriteId) => favoriteId !== characterId)
    : [...favorites, characterId];

  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedFavorites));

  return updatedFavorites.includes(characterId);
}
