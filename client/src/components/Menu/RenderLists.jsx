import Favorite from "../Favorite/Favorite";

function RenderLists({ list, hideList }) {

  return (
    <>
      <p class="menu-label" >
        <strong id="menu-label">{list.name}</strong>
        <a onClick={() => hideList(list.name)}>
          <i class="fas fa-angle-down fa-2x ml-4" aria-hidden="true"></i>
        </a>
        <p id="favorites">
          {
            list.stocks.length ? (
              <div className="list">
                <ul class="menu-list">
                  {list.stocks.map(stock => {
                    return <Favorite favorite={stock} key={stock.id} />;
                  })}
                </ul>
              </div>
            ) : (
              <div className="no-favorites">No Stocks</div>
            )
          }
        </p>
      </p>
    </>
  );
}

export default RenderLists;
