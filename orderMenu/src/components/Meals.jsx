// import { useEffect, useState } from "react";
import useHttp from "../hooks/useHttp.js";
import MealItem from "./MealItem.jsx";
import Error from "./UI/Error.jsx";

const requestConfig = {};

export default function Meals() {
  // const [loadedMeals, setLoadedMeals] = useState([]);
  const {
    data: loadedMeals,
    isLoading,
    error,
  } = useHttp("http://localhost:3000/meals", requestConfig, []);

  // useEffect(() => {
  //   async function fetchMeals() {
  //     const response = await fetch("http://localhost:3000/meals");

  //     if (!response.ok) {
  //       // ...
  //     }

  //     const meals = await response.json();
  //     setLoadedMeals(meals);
  //   }

  //   fetchMeals();
  // }, []);

  if (isLoading) {
    return <p className="center"> Fetching meals...</p>;
  }

  if (error) {
    return <Error title="Failed to  fetch meals" message={error} />;
  }

  // if (!loadedMeals) {
  //   return <p>No meals found.</p>;
  // }

  return (
    <ul id="meals">
      {loadedMeals.map((meal) => (
        <MealItem key={meal.id} meal={meal} />
      ))}
    </ul>
  );
}
