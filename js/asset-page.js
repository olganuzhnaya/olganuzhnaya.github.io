console.log(
    "Crypto Atlas — Universal Asset Page"
);


async function loadAssetData() {

    const coinId =
        document.body.dataset.coinId;


    if (!coinId) {

        console.error(
            "Crypto Atlas: coin ID is missing."
        );

        return;
    }


    console.log(
        "Loading asset:",
        coinId
    );


    const data =
        await getCryptoData(coinId);


    if (!data) {

        setText(
            "price",
            "Data unavailable"
        );

        setText(
            "change",
            "Data unavailable"
        );

        setText(
            "market-cap",
            "Data unavailable"
        );

        setText(
            "volume",
            "Data unavailable"
        );

        setText(
            "circulating",
            "Data unavailable"
        );

        setText(
            "max-supply",
            "Data unavailable"
        );

        setText(
            "updated",
            "Data unavailable"
        );

        return;
    }


    const market =
        data.market_data;


    /*
     * PRICE
     */

    setText(
        "price",
        formatPrice(
            market.current_price.usd
        )
    );


    /*
     * 24H CHANGE
     */

    const change =
    market.price_change_percentage_24h;


setText(
    "change",
    formatPercent(change)
);


setChangeColor(
    "change",
    change
);


    /*
     * MARKET CAP
     */

    setText(
        "market-cap",
        formatLargeNumber(
            market.market_cap.usd
        )
    );


    /*
     * 24H VOLUME
     */

    setText(
        "volume",
        formatLargeNumber(
            market.total_volume.usd
        )
    );


    /*
     * CIRCULATING SUPPLY
     */

    setText(
        "circulating",
        formatSupply(
            market.circulating_supply
        )
    );


    /*
     * MAX SUPPLY
     */

    if (
        market.max_supply !== null &&
        market.max_supply !== undefined
    ) {

        setText(
            "max-supply",
            formatSupply(
                market.max_supply
            )
        );

    } else {

        setText(
            "max-supply",
            "Not available"
        );

    }


    /*
     * UPDATE TIME
     */

    setText(
        "updated",
        new Date()
            .toLocaleString()
    );

}



/*
 * PRICE FORMAT
 */

function formatPrice(
    value
) {

    if (
        value === null ||
        value === undefined
    ) {

        return "Data unavailable";
    }


    return (
        "$ " +
        Number(value)
            .toLocaleString(
                undefined,
                {
                    minimumFractionDigits:
                        value < 1
                            ? 2
                            : 0,
                    maximumFractionDigits:
                        value < 1
                            ? 8
                            : 2
                }
            )
    );

}



/*
 * PERCENT FORMAT
 */

function formatPercent(
    value
) {

    if (
        value === null ||
        value === undefined
    ) {

        return "Data unavailable";
    }


    const number =
        Number(value);


    const sign =
        number > 0
            ? "+"
            : "";


    return (
        sign +
        number.toFixed(2) +
        " %"
    );

}



/*
 * LARGE NUMBER FORMAT
 */

function formatLargeNumber(
    value
) {

    if (
        value === null ||
        value === undefined
    ) {

        return "Data unavailable";
    }


    return (
        "$ " +
        Number(value)
            .toLocaleString(
                undefined,
                {
                    maximumFractionDigits:
                        0
                }
            )
    );

}



/*
 * SUPPLY FORMAT
 */

function formatSupply(
    value
) {

    if (
        value === null ||
        value === undefined
    ) {

        return "Data unavailable";
    }


    return Number(value)
        .toLocaleString(
            undefined,
            {
                maximumFractionDigits:
                    0
            }
        );

}



/*
 * Helper function
 */
/*
 * CHANGE COLOR
 */

function setChangeColor(
    elementId,
    value
) {

    const element =
        document.getElementById(
            elementId
        );


    if (!element) {

        return;
    }


    element.classList.remove(
        "positive",
        "negative",
        "neutral"
    );


    if (value > 0) {

        element.classList.add(
            "positive"
        );

    } else if (value < 0) {

        element.classList.add(
            "negative"
        );

    } else {

        element.classList.add(
            "neutral"
        );
    }

}
function setText(
    elementId,
    value
) {

    const element =
        document.getElementById(
            elementId
        );


    if (!element) {

        return;
    }


    element.textContent =
        value;
}



/*
 * Start
 */

loadAssetData();
