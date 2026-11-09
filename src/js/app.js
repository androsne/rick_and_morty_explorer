// Import API function
import {
  getCharacters,
  getCharactersByIds,
  getEpisodes,
  getLocations,
} from "./api.js";
import {
  renderCharacters,
  renderPagination,
  renderEpisodes,
  renderLocations,
} from "./ui.js";
import { getFavorites, toggleFavorite } from "./favorites.js";

export function initApp() {
  const searchInput = document.querySelector("#search_input");
  const statusFilter = document.querySelector("#status_filter");
  const speciesFilter = document.querySelector("#species_filter");
  const genderFilter = document.querySelector("#gender_filter");
  const contentArea = document.querySelector("#content_area");
  const pagination = document.querySelector("#pagination");
  const resetButton = document.querySelector("#reset_filters");

  let searchTimeout;
  let requestId = 0;
  let currentPage = 1;

  function getFilters() {
    return {
      name: searchInput.value,
      status: statusFilter.value,
      species: speciesFilter.value,
      gender: genderFilter.value,
      page: currentPage,
    };
  }

  async function loadCharacters() {
    const currentRequest = ++requestId;
    contentArea.textContent = "Loading characters...";
    pagination.innerHTML = "";

    try {
      const data = await getCharacters(getFilters());

      if (currentRequest !== requestId) return;

      // RENDER PAGINATION
      renderPagination(currentPage, data.info.pages);

      // CHECK SEARCH CHARACTERS
      if (data.results.length === 0) {
        contentArea.textContent = "No characters found.";
        return;
      }

      // RENDER CHARACTER CARDS
      renderCharacters(data.results);
    } catch (error) {
      if (currentRequest !== requestId) return;

      console.error("Error loading characters:", error);

      contentArea.textContent = "Unable to load characters.";

      pagination.innerHTML = "";
    }
  }

  // LOAD FAVOURITES
  async function loadFavorites() {
    const currentRequest = ++requestId;
    const favoriteIds = getFavorites();

    contentArea.textContent = "Loading favourites...";
    pagination.innerHTML = "";

    if (favoriteIds.length === 0) {
      contentArea.textContent = "You haven't added any favourites yet.";
      return;
    }

    try {
      const characters = await getCharactersByIds(favoriteIds);

      if (currentRequest !== requestId) return;

      renderCharacters(characters);
    } catch (error) {
      if (currentRequest !== requestId) return;

      console.error("Error loading favourites:", error);
      contentArea.textContent = "Unable to load favourites.";
    }
  }

  // LOAD EPISODES
  async function loadEpisodes() {
    const currentRequest = ++requestId;
    contentArea.textContent = "Loading episodes...";
    pagination.innerHTML = "";

    try {
      const data = await getEpisodes(currentPage);

      if (currentRequest !== requestId) return;

      renderEpisodes(data.results);
      renderPagination(currentPage, data.info.pages);
    } catch (error) {
      if (currentRequest !== requestId) return;

      console.error("Error loading episodes:", error);
      contentArea.textContent = "Unable to load episodes.";
      pagination.innerHTML = "";
    }
  }

  // LOAD LOCATIONS
  async function loadLocations() {
    const currentRequest = ++requestId;
    contentArea.textContent = "Loading locations...";
    pagination.innerHTML = "";

    try {
      const data = await getLocations(currentPage);

      if (currentRequest !== requestId) return;

      renderLocations(data.results);
      renderPagination(currentPage, data.info.pages);
    } catch (error) {
      if (currentRequest !== requestId) return;

      console.error("Error loading locations:", error);
      contentArea.textContent = "Unable to load locations.";
      pagination.innerHTML = "";
    }
  }

  // NAVIGATION
  function navigate() {
    clearTimeout(searchTimeout);

    const hash = window.location.hash || "#characters";
    const section = hash.slice(1);

    // Update active navigation link
    document.querySelectorAll(".nav_link").forEach((link) => {
      const isActive = link.getAttribute("href") === hash;

      link.classList.toggle("active", isActive);

      if (isActive) {
        link.setAttribute("aria-current", "page");
      } else {
        link.removeAttribute("aria-current");
      }
    });

    // Update section title
    const titles = {
      characters: "Characters",
      episodes: "Episodes",
      locations: "Locations",
      favourites: "Favourites",
    };

    document.querySelector("#section_title").textContent =
      titles[section] || "Characters";

    const descriptions = {
      characters: "Explore the bizarre characters of Rick and Morty.",
      episodes:
        "Travel through every season and discover the adventures, chaos, and interdimensional madness.",
      locations:
        "From distant planets to alternate dimensions, explore the strange places of the Rick and Morty universe.",
      favourites:
        "Your own little corner of the multiverse. All your favourite characters in one place.",
    };

    document.querySelector("#section_description").textContent =
      descriptions[section] || descriptions.characters;

    // Show search and filters only for Characters
    const isCharacters = section === "characters";

    document
      .querySelector(".content_header")
      .classList.toggle("centered", !isCharacters);
    document.querySelector(".search_container").hidden = !isCharacters;
    document.querySelector(".filters").hidden = !isCharacters;

    // Reset pagination when changing sections
    currentPage = 1;

    // Load selected view
    if (section === "favourites") {
      loadFavorites();
    } else if (section === "characters") {
      loadCharacters();
    } else if (section === "episodes") {
      loadEpisodes();
    } else if (section === "locations") {
      loadLocations();
    } else {
      requestId++;
      pagination.innerHTML = "";
      contentArea.textContent = "Coming soon!";
    }
  }

  //SEARCH
  searchInput.addEventListener("input", () => {
    clearTimeout(searchTimeout);
    requestId++;
    currentPage = 1;
    pagination.innerHTML = "";

    searchTimeout = setTimeout(loadCharacters, 300);
  });

  // FILTERS
  [statusFilter, speciesFilter, genderFilter].forEach((filter) => {
    filter.addEventListener("change", () => {
      clearTimeout(searchTimeout);
      currentPage = 1;
      loadCharacters();
    });
  });

  /* RESET FILTERS */
  resetButton.addEventListener("click", () => {
    clearTimeout(searchTimeout);

    searchInput.value = "";
    statusFilter.value = "";
    speciesFilter.value = "";
    genderFilter.value = "";

    currentPage = 1;
    loadCharacters();
  });

  // PAGINATION //
  function loadCurrentPage() {
    const hash = window.location.hash;

    if (hash === "#episodes") {
      loadEpisodes();
    } else if (hash === "#locations") {
      loadLocations();
    } else {
      loadCharacters();
    }
  }

  pagination.addEventListener("click", (event) => {
    if (event.target.closest("#previous_page")) {
      if (currentPage > 1) {
        currentPage--;
        loadCurrentPage();
      }
    }

    if (event.target.closest("#next_page")) {
      currentPage++;
      loadCurrentPage();
    }
  });

  // FAVOURITES
  contentArea.addEventListener("click", (event) => {
    const button = event.target.closest(".favorite_button");

    if (!button) return;

    const id = button.dataset.id;
    const isNowFavorite = toggleFavorite(id);

    button.classList.toggle("is_favorite", isNowFavorite);

    button.setAttribute("aria-pressed", String(isNowFavorite));

    const characterName = button
      .closest(".character_card")
      .querySelector(".character_name").textContent;

    button.setAttribute(
      "aria-label",
      `${isNowFavorite ? "Remove" : "Add"} ${characterName} ${isNowFavorite ? "from" : "to"} favourites`,
    );

    if (window.location.hash === "#favourites" && !isNowFavorite) {
      button.closest(".character_card").remove();

      if (getFavorites().length === 0) {
        contentArea.textContent = "You haven't added any favourites yet.";
      }
    }
  });

  // CARD MODAL
  const modal = document.querySelector("#card_modal");
  const modalContent = document.querySelector("#modal_content");
  const modalClose = document.querySelector("#modal_close");

  modalClose.addEventListener("click", () => {
    modal.close();
  });

  // OPEN CARD MODAL
  contentArea.addEventListener("click", (event) => {
    // Don't open the modal when clicking a favourite button
    if (event.target.closest(".favorite_button")) return;

    const card = event.target.closest(
      ".character_card, .episode_card, .location_card",
    );

    if (!card) return;

    // Copy the selected card's content
    const cardCopy = card.cloneNode(true);

    // Remove favourite button from the modal
    cardCopy.querySelector(".favorite_button")?.remove();

    modalContent.replaceChildren(cardCopy);

    modal.showModal();
  });

  // HANDLE NAVIGATION
  window.addEventListener("hashchange", navigate);

  // INITIAL LOAD
  navigate();
}
