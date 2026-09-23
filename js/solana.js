console.log(
    "Crypto Atlas — Solana page"
);


async function loadSolanaData() {

    console.log(
        "Loading Solana data..."
    );

    try {

        const data =
            await getCryptoData("solana");


        if (!data) {

            throw new Error(
                "No Solana data received."
            );

        }


        console.log(
            "Solana data received:",
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
            "updated"
        ).textContent =
            new Date()
                .toLocaleString();


        console.log(
            "Solana page updated successfully."
        );

    }


    catch (error) {

        console.error(
            "Solana data error:",
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


loadSolanaData();
