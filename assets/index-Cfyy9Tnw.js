(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=`https://rickandmortyapi.com/api`;async function t(t={}){let n=new URLSearchParams,{name:r=``,status:i=``,species:a=``,gender:o=``,page:s=1}=t;r.trim()&&n.set(`name`,r.trim()),i&&n.set(`status`,i),a&&n.set(`species`,a),o&&n.set(`gender`,o),s&&n.set(`page`,s);let c=n.toString(),l=`${e}/character${c?`?${c}`:``}`,u=await fetch(l);if(!u.ok){if(u.status===404)return{results:[],info:{pages:0}};throw Error(`Failed to fetch characters`)}return u.json()}async function n(t){if(t.length===0)return[];let n=await fetch(`${e}/character/${t.join(`,`)}`);if(!n.ok)throw Error(`Failed to fetch favourite characters`);let r=await n.json();return Array.isArray(r)?r:[r]}async function r(t=1){let n=await fetch(`${e}/episode?page=${t}`);if(!n.ok)throw Error(`Failed to fetch episodes`);return n.json()}async function i(t=1){let n=await fetch(`${e}/location?page=${t}`);if(!n.ok)throw Error(`Failed to fetch locations`);return n.json()}var a=`rickAndMortyFavorites`;function o(){let e=localStorage.getItem(a);if(!e)return[];try{let t=JSON.parse(e);return Array.isArray(t)?t:[]}catch{return[]}}function s(e){return o().includes(Number(e))}function c(e){let t=Number(e),n=o(),r=n.includes(t)?n.filter(e=>e!==t):[...n,t];return localStorage.setItem(a,JSON.stringify(r)),r.includes(t)}function l(e){let t=document.querySelector(`#content_area`);t.innerHTML=`<div class="character_grid">${e.map(e=>{let{id:t,name:n,image:r,status:i,species:a,gender:o}=e,c=s(t);return`
        <article class="character_card">
          <img
            class="character_image"
            src="${r}"
            alt="${n}"
            loading="lazy"
          />

          <div class="character_info">
            <h2 class="character_name">${n}</h2>

            <div class="character_status">
              <span class="status_dot ${i.toLowerCase()}"></span>
              <span>${i} · ${a}</span>
            </div>

            <div class="character_bottom">
              <span class="character_gender">${o}</span>

              <button
                class="favorite_button ${c?`is_favorite`:``}"
                type="button"
                data-id="${t}"
                aria-label="${c?`Remove`:`Add`} ${n} ${c?`from`:`to`} favourites"
                aria-pressed="${c}"
              >
                <img 
                  src="/img/icon_rick_button.svg" 
                  alt="" 
                  class="favorite_icon"
                />
              </button>
            </div>
          </div>
        </article>
      `}).join(``)}</div>`}function u(e,t){let n=document.querySelector(`#pagination`);n.innerHTML=t<=1?``:`
    <button
      class="pagination_button"
      id="previous_page"
      ${e===1?`disabled`:``}
    >
      Previous
    </button>

    <span class="pagination_info">
      Page ${e} of ${t}
    </span>

    <button
      class="pagination_button"
      id="next_page"
      ${e===t?`disabled`:``}
    >
      Next
    </button>
  `}function d(e){let t=document.querySelector(`#content_area`);t.innerHTML=`<div class="episode_grid">${e.map(e=>{let{name:t,air_date:n,episode:r,characters:i}=e;return`
        <article class="episode_card">
          <div class="episode_top">
            <span class="episode_code">${r}</span>
          </div>

          <h2 class="episode_name">${t}</h2>

          <div class="episode_details">
            <p class="episode_date">
              <span>Air date:</span> ${n}
            </p>

            <p class="episode_characters">
              <span>Characters:</span> ${i.length}
            </p>
          </div>
        </article>
      `}).join(``)}</div>`}function f(e){let t=document.querySelector(`#content_area`);t.innerHTML=`<div class="location_grid">${e.map(e=>{let{name:t,type:n,dimension:r,residents:i}=e;return`
        <article class="location_card">
          <div class="location_top">
            <span class="location_type">${n}</span>
          </div>

          <h2 class="location_name">${t}</h2>

          <div class="location_details">
            <p class="location_dimension">
              <span>Dimension:</span> ${r}
            </p>

            <p class="location_residents">
              <span>Residents:</span> ${i.length}
            </p>
          </div>
        </article>
      `}).join(``)}</div>`}function p(){let e=document.querySelector(`#search_input`),a=document.querySelector(`#status_filter`),s=document.querySelector(`#species_filter`),p=document.querySelector(`#gender_filter`),m=document.querySelector(`#content_area`),h=document.querySelector(`#pagination`),g=document.querySelector(`#reset_filters`),_,v=0,y=1;function b(){return{name:e.value,status:a.value,species:s.value,gender:p.value,page:y}}async function x(){let e=++v;m.textContent=`Loading characters...`,h.innerHTML=``;try{let n=await t(b());if(e!==v)return;if(u(y,n.info.pages),n.results.length===0){m.textContent=`No characters found.`;return}l(n.results)}catch(t){if(e!==v)return;console.error(`Error loading characters:`,t),m.textContent=`Unable to load characters.`,h.innerHTML=``}}async function S(){let e=++v,t=o();if(m.textContent=`Loading favourites...`,h.innerHTML=``,t.length===0)m.textContent=`You haven't added any favourites yet.`;else try{let r=await n(t);if(e!==v)return;l(r)}catch(t){if(e!==v)return;console.error(`Error loading favourites:`,t),m.textContent=`Unable to load favourites.`}}async function C(){let e=++v;m.textContent=`Loading episodes...`,h.innerHTML=``;try{let t=await r(y);if(e!==v)return;d(t.results),u(y,t.info.pages)}catch(t){if(e!==v)return;console.error(`Error loading episodes:`,t),m.textContent=`Unable to load episodes.`,h.innerHTML=``}}async function w(){let e=++v;m.textContent=`Loading locations...`,h.innerHTML=``;try{let t=await i(y);if(e!==v)return;f(t.results),u(y,t.info.pages)}catch(t){if(e!==v)return;console.error(`Error loading locations:`,t),m.textContent=`Unable to load locations.`,h.innerHTML=``}}function T(){clearTimeout(_);let e=window.location.hash||`#characters`,t=e.slice(1);document.querySelectorAll(`.nav_link`).forEach(t=>{let n=t.getAttribute(`href`)===e;t.classList.toggle(`active`,n),n?t.setAttribute(`aria-current`,`page`):t.removeAttribute(`aria-current`)});let n={characters:`Characters`,episodes:`Episodes`,locations:`Locations`,favourites:`Favourites`};document.querySelector(`#section_title`).textContent=n[t]||`Characters`;let r={characters:`Explore the multiverse and meet the weird, wonderful, and downright bizarre characters of Rick and Morty.`,episodes:`Travel through every season and discover the adventures, chaos, and interdimensional madness.`,locations:`From distant planets to alternate dimensions, explore the strange places of the Rick and Morty universe.`,favourites:`Your own little corner of the multiverse. All your favourite characters in one place.`};document.querySelector(`#section_description`).textContent=r[t]||r.characters;let i=t===`characters`;document.querySelector(`.content_header`).classList.toggle(`centered`,!i),document.querySelector(`.search_container`).hidden=!i,document.querySelector(`.filters`).hidden=!i,y=1,t===`favourites`?S():t===`characters`?x():t===`episodes`?C():t===`locations`?w():(v++,h.innerHTML=``,m.textContent=`Coming soon!`)}e.addEventListener(`input`,()=>{clearTimeout(_),v++,y=1,h.innerHTML=``,_=setTimeout(x,300)}),[a,s,p].forEach(e=>{e.addEventListener(`change`,()=>{clearTimeout(_),y=1,x()})}),g.addEventListener(`click`,()=>{clearTimeout(_),e.value=``,a.value=``,s.value=``,p.value=``,y=1,x()});function E(){let e=window.location.hash;e===`#episodes`?C():e===`#locations`?w():x()}h.addEventListener(`click`,e=>{e.target.closest(`#previous_page`)&&y>1&&(y--,E()),e.target.closest(`#next_page`)&&(y++,E())}),m.addEventListener(`click`,e=>{let t=e.target.closest(`.favorite_button`);if(!t)return;let n=t.dataset.id,r=c(n);t.classList.toggle(`is_favorite`,r),t.setAttribute(`aria-pressed`,String(r));let i=t.closest(`.character_card`).querySelector(`.character_name`).textContent;t.setAttribute(`aria-label`,`${r?`Remove`:`Add`} ${i} ${r?`from`:`to`} favourites`),window.location.hash===`#favourites`&&!r&&(t.closest(`.character_card`).remove(),o().length===0&&(m.textContent=`You haven't added any favourites yet.`))});let D=document.querySelector(`#card_modal`),O=document.querySelector(`#modal_content`);document.querySelector(`#modal_close`).addEventListener(`click`,()=>{D.close()}),m.addEventListener(`click`,e=>{if(e.target.closest(`.favorite_button`))return;let t=e.target.closest(`.character_card, .episode_card, .location_card`);if(!t)return;let n=t.cloneNode(!0);n.querySelector(`.favorite_button`)?.remove(),O.replaceChildren(n),D.showModal()}),window.addEventListener(`hashchange`,T),T()}p(),i().then(e=>{console.log(`Locations:`,e)});