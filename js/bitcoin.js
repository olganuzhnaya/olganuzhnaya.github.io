console.log(
    "Crypto Atlas — Bitcoin page"
);

async function loadBitcoinData() {

    console.log(
        "Loading Bitcoin data..."
    );

    const url =
        "https://api.coingecko.com/api/v3/coins/bitcoin";

    try {

        const response =
            await fetch(url);

        if (!response.ok) {

            throw new Error(
                "HTTP error: " +
                response.status
            );
        }

        const data =
            await response.json();

        console.log(
            "Bitcoin data received:",
            data
        );

        const market =
            data.market_data;

        /*
         * PRICE
         */

        document.getElementById(
            "btc-price"
        ).textContent =
            "$ " +
            market.current_price.usd
                .toLocaleString();


        /*
         * 24H CHANGE
         */

        const change =
            market.price_change_percentage_24h;

        const changeElement =
            document.getElementById(
                "change"
            );

        if (changeElement) {

            const sign =
                change > 0
                    ? "+"
                    : "";

            changeElement.textContent =
                sign +
                change.toFixed(2) +
                " %";

            changeElement.classList.remove(
                "positive",
                "negative",
                "neutral"
            );

            if (change > 0) {

                changeElement.classList.add(
                    "positive"
                );

            } else if (change < 0) {

                changeElement.classList.add(
                    "negative"
                );

            } else {

                changeElement.classList.add(
                    "neutral"
                );
            }
        }


        /*
         * MARKET CAP
         */

        document.getElementById(
            "btc-market-cap"
        ).textContent =
            "$ " +
            market.market_cap.usd
                .toLocaleString();


        /*
         * 24H VOLUME
         */

        document.getElementById(
            "btc-volume"
        ).textContent =
            "$ " +
            market.total_volume.usd
                .toLocaleString();


        /*
         * CIRCULATING SUPPLY
         */

        document.getElementById(
            "btc-circulating"
        ).textContent =
            market.circulating_supply
                .toLocaleString() +
            " BTC";


        /*
         * MAX SUPPLY
         */

        document.getElementById(
            "btc-max-supply"
        ).textContent =
            market.max_supply !== null &&
            market.max_supply !== undefined
                ?
                market.max_supply
                    .toLocaleString() +
                " BTC"
                :
                "Not available";


        /*
         * UPDATE TIME
         */

        document.getElementById(
            "btc-updated"
        ).textContent =
            new Date()
                .toLocaleString();


        console.log(
            "Bitcoin page updated successfully."
        );

    }

    catch (error) {

        console.error(
            "Bitcoin data error:",
            error
        );

        document.getElementById(
            "btc-price"
        ).textContent =
            "Data unavailable";

        document.getElementById(
            "change"
        ).textContent =
            "Data unavailable";

        document.getElementById(
            "btc-market-cap"
        ).textContent =
            "Data unavailable";

        document.getElementById(
            "btc-volume"
        ).textContent =
            "Data unavailable";

        document.getElementById(
            "btc-circulating"
        ).textContent =
            "Data unavailable";

        document.getElementById(
            "btc-max-supply"
        ).textContent =
            "Data unavailable";

    }
}

loadBitcoinData();
