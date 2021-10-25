import './Card.css';
import { useState } from "react";

// Component for individual news card
function Card({ article }) {

  const launchModal = () => {
    //TODO set modal to is-active and display background
  }

  return (
    <div class="card mt-6" id="news-card">
      <header class="card-header">
        <p class="card-header-title">
          Component
        </p>
        <button class="card-header-icon" aria-label="more options">
          <span class="icon">
            <i class="fas fa-angle-down" aria-hidden="true"></i>
          </span>
        </button>
      </header>
      <div class="card-image">
        <figure class="image is-4by3">
          <img src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder image" />
        </figure>
      </div>
      <div class="card-content" id="news-content">
        <div class="media">
          <div class="media-left">
            <figure class="image is-48x48">
              <img src="https://bulma.io/images/placeholders/96x96.png" alt="Placeholder image" />
            </figure>
          </div>
          <div class="media-content">
            <p class="title is-4">{article.name}</p>
            <p class="subtitle is-6">@johnsmith</p>
          </div>
        </div>
        <div class="content">
          Lorem ipsum leo risus, porta ac consectetur ac, vestibulum at eros.
          Donec id elit non mi porta gravida at eget metus. Cum sociis natoque
          penatibus et magnis dis parturient montes, nascetur ridiculus mus.
          Cras mattis consectetur purus sit amet fermentum.
        </div>
        <button class="button is-link">Expand</button>

        <div class="modal">
          <div class="modal-background"></div>
          <div class="modal-card">
            <header class="modal-card-head">
              <p class="modal-card-title">Modal title</p>
              <button class="delete" aria-label="close"></button>
            </header>
            <section class="modal-card-body">
              {/* <!-- Content ... --> */}
            </section>
            <footer class="modal-card-foot">
              <button class="button is-success">Save changes</button>
              <button class="button">Cancel</button>
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
