/* corpo da requisição
const data = {
    name: name,
    email: email,
    cpf: cpf,
    password: password,
  };
*/

export async function register(body: any) {

  const raw = JSON.stringify(body);

  let data

  await fetch("/api/user/new", {
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