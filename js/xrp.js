console.log(
    "Crypto Atlas — XRP page"
);


async function loadXRPData() {

    console.log(
        "Loading XRP data..."
    );


    try {

        const data =
            await getCryptoData("ripple");


        if (!data) {

            throw new Error(
                "No XRP data received."
            );

        }


        console.log(
            "XRP data received:",
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
    " XRP";


document.getElementById(
    "max-supply"
).textContent =
    market.max_supply !== null &&
    market.max_supply !== undefined
        ?
        market.max_supply
            .toLocaleString() +
        " XRP"
        :
        "Not available";


document.getElementById(
    "updated"
).textContent =
    new Date()
        .toLocaleString();


        console.log(
            "XRP page updated successfully."
        );

    }


    catch (error) {

        console.error(
            "XRP data error:",
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


loadXRPData();
