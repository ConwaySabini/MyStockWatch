import './Favorite.css'

function Favorite({ favorite }) {

  if (favorite.percentChange > 0) {
    return (
      <div> className="FavoriteStock"
        <li className="green"><a>{favorite.symbol}: {favorite.percentChange}%</a></li>
      </div>
    );
  } else {
    return (
      <div> className="FavoriteStock"
        <li className="red"><a>{favorite.symbol}: {favorite.percentChange}%</a></li>
      </div>
    );
  }

}

export default Favorite;
