export async function getBuyStocks() {

  let data;

  await fetch("/api/user/buy/list", {
    method: "GET",
  }).then((response) => response.json())
    .then((result) => {
      console.log(result)
      data = result
    })
    .catch((error) => console.error(error));

    return data
}