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
let xrpChart = null;

async function loadXRPChart(days = 30) {

    console.log(
        "Loading XRP price history..."
    );

    try {

        const history =
            await getCryptoHistory(
                "ripple",
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
                "No XRP history received."
            );

        }

        console.log(
            "XRP history received:",
            history
        );

        const prices =
            history.prices;

        if (
            !prices ||
            prices.length === 0
        ) {

            throw new Error(
                "XRP history is empty."
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
                "xrp-chart"
            );

        if (!canvas) {

            throw new Error(
                "XRP chart canvas not found."
            );

        }

        if (xrpChart) {

            xrpChart.destroy();

        }

        xrpChart = new Chart(
            canvas,
            {
                type: "line",

                data: {

                    labels: labels,

                    datasets: [

                        {

                            label:
                                "XRP Price (USD)",

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
            "XRP chart error:",
            error
        );

    }

}
loadXRPChart();
