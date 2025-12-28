import { useEffect, useState } from "react";
import Carousal, { type ImageData } from "./components/Carousal";

const App = () => {

  const [images, setImages] = useState<ImageData[]>([])



  // function 

  const nextBtn = () => {}
  const prevBtn = () => {}
  


  useEffect(() => {
   (async () => {
    const res = await fetch(`https://picsum.photos/v2/list?limit=10`)
    const data:ImageData[] = await res.json()
    setImages(data)
   })()
  }, [])
   
  console.log(images)

  return (
    <div className="h-96 w-full mx-auto max-w-6xl mt-24">
      <h1 className="text-center text-4xl mb-6 font-semibold">Carousal</h1>
      <Carousal images={images} imageLimite={10}  imgPerSlide={2} nextBtn={nextBtn} prevBtn={prevBtn}  />
    </div>
  );
};

export default App;