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
        "$ " +
        market.current_price.usd
            .toLocaleString()
    );


    /*
     * 24H CHANGE
     */

    setText(
        "change",
        market
            .price_change_percentage_24h
            .toFixed(2) +
        " %"
    );


    /*
     * MARKET CAP
     */

    setText(
        "market-cap",
        "$ " +
        market.market_cap.usd
            .toLocaleString()
    );


    /*
     * 24H VOLUME
     */

    setText(
        "volume",
        "$ " +
        market.total_volume.usd
            .toLocaleString()
    );


    /*
     * CIRCULATING SUPPLY
     */

    setText(
        "circulating",
        market.circulating_supply
            .toLocaleString()
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
            market.max_supply
                .toLocaleString()
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
 * Helper function
 */

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
