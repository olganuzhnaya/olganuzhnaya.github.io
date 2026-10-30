
document.addEventListener("DOMContentLoaded", () => {
    const mapContainer = document.querySelector(".ecosystem-map-container");
    const map = mapContainer?.querySelector("svg");

    if (!mapContainer || !map) {
        console.warn("Crypto Atlas Ecosystem map was not found.");
        return;
    }

    // Original map dimensions.
    const original = {
        x: 0,
        y: 0,
        width: 1000,
        height: 650
    };

    const minWidth = 500;
    const maxWidth = original.width;
    const zoomFactor = 1.2;

    // Create zoom controls.
    const controls = document.createElement("div");
    controls.className = "ecosystem-map-controls";
    controls.setAttribute("aria-label", "Map zoom controls");

    controls.innerHTML = `
        <button type="button" data-map-action="zoom-in"
            aria-label="Zoom in" title="Zoom in">+</button>

        <button type="button" data-map-action="zoom-out"
            aria-label="Zoom out" title="Zoom out">−</button>

        <button type="button" data-map-action="reset"
            aria-label="Reset map zoom" title="Reset map">↺</button>
    `;

    mapContainer.insertBefore(controls, map);

    // Read the current visible map area.
    function getViewBox() {
        const values = map.getAttribute("viewBox").split(/\s+/).map(Number);

        return {
            x: values[0],
            y: values[1],
            width: values[2],
            height: values[3]
        };
    }

    // Keep the map inside its original boundaries.
    function setViewBox(x, y, width, height) {
        width = Math.max(minWidth, Math.min(maxWidth, width));
        height = original.height * (width / original.width);

        x = Math.max(original.x, Math.min(
            original.x + original.width - width,
            x
        ));

        y = Math.max(original.y, Math.min(
            original.y + original.height - height,
            y
        ));

        map.setAttribute("viewBox", `${x} ${y} ${width} ${height}`);
    }

    // Zoom around the center of the map.
    function setZoom(newWidth) {
        const current = getViewBox();
        const width = Math.max(minWidth, Math.min(maxWidth, newWidth));
        const height = original.height * (width / original.width);

        const x = current.x + (current.width - width) / 2;
        const y = current.y + (current.height - height) / 2;

        setViewBox(x, y, width, height);
    }

    // Handle zoom button clicks.
    controls.addEventListener("click", (event) => {
        const button = event.target.closest("button");

        if (!button) return;

        const current = getViewBox();

        switch (button.dataset.mapAction) {
            case "zoom-in":
                setZoom(current.width / zoomFactor);
                break;

            case "zoom-out":
                setZoom(current.width * zoomFactor);
                break;

            case "reset":
                setViewBox(
                    original.x,
                    original.y,
                    original.width,
                    original.height
                );
                break;
        }
    });

    // Map region descriptions.
    const regionDescriptions = {
        "#bitcoin-world":
            "Explore Bitcoin, its network, transactions, mining and development.",

        "#blockchain-continents":
            "Discover blockchain networks, their technologies, consensus models and ecosystems.",

        "#exchange-continent":
            "Explore cryptocurrency exchanges, trading services and digital asset markets.",

        "#defi-ocean":
            "Discover decentralised finance, lending, borrowing, staking and liquidity protocols.",

        "#web3-gaming-islands":
            "Explore Web3 games, digital ownership, virtual worlds and blockchain-based rewards.",

        "#digital-infrastructure":
            "Discover the infrastructure supporting the digital economy, including data, security and development tools.",

        "#digital-economy":
            "Explore stablecoins, tokenised real-world assets, digital payments and financial applications."
    };

    // Create the information tooltip.
    const tooltip = document.createElement("div");
    tooltip.className = "ecosystem-map-tooltip";
    tooltip.setAttribute("role", "status");
    tooltip.setAttribute("aria-live", "polite");
    tooltip.hidden = true;

    mapContainer.insertBefore(tooltip, map);

    function showTooltip(link) {
        const description = regionDescriptions[link.getAttribute("href")];

        if (!description) return;

        tooltip.textContent = description;
        tooltip.hidden = false;
    }

    function hideTooltip() {
        tooltip.hidden = true;
        tooltip.textContent = "";
    }

    // Mouse interaction with map regions.
    map.addEventListener("pointerover", (event) => {
        const link = event.target.closest("a[href^='#']");

        if (link && map.contains(link)) {
            showTooltip(link);
        }
    });

    map.addEventListener("pointerout", (event) => {
        const link = event.target.closest("a[href^='#']");

        if (link && !link.contains(event.relatedTarget)) {
            hideTooltip();
        }
    });

    // Keyboard accessibility.
    map.addEventListener("focusin", (event) => {
        const link = event.target.closest("a[href^='#']");

        if (link) {
            showTooltip(link);
        }
    });

    map.addEventListener("focusout", (event) => {
        const nextLink = event.relatedTarget?.closest?.("a[href^='#']");

        if (!nextLink || !map.contains(nextLink)) {
            hideTooltip();
        }
    });

    // Drag the map on free areas.
    let isDragging = false;
    let startX = 0;
    let startY = 0;
    let startViewBox = null;

    map.addEventListener("pointerdown", (event) => {
        // Do not interfere with clickable map regions.
        if (event.target.closest("a")) return;
        if (event.button !== 0) return;

        isDragging = true;
        startX = event.clientX;
        startY = event.clientY;
        startViewBox = getViewBox();

        map.style.cursor = "grabbing";
        map.setPointerCapture(event.pointerId);
    });

    map.addEventListener("pointermove", (event) => {
        if (!isDragging || !startViewBox) return;

        const rect = map.getBoundingClientRect();

        if (!rect.width || !rect.height) return;

        const scaleX = startViewBox.width / rect.width;
        const scaleY = startViewBox.height / rect.height;

        const deltaX = (event.clientX - startX) * scaleX;
        const deltaY = (event.clientY - startY) * scaleY;

        setViewBox(
            startViewBox.x - deltaX,
            startViewBox.y - deltaY,
            startViewBox.width,
            startViewBox.height
        );
    });

    function stopDragging() {
        if (!isDragging) return;

        isDragging = false;
        startViewBox = null;
        map.style.cursor = "";
    }

    map.addEventListener("pointerup", stopDragging);
    map.addEventListener("pointercancel", stopDragging);
    map.addEventListener("lostpointercapture", stopDragging);
});
