console.log(
    "Crypto Atlas — Ethereum page"
);


async function loadEthereumData() {

    const data =
        await getCryptoData("ethereum");


    if (!data) {

        document.getElementById(
            "price"
        ).textContent =
            "Data unavailable";

        return;
    }


    const market =
        data.market_data;


    document.getElementById(
        "price"
    ).textContent =
        "$ " +
        market.current_price.usd
        .toLocaleString();


    document.getElementById(
        "change"
    ).textContent =
        market
        .price_change_percentage_24h
        .toFixed(2) +
        " %";


    document.getElementById(
        "market-cap"
    ).textContent =
        "$ " +
        market.market_cap.usd
        .toLocaleString();
}


loadEthereumData();
