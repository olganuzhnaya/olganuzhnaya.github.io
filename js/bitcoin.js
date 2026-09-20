console.log("Crypto Atlas — начинаем сетевой запрос.");


async function loadTestData() {

    const url = "https://jsonplaceholder.typicode.com/todos/1";


    try {

        const response = await fetch(url);


        if (!response.ok) {

            throw new Error(
                `HTTP error: ${response.status}`
            );

        }


        const data = await response.json();


        console.log("Получен JSON:", data);


        const priceElement =
            document.getElementById("btc-price");


        priceElement.textContent =
            data.title;

    }


    catch (error) {

        console.error(
            "Ошибка сетевого запроса:",
            error
        );


        const priceElement =
            document.getElementById("btc-price");


        priceElement.textContent =
            "Data unavailable";

    }

}


loadTestData();
