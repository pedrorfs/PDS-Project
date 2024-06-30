export async function getUserData() {

  let data;

  await fetch("/api/user", {
    method: "GET",
  }).then((response) => response.json())
    .then((result) => {
      console.log(result)
      data = result
    })
    .catch((error) => console.error(error));

    return data
}