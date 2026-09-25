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
    " SOL";


document.getElementById(
    "max-supply"
).textContent =
    market.max_supply !== null &&
    market.max_supply !== undefined
        ?
        market.max_supply
            .toLocaleString() +
        " SOL"
        :
        "Not available";


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
let solanaChart = null;

async function loadSolanaChart(days = 30) {

    console.log(
        "Loading Solana price history..."
    );

    try {

        const history =
            await getCryptoHistory(
                "solana",
                days
            );

        if (!history) {

            throw new Error(
                "No Solana history received."
            );

        }

        console.log(
            "Solana history received:",
            history
        );

        const prices =
            history.prices;

        if (
            !prices ||
            prices.length === 0
        ) {

            throw new Error(
                "Solana history is empty."
            );

        }

        const labels =
            prices.map(
                item =>
                    new Date(
                        item[0]
                    ).toLocaleDateString(
                        "en-GB",
                        {
                            day: "2-digit",
                            month: "short",
                            year: "numeric"
                        }
                    )
            );

        const values =
            prices.map(
                item =>
                    item[1]
            );

        const canvas =
            document.getElementById(
                "solana-chart"
            );

        if (!canvas) {

            throw new Error(
                "Solana chart canvas not found."
            );

        }

        if (solanaChart) {

            solanaChart.destroy();

        }

        solanaChart = new Chart(
            canvas,
            {
                type: "line",

                data: {

                    labels: labels,

                    datasets: [

                        {

                            label:
                                "Solana Price (USD)",

                            data: values,

                            tension: 0.2,

                            pointRadius: 0

                        }

                    ]

                },

                options: {

                    responsive: true,

                    maintainAspectRatio: false,

                    interaction: {

                        mode: "index",

                        intersect: false

                    },

                    plugins: {

                        tooltip: {

                            callbacks: {

                                label: function(context) {

                                    return "$ " +
                                        context.parsed.y.toLocaleString(
                                            "en-US",
                                            {
                                                minimumFractionDigits: 2,
                                                maximumFractionDigits: 2
                                            }
                                        );

                                }

                            }

                        },

                        legend: {

                            display: true

                        }

                    },

                    scales: {

                        x: {

                            ticks: {

                                maxTicksLimit: 8

                            }

                        },

                        y: {

                            beginAtZero: false,

                            ticks: {

                                callback: function(value) {

                                    return "$ " +
                                        value.toLocaleString(
                                            "en-US"
                                        );

                                }

                            }

                        }

                    }

                }

            }
        );

    }

    catch (error) {

        console.error(
            "Solana chart error:",
            error
        );

    }

}
loadSolanaChart();
