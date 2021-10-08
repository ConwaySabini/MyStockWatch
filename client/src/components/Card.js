import './Card.css';

function Card() {
  return (
    <div classname="Card">
      <section class="section">
        <div class="container">

          <h1 class="title">Enter the symbol of the stock</h1>
          <h2 class="subtitle">
            Click the <strong>button</strong>, to add the stock.
          </h2>
          <div className="addbutton">
            <button class="button is-link">Add Stock</button>
            <input class="input is-rounded ml-5" type="text" placeholder="Rounded input" />
          </div>
          <div class="block"></div>


          <div class="columns features">
            <div class="column is-4">
              <div class="card is-shady">
                <div class="card-image">
                  <figure class="image is-4by3">
                    <img src="https://source.unsplash.com/6Ticnhs1AG0" alt="Placeholder image" />
                  </figure>
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

        </div>
      </section>
    </div>
  );
}

export default Card;
