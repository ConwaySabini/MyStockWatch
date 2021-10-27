import Card from "./../Card/Card";

// Component to display a list of news cards
const CardList = ({ news, type }) => {

  return (
    <div className="CardList">
      {news.length ? (
        <div class="columns is-mobile">
          <div class="column is-4">
            <Card article={news[0]} type={type} />
            <Card article={news[3]} type={type} />
            <Card article={news[6]} type={type} />
            <Card article={news[9]} type={type} />
          </div>
          <div class="block"></div>
          <div class="column is-4">
            <Card article={news[1]} type={type} />
            <Card article={news[4]} type={type} />
            <Card article={news[7]} type={type} />
            <Card article={news[10]} type={type} />
          </div>
          <div class="column is-4">
            <Card article={news[2]} type={type} />
            <Card article={news[5]} type={type} />
            <Card article={news[8]} type={type} />
            <Card article={news[11]} type={type} />
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
