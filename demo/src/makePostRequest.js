async function postData(url = "", data) {
  const response = await fetch(url, {
    method: "POST",
    body: data,
  });
  return response.json();
}

export const makePostRequest = (data) => {
  postData("/api", data).then((data) => {
    console.log(data);
  });
};
