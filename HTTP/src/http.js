export async function fetchAvailablePlaces() {
  const response = await fetch("http://localhost:3000/places");
  const resData = await response.json();

  // response는 ok라는 property를 가지고 있다. 이것은 2, 300 응답일 때, true가 된다.
  if (!response.ok) {
    throw new Error("Failed to fetch places.");
  }

  return resData.places;
}

export async function updateUserPlaces(places) {
  const response = await fetch("http://localhost:3000/user-places", {
    method: "PUT",
    body: JSON.stringify({ places }), // js의 배열은 body에 넣어서 전달할 수 없다. JSON의 형태로 변경해야 한다.
    headers: {
      // header에서 body에 작성된 내용이 어떠한 형식인지 참고할 수 있도록 정보를 적어줘야 한다.
      "Content-Type": "application/json",
    },
  });

  const resData = await response.json();
  if (!response.ok) {
    throw new Error("Failed to update user data.");
  }

  return resData.message;
}

export async function fetchUserPlaces(places) {
  const response = await fetch("http://localhost:3000/user-places");
  const resData = await response.json();

  // response는 ok라는 property를 가지고 있다. 이것은 2, 300 응답일 때, true가 된다.
  if (!response.ok) {
    throw new Error("Failed to fetch user places.");
  }

  return resData.places;
}
