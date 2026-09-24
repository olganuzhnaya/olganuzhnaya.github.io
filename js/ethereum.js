console.log(
    "Crypto Atlas — Ethereum page"
);


async function loadEthereumData() {

    console.log(
        "Loading Ethereum data..."
    );


    try {

        const data =
            await getCryptoData("ethereum");


        if (!data) {

            throw new Error(
                "No Ethereum data received."
            );

        }


        console.log(
            "Ethereum data received:",
            data
        );


        const market =
            data.market_data;


        document.getElementById(
            "price"
        ).textContent =
            "$ " +
            market.current_price.usd
                .toLocaleString();


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

            }

            else if (change < 0) {

                changeElement.classList.add(
                    "negative"
                );

            }

            else {

                changeElement.classList.add(
                    "neutral"
                );

            }

        }


        document.getElementById(
    "market-cap"
).textContent =
    "$ " +
    market.market_cap.usd
        .toLocaleString();


document.getElementById(
    "volume"
).textContent =
    "$ " +
    market.total_volume.usd
        .toLocaleString();


document.getElementById(
    "circulating"
).textContent =
    market.circulating_supply
        .toLocaleString() +
    " ETH";


document.getElementById(
    "max-supply"
).textContent =
    market.max_supply !== null &&
    market.max_supply !== undefined
        ?
        market.max_supply
            .toLocaleString() +
        " ETH"
        :
        "Not available";


document.getElementById(
    "updated"
).textContent =
    new Date()
        .toLocaleString();

        console.log(
            "Ethereum page updated successfully."
        );

    }


    catch (error) {

        console.error(
            "Ethereum data error:",
            error
        );


        document.getElementById(
            "price"
        ).textContent =
            "Data unavailable";


        document.getElementById(
            "change"
        ).textContent =
            "Data unavailable";


        document.getElementById(
            "market-cap"
        ).textContent =
            "Data unavailable";


        document.getElementById(
            "updated"
        ).textContent =
            "Data unavailable";

    }

}


loadEthereumData();
let ethereumChart = null;

async function loadEthereumChart(days = 30) {

    console.log(
        "Loading Ethereum price history..."
    );

    try {

        const history =
            await getCryptoHistory(
                "ethereum",
                days
            );

        if (!history) {

            throw new Error(
                "No Ethereum history received."
            );

        }

        console.log(
            "Ethereum history received:",
            history
        );

    }

    catch (error) {

        console.error(
            "Ethereum chart error:",
            error
        );

    }

}
