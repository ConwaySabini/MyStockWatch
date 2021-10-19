import React, { useContext } from "react";
import { StockContext } from "../../context/StockContext";
import Favorite from './../Favorite/Favorite';

function Menu() {
  const { favorites } = useContext(StockContext);

  return (
    <div>
      {/* <aside class="menu">
        <p class="menu-label">
          Gainers
        </p>
        <ul class="menu-list">
          <li><a>Dashboard</a></li>
          <li><a>Customers</a></li>
        </ul>
        <p class="menu-label">
          Losers
        </p>
        <ul class="menu-list">
          <li><a>Team Settings</a></li>
          <li>
            <a class="is-active">Manage Your Team</a>
            <ul>
              <li><a>Members</a></li>
              <li><a>Plugins</a></li>
              <li><a>Add a member</a></li>
            </ul>
          </li>
          <li><a>Invitations</a></li>
          <li><a>Cloud Storage Environment Settings</a></li>
          <li><a>Authentication</a></li>
        </ul>
        <p class="menu-label">
          Favorites
        </p>
        {favorites.length ? (
          <div className="list">
            {favorites.map(favorite => {
              return <Favorite favortie={favorite} key={favorite.id} />;
            })}
          </div>
        ) : (
          <div className="no-favorites">No Favorites</div>
        )}
        <ul class="menu-list">
          <li><a>Payments</a></li>
          <li><a>Transfers</a></li>
          <li><a>Balance</a></li>
        </ul>
      </aside> */}
    </div>
  );
}




export default Menu;
