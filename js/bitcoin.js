console.log("Crypto Atlas — Bitcoin data loading");


async function loadBitcoinData() {


    const url =
        "https://api.coingecko.com/api/v3/coins/bitcoin";


    try {


        const response = await fetch(url);


        if (!response.ok) {

            throw new Error(
                `HTTP error: ${response.status}`
            );

        }


        const data = await response.json();


        console.log(
            "Bitcoin data:",
            data
        );


        document.getElementById(
            "btc-price"
        ).textContent =
            "$ " +
            data.market_data.current_price.usd.toLocaleString();


        document.getElementById(
            "btc-change"
        ).textContent =
            data.market_data
            .price_change_percentage_24h
            .toFixed(2)
            + " %";


        document.getElementById(
            "btc-market-cap"
        ).textContent =
            "$ " +
            data.market_data
            .market_cap.usd
            .toLocaleString();


        document.getElementById(
            "btc-volume"
        ).textContent =
            "$ " +
            data.market_data
            .total_volume.usd
            .toLocaleString();


        document.getElementById(
            "btc-circulating"
        ).textContent =
            data.market_data
            .circulating_supply
            .toLocaleString()
            +
            " BTC";


        document.getElementById(
            "btc-max-supply"
        ).textContent =
            data.market_data
            .max_supply
            ?
            data.market_data
            .max_supply
            .toLocaleString()
            +
            " BTC"
            :
            "Not available";


        document.getElementById(
            "btc-updated"
        ).textContent =
            new Date()
            .toLocaleString();


    }


    catch(error) {


        console.error(
            "Bitcoin data error:",
            error
        );


        document.getElementById(
            "btc-price"
        ).textContent =
            "Data unavailable";


    }


}


loadBitcoinData();
