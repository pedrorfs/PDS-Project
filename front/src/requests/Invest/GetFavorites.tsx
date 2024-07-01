export async function getFavoriteStocks() {

  let data;

  await fetch("/api/user/favorites", {
    method: "GET",
  }).then((response) => response.json())
    .then((result) => {
      console.log(result)
      data = result
    })
    .catch((error) => console.error(error));

    return data
}