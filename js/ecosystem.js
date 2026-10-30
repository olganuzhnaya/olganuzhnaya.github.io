
document.addEventListener("DOMContentLoaded", () => {
    const mapContainer = document.querySelector(".ecosystem-map-container");
    const map = mapContainer?.querySelector("svg");

    if (!mapContainer || !map) {
        console.warn("Crypto Atlas Ecosystem map was not found.");
        return;
    }

    // Save the original map dimensions.
    const originalViewBox = map.viewBox.baseVal;
    const original = {
        x: originalViewBox.x,
        y: originalViewBox.y,
        width: originalViewBox.width,
        height: originalViewBox.height
    };

    const minWidth = 500;
    const maxWidth = original.width;
    const zoomFactor = 1.2;

    // Create map controls.
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

    // Apply a new viewBox while keeping the map centered.
    function setZoom(newWidth) {
        const width = Math.max(minWidth, Math.min(maxWidth, newWidth));
        const scale = width / original.width;
        const height = original.height * scale;

        const x = original.x + (original.width - width) / 2;
        const y = original.y + (original.height - height) / 2;

        map.setAttribute(
            "viewBox",
            `${x} ${y} ${width} ${height}`
        );
    }

    // Handle zoom button clicks.
    controls.addEventListener("click", (event) => {
        const button = event.target.closest("button");

        if (!button) return;

        const current = map.viewBox.baseVal;

        switch (button.dataset.mapAction) {
            case "zoom-in":
                setZoom(current.width / zoomFactor);
                break;

            case "zoom-out":
                setZoom(current.width * zoomFactor);
                break;

            case "reset":
                map.setAttribute(
                    "viewBox",
                    `${original.x} ${original.y} ${original.width} ${original.height}`
                );
                break;
        }
    });
});
