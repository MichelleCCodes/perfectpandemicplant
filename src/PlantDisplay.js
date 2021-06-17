import { useEffect, useState } from "react";
import "./PlantDisplay.css"

function PlantDisplay({ filteredDifficulty, filteredLight, sort, plants }) {
  useEffect(() => {
    filteredPlants(filteredDifficulty, filteredLight, sort, plants);
  }, [filteredDifficulty, filteredLight, sort, plants]);
  
  const [shownPlants, setShownPlants] = useState(plants);
  
  const filteredPlants = (filteredDifficulty, filteredLight, sort, plants) => {
    console.log(filteredDifficulty, filteredLight, sort, plants);
  };

  return (
    <div className="sortedResults">
    {shownPlants.length > 0 ? (
        shownPlants.map((dressDataItem) => (
            <div key={dressDataItem.dress_id} className="dressGridItem">
              <div className="dressGridImgContainer">
                <img src={dressDataItem["img"]} alt="dress" />
              </div>
              <div className="dressInfo">
                <h5 className="dressInfo">
                  Difficulty: {dressDataItem["difficulty"]}, Light: {dressDataItem["light"]}
                </h5>
                <h3 className="price">${dressDataItem["price"]}</h3>
              </div>
            </div>
          ))
      ) : (
        <div className="noResults">
          <p>Try another search!</p>
        </div>
      )}
    </div>
  );
}

export default PlantDisplay;
