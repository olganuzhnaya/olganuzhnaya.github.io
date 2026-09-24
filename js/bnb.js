console.log(
    "Crypto Atlas — BNB page"
);


async function loadBNBData() {

    console.log(
        "Loading BNB data..."
    );

    try {

        const data =
            await getCryptoData("binancecoin");


        if (!data) {

            throw new Error(
                "No BNB data received."
            );

        }


        console.log(
            "BNB data received:",
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
    " BNB";


document.getElementById(
    "max-supply"
).textContent =
    market.max_supply !== null &&
    market.max_supply !== undefined
        ?
        market.max_supply
            .toLocaleString() +
        " BNB"
        :
        "Not available";


document.getElementById(
    "updated"
).textContent =
    new Date()
        .toLocaleString();


        console.log(
            "BNB page updated successfully."
        );

    }


    catch (error) {

        console.error(
            "BNB data error:",
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


loadBNBData();
let bnbChart = null;

async function loadBNBChart(days = 30) {

    console.log(
        "Loading BNB price history..."
    );

    try {

        const history =
            await getCryptoHistory(
                "binancecoin",
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
                "No BNB history received."
            );

        }

        console.log(
            "BNB history received:",
            history
        );

        const prices =
            history.prices;

        if (
            !prices ||
            prices.length === 0
        ) {

            throw new Error(
                "BNB history is empty."
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
                "bnb-chart"
            );

        if (!canvas) {

            throw new Error(
                "BNB chart canvas not found."
            );

        }

        if (bnbChart) {

            bnbChart.destroy();

        }

        bnbChart = new Chart(
            canvas,
            {
                type: "line",

                data: {

                    labels: labels,

                    datasets: [

                        {

                            label:
                                "BNB Price (USD)",

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
            "BNB chart error:",
            error
        );

    }

}
loadBNBChart();
