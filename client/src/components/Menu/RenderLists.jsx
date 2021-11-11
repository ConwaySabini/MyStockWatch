import ListStock from "./ListStock";

function RenderLists({ list, hideList, removeList, url, userId }) {

  return (
    <>
      <p class="menu-label mt-5" >
        <strong id="menu-label">{list.name}</strong>
        <a onClick={() => hideList(list.name)}>
          <i class="fas fa-angle-down fa-2x ml-4" aria-hidden="true"></i>
        </a>
        <button class="button is-danger is-small ml-6" onClick={() => removeList(list.name, url, userId)}>Delete</button>
        <p id="favorites">
          {
            list.stocks.length ? (
              <div className="list">
                <ul class="menu-list">
                  {list.stocks.map(stock => {
                    return <ListStock favorite={stock} name={list.name} key={stock.id} url={url} userId={userId} />;
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
