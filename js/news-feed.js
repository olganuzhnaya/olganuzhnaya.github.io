
(function () {
    "use strict";

    const DATA_URL = "data/bitcoin-core-releases.json";
    const RELEASES_URL =
        "https://github.com/bitcoin/bitcoin/releases";

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

    async function loadBitcoinReleases() {
        const container =
            document.getElementById("bitcoin-core-feed");

        if (!container) {
            return;
        }

        try {
            const response = await fetch(DATA_URL, {
                cache: "no-store"
            });

            if (!response.ok) {
                throw new Error("News data could not be loaded.");
            }

            const data = await response.json();

            if (!Array.isArray(data.items)) {
                throw new Error("The news data has an unexpected format.");
            }

            const releases = data.items
                .filter(function (item) {
                    return (
                        item &&
                        typeof item.title === "string" &&
                        typeof item.url === "string" &&
                        item.url.startsWith(
                            "https://github.com/bitcoin/bitcoin/releases/tag/"
                        ) &&
                        !item.prerelease
                    );
                })
                .sort(function (a, b) {
                    return (
                        new Date(b.published_at || 0) -
                        new Date(a.published_at || 0)
                    );
                });

            container.replaceChildren();

            if (releases.length === 0) {
                container.appendChild(
                    createElement(
                        "p",
                        "",
                        "No official releases are available to display."
                    )
                );
                return;
            }

            const grid = createElement("div", "news-grid");

            releases.forEach(function (release) {
                const card = createElement(
                    "article",
                    "news-category"
                );

                const title = createElement(
                    "h3",
                    "",
                    release.title.trim()
                );

                const version = createElement(
                    "p",
                    "",
                    "Version: " + (release.version || "Not specified")
                );

                const date = createElement(
                    "p",
                    "",
                    "Published: " + formatDate(release.published_at)
                );

                const description = (
                    release.description || ""
                ).replace(/\s+/g, " ").trim();

                const summary = createElement(
                    "p",
                    "",
                    description.length > 260
                        ? description.slice(0, 257) + "..."
                        : description
                );

                const link = createElement(
                    "a",
                    "news-home-link",
                    "Read official release →"
                );

                link.href = release.url;
                link.target = "_blank";
                link.rel = "noopener noreferrer";

                card.append(
                    title,
                    version,
                    date,
                    summary,
                    link
                );

                grid.appendChild(card);
            });

            container.appendChild(grid);

            const sourceLink = createElement(
                "a",
                "news-home-link",
                "View all Bitcoin Core releases →"
            );

            sourceLink.href = RELEASES_URL;
            sourceLink.target = "_blank";
            sourceLink.rel = "noopener noreferrer";

            container.appendChild(sourceLink);
        } catch (error) {
            console.error("Crypto Atlas News:", error);

            container.replaceChildren(
                createElement(
                    "p",
                    "",
                    "The release feed is temporarily unavailable. " +
                    "Please visit the official Bitcoin Core releases page."
                )
            );

            const link = createElement(
                "a",
                "news-home-link",
                "Open official Bitcoin Core releases →"
            );

            link.href = RELEASES_URL;
            link.target = "_blank";
            link.rel = "noopener noreferrer";

            container.appendChild(link);
        }
    }

    loadBitcoinReleases();
})();
