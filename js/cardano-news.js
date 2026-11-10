
(function () {
    "use strict";

    const DATA_URL = "data/cardano-news.json";

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

    function getSourceType(value) {
        const labels = {
            official: "Official source",
            independent: "Independent publication",
            technical: "Technical update",
            community: "Community source"
        };

        return labels[value] || "Source";
    }

    async function loadCardanoNews() {
        const container = document.getElementById(
            "cardano-news-feed"
        );

        if (!container) {
            return;
        }

        try {
            const response = await fetch(DATA_URL, {
                cache: "no-store"
            });

            if (!response.ok) {
                throw new Error(
                    "Cardano news data could not be loaded."
                );
            }

            const data = await response.json();

            const items = Array.isArray(data)
                ? data
                : data && Array.isArray(data.items)
                    ? data.items
                    : null;

            if (!items) {
                throw new Error(
                    "Unexpected Cardano news data format."
                );
            }

            const articles = items
                .filter(function (item) {
                    return (
                        item &&
                        typeof item.title === "string" &&
                        typeof item.url === "string" &&
                        item.url.startsWith("https://")
                    );
                })
                .sort(function (a, b) {
                    return (
                        new Date(b.date || 0) -
                        new Date(a.date || 0)
                    );
                });

            container.replaceChildren();

            if (articles.length === 0) {
                container.appendChild(
                    createElement(
                        "p",
                        "",
                        "No Cardano news articles are available."
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
                        "Published: " + formatDate(article.date)
                    )
                );

                if (article.source) {
                    card.appendChild(
                        createElement(
                            "p",
                            "",
                            "Source: " + article.source
                        )
                    );
                }

                if (article.sourceType) {
                    card.appendChild(
                        createElement(
                            "p",
                            "",
                            getSourceType(article.sourceType)
                        )
                    );
                }

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
                    "Read original source →"
                );

                link.href = article.url;
                link.target = "_blank";
                link.rel = "noopener noreferrer";

                card.appendChild(link);
                grid.appendChild(card);
            });

            container.appendChild(grid);

        } catch (error) {
            console.error("Crypto Atlas Cardano News:", error);

            container.replaceChildren(
                createElement(
                    "p",
                    "",
                    "The Cardano news feed is temporarily unavailable. " +
                    "Please check the original sources."
                )
            );
        }
    }

    loadCardanoNews();
})();
