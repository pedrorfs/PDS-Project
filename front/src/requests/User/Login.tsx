/* corpo da requisição
const data = {
    name: name,
    email: email,
    cpf: cpf,
    password: password,
  };
*/

export async function login(body: any) {

  const raw = JSON.stringify(body);

  await fetch("/api/login", {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: raw,
  }).then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
}