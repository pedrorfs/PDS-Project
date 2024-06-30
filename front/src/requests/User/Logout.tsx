/* corpo da requisição
const data = {
    name: name,
    email: email,
    cpf: cpf,
    password: password,
  };
*/

export async function logout(body: any) {

  await fetch("/api/login", {
    method: "DELETE",
  }).then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
}