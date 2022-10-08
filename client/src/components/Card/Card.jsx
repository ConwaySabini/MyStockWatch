import './Card.css';

// Component for individual news card
function Card({ article, type }) {
    let name = "";
    let count = 0;
    let thumbnail = "https://bulma.io/images/placeholders/1280x960.png";
    //let image = "https://bulma.io/images/placeholders/1280x960.png";
    let organization = "";
    let description = "";
    let date = "";
    let link = "";

    if (type === "trending") {
        for (const letter of article.name) {
            if (count < 60) {
                name += letter;
            } else {
                name += "...";
                break;
            }
            count++;
        }
        if (article.name.length < 49) {
            name += "\r\n ";
        }
        if (article.description !== undefined) {
            count = 0;
            for (const letter of article.description) {
                if (count < 120) {
                    description += letter;
                } else {
                    description += "...";
                    break;
                }
                count++;
            }
        }
        if (article.provider[0].image.thumbnail.contentUrl !== undefined) {
            thumbnail = article.provider[0].image.thumbnail.contentUrl;
        }
        if (article.provider[0].name !== undefined) {
            organization = article.provider[0].name;
        }
        if (article.datePublished !== undefined) {
            for (let index = 0; index < 10; index++) {
                date += article.datePublished[index];
            }
        }
        // if (article.image !== undefined) {
        //   image = article.image.thumbnail.contentUrl;
        // }
        if (article.url !== undefined) {
            link = article.url;
        }
    } else {
        for (const letter of article.attributes.title) {
            if (count < 60) {
                name += letter;
            } else {
                name += "...";
                break;
            }
            count++;
        }
        if (name.length < 49) {
            name += "\r\n ";
        }
        // if (article.attributes.gettyImage !== undefined && article.attributes.gettyImage !== null) {
        //   image = article.attributes.gettyImage.crop_4_3;
        // }
        if (article.attributes.publishOn !== undefined) {
            for (let index = 0; index < 10; index++) {
                date += article.attributes.publishOn[index];
            }
        }
        if (article.links.self !== undefined) {
            link = article.links.self;
        }

        if (article.attributes.gettyImageUrl !== undefined && article.attributes.gettyImage !== null) {
            thumbnail = article.attributes.gettyImageUrl;
        }
    }

    const handleRedirect = () => {
        window.open(link, "_blank");
    }

    const handleNewsRedirect = () => {
        const newLink = 'http://www.google.com/search?q=' + link;
        window.open(newLink, "_blank");
    }

    if (type === "trending") {
        return (
            <div class="card" id="news-card">
                <div class="card-content" id="news-content">
                    <div class="media">
                        <div class="media-left">
                            <figure class="image is-48x48">
                                <img src={thumbnail} alt="profile" />
                            </figure>
                        </div>
                        <div class="media-content">
                            <p class="title is-4" id="card-title">{name}</p>
                        </div>
                    </div>
                    <div class="content">
                        {organization}<br /><br />
                        {description}
                    </div>
                    <time datetime={date}>Date: {date}</time>
                    <div class="block"></div>
                    {/* <button class="button is-link">Expand</button> */}
                    <button class="button is-link" onClick={handleRedirect}>
                        Read Article
                    </button>

                    <div class="modal">
                        <div class="modal-background"></div>
                        <div class="modal-card">
                            <header class="modal-card-head">
                                <p class="modal-card-title">Modal title</p>
                                <button class="delete" aria-label="close"></button>
                            </header>
                            <section class="modal-card-body">
                                {/* <!-- Content ... --> */}
                            </section>
                            <footer class="modal-card-foot">
                                <button class="button is-success">Save changes</button>
                                <button class="button">Cancel</button>
                            </footer>
                        </div>
                    </div>
                </div>
            </div >
        );
    } else {
        return (
            <div class="card mt-6" id="news-card">
                <div class="card-content" id="news-content">
                    <div class="media">
                        <div class="media-left">
                            <figure class="image image is-48x48">
                                <img src={thumbnail} alt="profile" />
                            </figure>
                        </div>
                        <div class="media-content">
                            <p class="title is-4" id="card-title">{name}</p>
                        </div>
                    </div>
                    <time datetime={date}>Date: {date}</time>
                    <div class="block"></div>
                    {/* <button class="button is-link">Expand</button> */}
                    <button class="button is-link" onClick={handleNewsRedirect}>
                        Read Article
                    </button>

                    <div class="modal">
                        <div class="modal-background"></div>
                        <div class="modal-card">
                            <header class="modal-card-head">
                                <p class="modal-card-title">Modal title</p>
                                <button class="delete" aria-label="close"></button>
                            </header>
                            <section class="modal-card-body">
                                {/* <!-- Content ... --> */}
                            </section>
                            <footer class="modal-card-foot">
                                <button class="button is-success">Save changes</button>
                                <button class="button">Cancel</button>
                            </footer>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Card;
