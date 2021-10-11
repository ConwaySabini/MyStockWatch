import './Card.css';

function Card() {
  return (
    <div className="Card">
      <div class="column is-4">
        <div class="card is-shady">
          <div class="card-image">
            {/* <figure class="image is-4by3">
              <img src="https://source.unsplash.com/6Ticnhs1AG0" alt="Placeholder image" />
            </figure> */}
          </div>
          <div class="card-content">
            <div class="content">
              <h4>Tempor orci dapibus faber in.</h4>
              <p>Ut venenatis tellus in metus vulputate.Amet consectetur adipiscing elit pellentesque.Sed arcu non odio euismod lacinia at quis risus.Faucibus turpis in eu mi bibendum neque egestas cmonsu songue.Phasellus vestibulum lorem
                sed risus.</p>
              <span class="button is-link modal-button" data-target="modal-card">Modal Card</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
