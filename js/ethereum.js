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
const periodButtons =
    document.querySelectorAll(
        ".chart-periods button"
    );

periodButtons.forEach(
    button => {
        button.classList.remove(
            "active"
        );
    }
);

periodButtons.forEach(
    button => {

        const onclick =
            button.getAttribute(
                "onclick"
            );

        if (
            (days === 7 &&
                onclick.includes("(7)")) ||

            (days === 30 &&
                onclick.includes("(30)")) ||

            (days === 90 &&
                onclick.includes("(90)")) ||

            (days === 365 &&
                onclick.includes("(365)"))
        ) {

            button.classList.add(
                "active"
            );

        }

    }
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
        const prices =
            history.prices;

        if (
            !prices ||
            prices.length === 0
        ) {

            throw new Error(
                "Ethereum history is empty."
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
                "ethereum-chart"
            );

        if (!canvas) {

            throw new Error(
                "Ethereum chart canvas not found."
            );

        }

        if (ethereumChart) {

            ethereumChart.destroy();

        }

        ethereumChart = new Chart(
            canvas,
            {
                type: "line",

                data: {

                    labels: labels,

                    datasets: [

                        {

                            label:
                                "Ethereum Price (USD)",

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
            "Ethereum chart error:",
            error
        );

    }

}
loadEthereumChart();
