import './Menu.css';
import React, { useState, useContext, useEffect } from "react";
import { StockContext } from "../../context/StockContext";
import Favorite from '../Favorite/Favorite';
import RenderLists from './RenderLists';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleUp, faAngleDown, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
const axios = require('axios').default;

// Component to display all favorite stocks
function Menu({ user }) {
    // use context api
    const { favorites, clearFavorites, addList, removeList, lists, clearLists, setNewLists, setNewFavorites } = useContext(StockContext);
    // list name to add
    const [listName, setListName] = useState("");
    // list of lists to conditionally render in dropdown
    const [listsToRender, setListsToRender] = useState({});
    // state for first 3 lists to render
    const [renderGainers, setRenderGainers] = useState(false);
    const [renderLosers, setRenderLosers] = useState(false);
    const [renderFavorites, setRenderFavorites] = useState(false);
    // state to trigger render
    const [render, setRender] = useState(false);
    // modal for confirming events
    const [FavoritesModal, setFavoritesModal] = useState(false);
    // modal for confirming events
    const [ListsModal, setListModal] = useState(false);
    // state to hide the entire menu
    const [hideMenu, setHideMenu] = useState(false);
    // server url to create lists
    const CREATE_LISTS = process.env.REACT_APP_CREATE_LISTS;
    // server url to create lists
    const CREATE_FAVORITES = process.env.REACT_APP_CREATE_FAVORITES;
    // server url to update lists
    const UPDATE_LISTS = process.env.REACT_APP_UPDATE_LISTS;
    // server url to get lists
    const GET_LISTS = process.env.REACT_APP_GET_LISTS + user;
    // server url to get favorites
    const GET_FAVORITES = process.env.REACT_APP_GET_FAVORITES + user;
    // server url to update favorites
    const UPDATE_FAVORITES = process.env.REACT_APP_UPDATE_FAVORITES;

    useEffect(() => {
        let renderLists = listsToRender;
        for (const list of lists) {
            if (renderLists[list.name] !== false) {
                renderLists[list.name] = true;
            }
        }
        setListsToRender(renderLists);

        const checkForLists = async () => {
            try {
                // fetch the lists data 
                const response = await axios.get(GET_LISTS);
                // handle error
                if (response.data.lists === null || response.data.lists.length === 0) {
                    console.log("No lists have been created");
                    // create the new lists
                    const listResponse = await axios.put(CREATE_LISTS,
                        { userId: user, lists: lists });
                    // check for null lists
                    if (listResponse.data.lists === null) {
                        console.log("error creating new lists");
                    } else {
                        console.log("created new lists");
                    }
                } else {
                    // lists already exists so update the lists
                    const newLists = [];
                    // check if lists exist
                    if (response.data.lists.lists !== undefined) {
                        // loop through every list in the response
                        for (const list of response.data.lists.lists) {
                            newLists.push(list);
                        }
                    }
                    setNewLists(newLists);
                    // update the lists data 
                    await axios.put(UPDATE_LISTS, { userId: user, lists: newLists });
                }
                // handle error
            } catch (error) {
                console.error(error);
            }
        }
        checkForLists();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        const checkForFavorites = async () => {
            try {
                // fetch the favorite data 
                const response = await axios.get(GET_FAVORITES);
                // handle error
                if (response.data.favorites === null) {
                    // create the new favorites
                    const FavoriteResponse = await axios.put(CREATE_FAVORITES,
                        { userId: user, favorites: favorites });
                    // check for null favorites
                    if (FavoriteResponse.data.favorites === null) {
                        console.log("error creating new favorites");
                    } else {
                        console.log("created new favorites");
                    }
                } else {
                    // create the new favorites
                    const newFavorites = [];
                    // check for favorites from database
                    for (const favorite of response.data.favorites.favorites) {
                        newFavorites.push(favorite);
                    }
                    if (newFavorites !== undefined) {
                        setNewFavorites(newFavorites);
                    }
                    // update the favorite data 
                    await axios.put(UPDATE_FAVORITES, { userId: user, favorites: newFavorites });
                }
                // handle error
            } catch (error) {
                console.error(error);
            }
        }
        checkForFavorites();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    let index = 0;
    let gainers = [];
    let losers = [];

    if (favorites !== undefined) {
        // get favorite stocks
        for (let favorite of favorites) {
            gainers[index] = favorite;
            losers[index] = favorite;
            index++;
        }
    }

    // filter the stocks by price change
    gainers = gainers.filter(gainer => gainer.percentChange >= 0);
    losers = losers.filter(loser => loser.percentChange < 0);
    // Sort the favorite stocks by price change
    gainers.sort((a, b) => b.percentChange - a.percentChange);
    losers.sort((a, b) => a.percentChange - b.percentChange);

    // Change symbol state to match with the input 
    const handleChange = (e) => {
        e.preventDefault();
        setListName(e.target.value);
    }

    // Add the new list from the input
    const handleSubmit = (event) => {
        event.preventDefault();
        addList(listName, [], UPDATE_LISTS, user);
        setListName("");
    }

    // hide the list
    const hideList = (name) => {
        if (name === "gainers") {
            setRenderGainers(false);
        } else if (name === "losers") {
            setRenderLosers(false);
        } else if (name === "favorites") {
            setRenderFavorites(false);
        } else {
            let renderLists = listsToRender
            renderLists[name] = false;
            setListsToRender(renderLists);
            setRender(!render);
        }
    }

    // show the list
    const showList = (name) => {
        if (name === "gainers") {
            setRenderGainers(true);
        } else if (name === "losers") {
            setRenderLosers(true);
        } else if (name === "favorites") {
            setRenderFavorites(true);
        } else {
            let renderLists = listsToRender
            renderLists[name] = true;
            setListsToRender(renderLists);
            setRender(!render);
        }
    }

    // clear the list of stocks on the screen
    const clearFavoritesConfirmed = e => {
        e.preventDefault();
        clearFavorites(UPDATE_FAVORITES, user);
        setFavoritesModal(false);
    }

    // clear the list of stocks on the screen
    const clearListsConfirmed = e => {
        e.preventDefault();
        clearLists(UPDATE_LISTS, user);
        setListModal(false);
    }

    // function to confirm the deletion of all stocks
    const confirmFavoriteClear = () => {
        setFavoritesModal(true);
    }

    // function to set modal to false and close confirmation dialogue 
    const clearFavoriteModal = () => {
        setFavoritesModal(false);
    }

    // function to confirm the deletion of all stocks
    const confirmListsModal = () => {
        setListModal(true);
    }

    // function to set modal to false and close confirmation dialogue 
    const clearListsModal = () => {
        setListModal(false);
    }

    // function to hide the entire menu
    const hideMenuFunc = () => {
        setHideMenu(true);
    }

    // function to show the entire menu
    const showMenu = () => {
        setHideMenu(false);
    }

    if (hideMenu) {
        return (
            <div>
                <aside class="menu">
                    <a onClick={() => showMenu()} href="#toggleMenu">
                        <FontAwesomeIcon icon={faAngleUp} size="2x" />
                    </a>
                </aside>
            </div>
        );
    } else {
        if (!FavoritesModal && !ListsModal) {
            return (
                <div>
                    <aside class="menu">
                        <form onSubmit={handleSubmit} className="AddListsForm">
                            <a onClick={() => hideMenuFunc()} href="#toggleMenu">
                                <FontAwesomeIcon id="angle-down" icon={faAngleDown} size="2x" />
                            </a>
                            <a
                                href="#createList"
                                onKeyDown={() => handleSubmit()}
                                onClick={() => handleSubmit()}>
                                <FontAwesomeIcon id="circle-icon" icon={faPlusCircle} size="2x" />
                            </a>
                            <input
                                id="menu-input"
                                class="input is-primary"
                                type="text"
                                placeholder="Create new list"
                                onChange={handleChange}
                                value={listName}
                            />
                        </form>
                        <br />
                        {
                            renderGainers ? (
                                <p class="menu-label">
                                    <strong id="menu-label">Gainers</strong>
                                    <a onClick={() => hideList("gainers")} href="#gainers">
                                        <FontAwesomeIcon id="angle-down-menu" icon={faAngleDown} size="2x" />
                                    </a>
                                    <p id="gainers">
                                        {
                                            gainers.length ? (
                                                <div className="list">
                                                    <ul class="menu-list">
                                                        {gainers.map(favorite => {
                                                            return <Favorite favorite={favorite} key={favorite.id} user={user} />;
                                                        })}
                                                    </ul>
                                                </div>
                                            ) : (
                                                <div className="no-favorites">No Gainers</div>
                                            )
                                        }
                                    </p>
                                </p>
                            ) : (
                                <p class="menu-label">
                                    <strong id="menu-label">Gainers</strong>
                                    <a onClick={() => showList("gainers")} href="#gainers">
                                        <FontAwesomeIcon id="angle-down-menu" icon={faAngleUp} size="2x" />
                                    </a>
                                </p>
                            )
                        }
                        {
                            renderLosers ? (
                                <p class="menu-label">
                                    <strong id="menu-label">Losers</strong>
                                    <a onClick={() => hideList("losers")} href="#losers">
                                        <FontAwesomeIcon id="angle-down-menu" icon={faAngleDown} size="2x" />
                                    </a>
                                    <p id="losers">
                                        {
                                            losers.length ? (
                                                <div className="list">
                                                    <ul class="menu-list">
                                                        {losers.map(favorite => {
                                                            return <Favorite favorite={favorite} key={favorite.id} user={user} />;
                                                        })}
                                                    </ul>
                                                </div>
                                            ) : (
                                                <div className="no-favorites">No Losers</div>
                                            )
                                        }
                                    </p>
                                </p>
                            ) : (
                                <p class="menu-label">
                                    <strong id="menu-label">Losers</strong>
                                    <a onClick={() => showList("losers")} href="#losers">
                                        <FontAwesomeIcon id="angle-down-menu" icon={faAngleUp} size="2x" />
                                    </a>
                                </p>
                            )
                        }
                        {
                            renderFavorites ? (
                                <p class="menu-label">
                                    <strong id="menu-label">Favorites</strong>
                                    <a onClick={() => hideList("favorites")} href="#favorites">
                                        <FontAwesomeIcon id="angle-down-menu" icon={faAngleDown} size="2x" />
                                    </a>
                                    <p id="favorites">
                                        {
                                            favorites.length ? (
                                                <div className="list">
                                                    <ul class="menu-list">
                                                        {favorites.map(favorite => {
                                                            return <Favorite favorite={favorite} key={favorite.id} user={user} />;
                                                        })}
                                                    </ul>
                                                </div>
                                            ) : (
                                                <div className="no-favorites">No Favorites</div>
                                            )
                                        }
                                    </p>
                                </p>
                            ) : (
                                <p class="menu-label">
                                    <strong id="menu-label">Favorites</strong>
                                    <a onClick={() => showList("favorites")} href="#favorites">
                                        <FontAwesomeIcon id="angle-down-menu" icon={faAngleUp} size="2x" />
                                    </a>
                                </p>
                            )
                        }
                        <button
                            class="button is-danger pr-4 pl-4 mb-2 mt-4"
                            onClick={() => confirmFavoriteClear()}>
                            Clear Favorites
                        </button>
                        {
                            lists.length ? (
                                <div className="list">
                                    {lists.map(list => {
                                        if (listsToRender[list.name] === true) {
                                            return <RenderLists
                                                list={list}
                                                hideList={hideList}
                                                listsToRender={listsToRender}
                                                removeList={removeList}
                                                url={UPDATE_LISTS}
                                                userId={user}
                                            />;
                                        } else {
                                            return (
                                                <p class="menu-label mt-5">
                                                    <strong id="menu-label">{list.name}</strong>
                                                    <a onClick={() => showList(list.name)} href="#list">
                                                        <FontAwesomeIcon id="angle-down-menu" icon={faAngleUp} size="2x" />
                                                    </a>
                                                    <button
                                                        class="button is-danger is-small ml-6"
                                                        onClick={() => removeList(list.name, UPDATE_LISTS, user)}>
                                                        Delete
                                                    </button>
                                                </p>
                                            );
                                        }
                                    })}
                                    <button
                                        class="button is-danger mt-2 mb-4"
                                        onClick={() => confirmListsModal()}>
                                        Clear Lists
                                    </button>
                                </div>
                            ) : (
                                <div className="no-favorites">No Custom Lists</div>
                            )
                        }
                    </aside>
                </div>
            );
        } else if (FavoritesModal) {
            return (
                <div class="modal is-active">
                    <div class="modal-background"> </div>
                    <div class="modal-content">
                        <div class="section" id="modal-section">
                            <h3 id="modal-heading">Are you sure you want to clear all Favorites?</h3>
                            <button
                                class="button is-danger mt-4"
                                onClick={clearFavoritesConfirmed}>
                                Clear All Favorites
                            </button>
                            <button
                                class="button is-primary mt-4 ml-4"
                                onClick={clearFavoriteModal}>
                                Cancel
                            </button>
                        </div>
                    </div>
                    <button class="modal-close is-large" aria-label="close"></button>
                </div>
            );
        } else if (ListsModal) {
            return (
                <div class="modal is-active">
                    <div class="modal-background"> </div>
                    <div class="modal-content">
                        <div class="section" id="modal-section">
                            <h3 id="modal-heading">Are you sure you want to clear all lists?</h3>
                            <button
                                class="button is-danger mt-4"
                                onClick={clearListsConfirmed}>
                                Clear All Lists
                            </button>
                            <button
                                class="button is-primary mt-4 ml-4"
                                onClick={clearListsModal}>
                                Cancel
                            </button>
                        </div>
                    </div>
                    <button class="modal-close is-large" aria-label="close"></button>
                </div>
            );
        } else {
            return null
        }
    }
}

export default Menu;
