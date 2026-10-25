
(function () {
    "use strict";

    const DATA_URL = "data/ethereum-news.json";
    const SOURCE_URL = "https://blog.ethereum.org/en/feed.xml";

    function createElement(tag, className, text) {
        const element = document.createElement(tag);

        if (className) {
            element.className = className;
        }

        if (text !== undefined) {
            element.textContent = text;
        }

        return element;
    }

    function formatDate(value) {
        const date = new Date(value);

        if (Number.isNaN(date.getTime())) {
            return "Publication date unavailable";
        }

        return new Intl.DateTimeFormat("en", {
            year: "numeric",
            month: "short",
            day: "numeric",
            timeZone: "UTC"
        }).format(date);
    }

    async function loadEthereumNews() {
        const container = document.getElementById(
            "ethereum-foundation-feed"
        );

        if (!container) {
            return;
        }

        try {
            const response = await fetch(DATA_URL, {
                cache: "no-store"
            });

            if (!response.ok) {
                throw new Error("Ethereum news data could not be loaded.");
            }

            const data = await response.json();

            if (!Array.isArray(data)) {
                throw new Error("Unexpected Ethereum news data format.");
            }

            const articles = data
                .filter(function (item) {
                    return (
                        item &&
                        typeof item.title === "string" &&
                        typeof item.url === "string" &&
                        item.url.startsWith(
                            "https://blog.ethereum.org/"
                        )
                    );
                })
                .sort(function (a, b) {
                    return (
                        new Date(b.published_at || 0) -
                        new Date(a.published_at || 0)
                    );
                });

            container.replaceChildren();

            if (articles.length === 0) {
                container.appendChild(
                    createElement(
                        "p",
                        "",
                        "No Ethereum Foundation articles are available."
                    )
                );
                return;
            }

            const grid = createElement("div", "news-grid");

            articles.forEach(function (article) {
                const card = createElement(
                    "article",
                    "news-category"
                );

                if (
                    typeof article.image === "string" &&
                    article.image.startsWith("https://")
                ) {
                    const image = createElement("img", "news-image");

                    image.src = article.image;
                    image.alt = "";
                    image.loading = "lazy";

                    card.appendChild(image);
                }

                card.appendChild(
                    createElement("h3", "", article.title)
                );

                if (article.category) {
                    card.appendChild(
                        createElement(
                            "p",
                            "",
                            "Category: " + article.category
                        )
                    );
                }

                card.appendChild(
                    createElement(
                        "p",
                        "",
                        "Published: " + formatDate(article.published_at)
                    )
                );

                let summary = article.description || "";
                summary = summary.replace(/\s+/g, " ").trim();

                if (summary.length > 220) {
                    summary = summary.slice(0, 217).trimEnd() + "...";
                }

                if (summary) {
                    card.appendChild(
                        createElement("p", "", summary)
                    );
                }

                const link = createElement(
                    "a",
                    "news-home-link",
                    "Read official announcement →"
                );

                link.href = article.url;
                link.target = "_blank";
                link.rel = "noopener noreferrer";

                card.appendChild(link);
                grid.appendChild(card);
            });

            container.appendChild(grid);

            const sourceLink = createElement(
                "a",
                "news-home-link",
                "Visit Ethereum Foundation Blog →"
            );

            sourceLink.href = "https://blog.ethereum.org/";
            sourceLink.target = "_blank";
            sourceLink.rel = "noopener noreferrer";

            container.appendChild(sourceLink);

        } catch (error) {
            console.error("Crypto Atlas Ethereum News:", error);

            container.replaceChildren(
                createElement(
                    "p",
                    "",
                    "The Ethereum news feed is temporarily unavailable. " +
                    "Please visit the official Ethereum Foundation Blog."
                )
            );

            const link = createElement(
                "a",
                "news-home-link",
                "Open Ethereum Foundation Blog →"
            );

            link.href = "https://blog.ethereum.org/";
            link.target = "_blank";
            link.rel = "noopener noreferrer";

            container.appendChild(link);
        }
    }

    loadEthereumNews();
})();
