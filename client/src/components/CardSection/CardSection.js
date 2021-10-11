import './CardSection.css';
import Card from './../Card/Card';

function CardSection() {
  return (
    <div classname="CardSection">
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
            <Card />
          </div>

        </div>
      </section>
    </div>
  );
}

export default CardSection;
