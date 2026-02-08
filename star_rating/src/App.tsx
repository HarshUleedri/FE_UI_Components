import { useState } from "react";
import StarRating from "./components/StarRating";

const App = () => {
  const [rating, setRating] = useState<number>(0);

  return (
    <div className="container">
      <h1>Star Rating</h1>
      <StarRating size={5} rating={rating} changeRating={setRating} />
      <p>current ratings : {rating}</p>
    </div>
  );
};

export default App;
