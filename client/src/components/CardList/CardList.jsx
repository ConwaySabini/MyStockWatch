import Card from "./../Card/Card";

// Component to display a list of news cards
const CardList = ({ news }) => {

  return (
    <div className="CardList">
      {news.length ? (
        <div class="columns is-mobile">
          <div class="column is-4">
            <Card article={news[0]} />
            <Card article={news[3]} />
            <Card article={news[6]} />
            <Card article={news[9]} />
          </div>
          <div class="block"></div>
          <div class="column is-4">
            <Card article={news[1]} />
            <Card article={news[4]} />
            <Card article={news[7]} />
            <Card article={news[10]} />
          </div>
          <div class="column is-4">
            <Card article={news[2]} />
            <Card article={news[5]} />
            <Card article={news[8]} />
            <Card article={news[11]} />
          </div>
        </div>
      ) : (
        <article class="message is-link mt-6 ml-6">
          <div class="message-body ">
            <strong>No News</strong>
          </div>
        </article>
      )}
    </div>
  );


};

export default CardList;
