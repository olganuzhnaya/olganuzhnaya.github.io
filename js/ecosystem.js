
document.addEventListener("DOMContentLoaded", () => {
    const mapContainer = document.querySelector(".ecosystem-map-container");
    const map = mapContainer?.querySelector("svg");

    if (!mapContainer || !map) {
        console.warn("Crypto Atlas Ecosystem map was not found.");
        return;
    }

    // Save the original map dimensions.
    const original = {
        x: 0,
        y: 0,
        width: 1000,
        height: 650
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

        map.setAttribute(
            "viewBox",
            `${x} ${y} ${width} ${height}`
        );
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

    // Allow dragging the map on free areas.
    let isDragging = false;
    let startX = 0;
    let startY = 0;
    let startViewBox = null;

    map.addEventListener("pointerdown", (event) => {
        // Preserve clicks on interactive map regions.
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
