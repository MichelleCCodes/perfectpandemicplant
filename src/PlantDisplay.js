import { useEffect, useState } from "react";
import Placeholder from "./assets/no-match.jpeg";

function PlantDisplay({ filteredDifficulty, filteredLight, sort, plants }) {
  useEffect(() => {
    filteredPlants(filteredDifficulty, filteredLight, sort, plants);
  }, [filteredDifficulty, filteredLight, sort, plants]);

  const [shownPlants, setShownPlants] = useState(plants);

  const filteredPlants = (filteredDifficulty, filteredLight, sort, plants) => {
    const sortPrice = (action, result) => {
      if (action === "ascending") {
        result.sort((a, b) => {
          return a.price - b.price;
        });
      } else if (action === "descending") {
        result.sort((a, b) => {
          return b.price - a.price;
        });
      } else {
        return;
      }
    };

    const reset = (sortAction, result) => {
      sortPrice(sortAction, result);
      setShownPlants(result);
    };

    let result = [];
    if (filteredDifficulty.length > 0 && filteredLight.length > 0) {
      for (let i = 0; i < plants.length; i++) {
        if (
          filteredDifficulty.includes(plants[i].difficulty) &&
          filteredLight.includes(plants[i].light)
        ) {
          result.push(plants[i]);
        } else {
          continue;
        }
      }
      reset(sort, result);
    } else if (filteredDifficulty.length > 0) {
      for (let i = 0; i < plants.length; i++) {
        if (filteredDifficulty.includes(plants[i].difficulty)) {
          result.push(plants[i]);
        } else {
          continue;
        }
      }
      reset(sort, result);
    } else if (filteredLight.length > 0) {
      for (let i = 0; i < plants.length; i++) {
        if (filteredLight.includes(plants[i].light)) {
          result.push(plants[i]);
        } else {
          continue;
        }
      }
      reset(sort, result);
    } else {
      sortPrice(sort, result);
      setShownPlants(plants);
    }
  };

  return (
    <div className="sortedResults">
      {shownPlants.length > 0 ? (
        shownPlants.map((plant) => (
          <div key={plant.id} className="plantGridItem">
            <div className="plantGridImgContainer">
              <div className="infoContainer">
                <img src={plant.img} alt="dress" />
                <div className="plantDetails">
                  <h2>{plant.name}</h2>
                  <p>{plant.description}</p>
                </div>
              </div>
              <div className="plantInfo">
                <p>{`❤️ ${plant.difficulty} care`}</p>
                <p>{`☀️ ${plant.light} sunlight`}</p>
                <h3 className="price">${plant.price}</h3>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="noResults">
          <p>Try another search!</p>
          <img src={Placeholder} alt="No match found" />
        </div>
      )}
    </div>
  );
}

export default PlantDisplay;
