import { isFavorite } from "./favorites";

export function renderCharacters(characters) {
  const contentArea = document.querySelector("#content_area");

  const cards = characters
    .map((character) => {
      const { id, name, image, status, species, gender } = character;

      const favorite = isFavorite(id);

      return `
        <article class="character_card">
          <img
            class="character_image"
            src="${image}"
            alt="${name}"
            loading="lazy"
          />

          <div class="character_info">
            <h2 class="character_name">${name}</h2>

            <div class="character_status">
              <span class="status_dot ${status.toLowerCase()}"></span>
              <span>${status} · ${species}</span>
            </div>

            <div class="character_bottom">
              <span class="character_gender">${gender}</span>

              <button
                class="favorite_button ${favorite ? "is_favorite" : ""}"
                type="button"
                data-id="${id}"
                aria-label="${favorite ? "Remove" : "Add"} ${name} ${favorite ? "from" : "to"} favourites"
                aria-pressed="${favorite}"
              >
                <img
                  src="${import.meta.env.BASE_URL}img/icon_rick_button.svg"
                  alt=""
                  class="favorite_icon"
                />
              </button>
            </div>
          </div>
        </article>
      `;
    })
    .join("");

  contentArea.innerHTML = `<div class="character_grid">${cards}</div>`;
}

export function renderPagination(currentPage, totalPages) {
  const pagination = document.querySelector("#pagination");

  if (totalPages <= 1) {
    pagination.innerHTML = "";
    return;
  }

  pagination.innerHTML = `
    <button
      class="pagination_button"
      id="previous_page"
      ${currentPage === 1 ? "disabled" : ""}
    >
      Previous
    </button>

    <span class="pagination_info">
      Page ${currentPage} of ${totalPages}
    </span>

    <button
      class="pagination_button"
      id="next_page"
      ${currentPage === totalPages ? "disabled" : ""}
    >
      Next
    </button>
  `;
}

export function renderEpisodes(episodes) {
  const contentArea = document.querySelector("#content_area");

  const cards = episodes
    .map((episode) => {
      const { name, air_date, episode: episodeCode, characters } = episode;

      return `
        <article class="episode_card">
          <div class="episode_top">
            <span class="episode_code">${episodeCode}</span>
          </div>

          <h2 class="episode_name">${name}</h2>

          <div class="episode_details">
            <p class="episode_date">
              <span>Air date:</span> ${air_date}
            </p>

            <p class="episode_characters">
              <span>Characters:</span> ${characters.length}
            </p>
          </div>
        </article>
      `;
    })
    .join("");

  contentArea.innerHTML = `<div class="episode_grid">${cards}</div>`;
}

export function renderLocations(locations) {
  const contentArea = document.querySelector("#content_area");

  const cards = locations
    .map((location) => {
      const { name, type, dimension, residents } = location;

      return `
        <article class="location_card">
          <div class="location_top">
            <span class="location_type">${type}</span>
          </div>

          <h2 class="location_name">${name}</h2>

          <div class="location_details">
            <p class="location_dimension">
              <span>Dimension:</span> ${dimension}
            </p>

            <p class="location_residents">
              <span>Residents:</span> ${residents.length}
            </p>
          </div>
        </article>
      `;
    })
    .join("");

  contentArea.innerHTML = `<div class="location_grid">${cards}</div>`;
}
