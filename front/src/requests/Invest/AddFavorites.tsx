/* corpo da requisição
const data = {
    code: code,
    name: name,
  };
*/

export async function addFavorite(body: any) {

  const raw = JSON.stringify(body);

  let data;

  await fetch("/api/user/favorite", {
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