console.log(
    "Crypto Atlas — Bitcoin page"
);

async function loadBitcoinData() {

    console.log(
        "Loading Bitcoin data..."
    );

    try {

        const data =
            await getCryptoData("bitcoin");

        if (!data) {

            throw new Error(
                "No Bitcoin data received."
            );
        }

        console.log(
            "Bitcoin data received:",
            data
        );

        const market =
            data.market_data;

        document.getElementById(
            "btc-price"
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
            market.max_supply !== null &&
            market.max_supply !== undefined
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
let bitcoinChart = null;
async function loadBitcoinChart(days = 30) {

    console.log(
        "Loading Bitcoin price history..."
    );

    try {

        const history =
            await getCryptoHistory(
                "bitcoin",
                days
            );

        if (!history) {

            throw new Error(
                "No Bitcoin history received."
            );

        }

        const prices =
            history.prices;

        if (
            !prices ||
            prices.length === 0
        ) {

            throw new Error(
                "Bitcoin history is empty."
            );

        }

        const labels =
            prices.map(
                item =>
                    new Date(
                        item[0]
                    ).toLocaleDateString()
            );

        const values =
            prices.map(
                item =>
                    item[1]
            );

        const canvas =
            document.getElementById(
                "bitcoin-chart"
            );

        if (!canvas) {

            throw new Error(
                "Bitcoin chart canvas not found."
            );

        }

        if (bitcoinChart) {

            bitcoinChart.destroy();

        }

        bitcoinChart = new Chart(
            canvas,
    {
                type: "line",

                data: {

                    labels: labels,

                    datasets: [

                        {

                            label:
                                "Bitcoin Price (USD)",

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

        console.log(
            "Bitcoin price history loaded successfully."
        );

    }

    catch (error) {

        console.error(
            "Bitcoin chart error:",
            error
        );

    }

}

loadBitcoinChart();
