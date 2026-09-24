async function getCryptoData(coinId) {

    const url =
        `https://api.coingecko.com/api/v3/coins/${coinId}`;

    try {

        const response = await fetch(url);

        if (!response.ok) {

            throw new Error(
                `HTTP error: ${response.status}`
            );

        }

        const data = await response.json();

        return data;

    }

    catch (error) {

        console.error(
            "Crypto API error:",
            error
        );

        return null;
    }
}
async function getCryptoHistory(
    coinId,
    days = 30
) {

    const url =
        `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=${days}`;

    try {

        const response =
            await fetch(url);

        if (!response.ok) {

            throw new Error(
                `HTTP error: ${response.status}`
            );

        }

        const data =
            await response.json();

        return data;

    }

    catch (error) {

        console.error(
            "Crypto history API error:",
            error
        );

        return null;
    }
}
