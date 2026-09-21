async function getCryptoData(coinId) {


    const url =
        `https://api.coingecko.com/api/v3/coins/${coinId}`;


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


    catch(error) {


        console.error(
            "Crypto API error:",
            error
        );


        return null;


    }


}
