import { useEffect, useState } from "react";

import Places from "./Places.jsx";
import Error from "./Error.jsx";
import { sortPlacesByDistance } from "../loc.js";
import { fetchAvailablePlaces } from "../http.js";

export default function AvailablePlaces({ onSelectPlace }) {
  const [isFetching, setIsFetching] = useState(false);
  const [availablePlaces, setAvailablePlaces] = useState([]);
  const [error, setError] = useState();

  // get request, fetch는 Promise object를 반환함. response를 감싸고 있음.
  useEffect(() => {
    async function fetchPlaces() {
      setIsFetching(true);
      try {
        // Request를 보내는 부분을 분리하면 코드를 더 깔끔하게 유지 관리할 수 있다.
        // Async 함수이기에 await을 사용할 수 있다.
        // resData의 places를 반환하기 때문에, const로 값을 저장한다.
        const places = await fetchAvailablePlaces();

        // browser를 통해서 사용자의 위치 정보를 불러올 수 있다. (사용자의 권한 허가 필요)
        // 이 기능은 시간이 많이 필요해서 비동기로 작업해야 한다.
        // 하지만 Promise object가 아니기 때문에 Callback함수를 넣어서 사용한다.
        navigator.geolocation.getCurrentPosition((position) => {
          const sortedPlaces = sortPlacesByDistance(
            places,
            position.coords.latitude,
            position.coords.longitude
          );
          setAvailablePlaces(sortedPlaces);

          // Callback 함수를 사용하기 때문에, 비동기 작업이 불가해서 IsFetching을 이 Callback 안에서 적용해줘야 한다.
          setIsFetching(false);
        });
      } catch (error) {
        // Error 발생 시 UI update하여 사용자에게 보여줄 수 있음.
        setError({
          message:
            error.message || "Could not fetch places, please try again later.",
        });

        // Error가 발생한 경우 IsFetching이 Callback으로 이동한 점 때문에, true로 남아있지 않도록 false로 변경해준다.
        setIsFetching(false);
      }
    }

    fetchPlaces();
  }, []);

  if (error) {
    return <Error title="An error occured!" message={error.message} />;
  }

  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      isLoading={isFetching}
      loadingText="Loading places."
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
