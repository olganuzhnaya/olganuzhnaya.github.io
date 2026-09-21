console.log(
    "Crypto Atlas — Bitcoin page"
);


async function loadBitcoinData() {

    const data =
        await getCryptoData("bitcoin");


    if (!data) {

        document.getElementById(
            "btc-price"
        ).textContent =
            "Data unavailable";

        return;
    }


    const market =
        data.market_data;


    document.getElementById(
        "btc-price"
    ).textContent =
        "$ " +
        market.current_price.usd
        .toLocaleString();


    const change =
        market
        .price_change_percentage_24h;


    const changeElement =
        document.getElementById(
            "btc-change"
        );


    changeElement.textContent =
        change.toFixed(2) +
        " %";


    document.getElementById(
        "btc-market-cap"
    ).textContent =
        "$ " +
        market.market_cap.usd
        .toLocaleString();


    document.getElementById(
        "btc-volume"
    ).textContent =
        "$ " +
        market.total_volume.usd
        .toLocaleString();


    document.getElementById(
        "btc-circulating"
    ).textContent =
        market.circulating_supply
        .toLocaleString() +
        " BTC";


    document.getElementById(
        "btc-max-supply"
    ).textContent =
        market.max_supply
        ?
        market.max_supply
        .toLocaleString() +
        " BTC"
        :
        "Not available";


    document.getElementById(
        "btc-updated"
    ).textContent =
        new Date()
        .toLocaleString();
}


loadBitcoinData();
