/* corpo da requisição
const data = {
    code: code,
  };
*/

export async function removeFavorite(body: any) {

  const raw = JSON.stringify(body);

  let data;

  await fetch("/api/user/favorite", {
    method: "DELETE",
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