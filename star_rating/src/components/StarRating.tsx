import { useState } from "react";

interface StarRatingPropType {
  rating: number;
  changeRating: (value: number) => void;
  size: number;
}

const StarRating = ({ rating, size, changeRating }: StarRatingPropType) => {
  const [currentHoverStar, setCurrentHoverStar] = useState<number>(0);

  const handleOnMouseEnter = (hoveredStar: number) => {
    setCurrentHoverStar(hoveredStar);
  };

  return (
    <div className="star-container">
      {Array(size)
        .fill("")
        .map((_, idx) => {
          const currentStar = idx + 1;
          let starClass = "star";

          if (currentHoverStar >= currentStar) {
            starClass += " hover";
          } else if (rating >= currentStar) {
            starClass += " active";
          }
          return (
            <span
              onMouseEnter={() => handleOnMouseEnter(currentStar)}
              onMouseLeave={() => setCurrentHoverStar(0)}
              className={starClass}
              onClick={() => changeRating(currentStar)}
            >
              &#9733;
            </span>
          );
        })}
    </div>
  );
};

export default StarRating;
