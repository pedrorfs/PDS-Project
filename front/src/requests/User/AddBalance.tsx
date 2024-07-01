/* corpo da requisição
const data = {
    balance: balance
  };
*/

export async function addBalance(body: any) {

  const raw = JSON.stringify(body);

  let data;

  await fetch("/api/user/balance", {
    method: "PATCH",
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