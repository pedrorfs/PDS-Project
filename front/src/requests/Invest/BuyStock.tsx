/* corpo da requisição
const data = {
    code: code,
    name: name,
    quantity: quantity,
    price: price
  };
*/

export async function buyStock(body: any) {

  const raw = JSON.stringify(body);

  let data;

  await fetch("/api/user/buy", {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: raw,
  }).then((response) => response.json())
    .then((result) => {
      console.log(result)
      data = result
    })
    .catch((error) => console.error(error));

    return data
}