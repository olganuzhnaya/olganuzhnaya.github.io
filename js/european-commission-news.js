
document.addEventListener("DOMContentLoaded", async () => {
    const container = document.getElementById(
        "european-commission-news-list"
    );

    // Do nothing until the news section is added to the page.
    if (!container) return;

    container.textContent = "Loading European Commission news…";

    try {
        const response = await fetch(
            "data/european-commission-news.json"
        );

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        const items = await response.json();

        container.replaceChildren();

        if (!Array.isArray(items) || items.length === 0) {
            container.textContent =
                "No relevant European Commission news found.";
            return;
        }

        items.forEach((item) => {
            if (
                !item ||
                typeof item.title !== "string" ||
                typeof item.link !== "string"
            ) {
                return;
            }

            let url;

            try {
                url = new URL(item.link);
            } catch {
                return;
            }

            // Only display links to the official Commission website.
            if (url.protocol !== "https:" ||
                url.hostname !== "finance.ec.europa.eu") {
                return;
            }

            const article = document.createElement("article");
            const heading = document.createElement("h3");
            const link = document.createElement("a");

            link.href = url.href;
            link.textContent = item.title;
            link.target = "_blank";
            link.rel = "noopener noreferrer";

            heading.appendChild(link);
            article.appendChild(heading);

            if (item.pubDate) {
                const date = document.createElement("p");
                date.textContent = item.pubDate;
                article.appendChild(date);
            }

            if (item.description) {
                const description = document.createElement("p");
                description.textContent = item.description;
                article.appendChild(description);
            }

            container.appendChild(article);
        });

        if (!container.children.length) {
            container.textContent =
                "No relevant European Commission news found.";
        }
    } catch (error) {
        console.error(
            "European Commission news could not be loaded:",
            error
        );

        container.textContent =
            "European Commission news is temporarily unavailable.";
    }
});
