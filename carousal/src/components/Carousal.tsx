import { useRef, useState, type RefObject } from "react"

export type ImageData = {
   id: number,
   author: string
   width: number
  height: number
  url: string
  download_url: string

 }

interface CarousalPropTypes {
  images: ImageData[]
  imgPerSlide: number
  imageLimite: number
  prevBtn: () => void
  nextBtn: () => void
}


const Carousal = ({ imageLimite=10, images, imgPerSlide=1 } :CarousalPropTypes) => {

  const [index, setIndex] = useState<number>(0)
  const [imageWidth, setImageWidth] = useState<number | null>(null)
  
  console.log(imageWidth)

  //helper function
  const prevSlide = () => {
    setIndex((prev) => prev === 0 ? imageLimite -1 : prev - 1)
  }
   
  const nextSlide = () => {
    setIndex((prev) => prev === imageLimite -1 ? 0 : prev + 1)
  }
  console.log(images.length - 1)


  return (
    <div className="carousal-container  h-full relative  overflow-hidden w-full " >
      <div  className="images-container h-full w-full flex  "
      style={{
        transform: `translateX(-${index  * (imageWidth  || 0)  }px)`,
        transition: 'transform 0.9s ease-in-out'
      }}
      >
        {
          images.slice(0, imageLimite).map((image, idx) => (
            <img  onLoad={(e) => {
             if (idx === 0) {
                setImageWidth(e.currentTarget.offsetWidth)
              }
            } } className="size-full" key={image.id} src={image.download_url}  alt={image.author}  />
          ))
        }
      </div>
      
      <button onClick={prevSlide} className="px-4 py-1 bg-gray-600 text-white cursor-pointer rounded absolute left-4 top-1/2  transform -translate-y-1/2  ">Prev</button>
      <button onClick={nextSlide} className="px-4 py-1 bg-gray-600 text-white cursor-pointer rounded absolute right-4 top-1/2 transform -translate-y-1/2  ">Next</button>
      <div className="flex items-center gap-4 absolute bottom-4 left-1/2 -translate-x-1/2 transform">
        
      {
        [...Array(imageLimite)].map((_ ,idx) => (
          <div className={`size-2 rounded-full transition-all duration ease-in-out ${index == idx ? "bg-pink-500": "bg-gray-400"} `} />
        ))
      }
      </div>
    </div>
  );
};

export default Carousal;