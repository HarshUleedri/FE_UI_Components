

interface GetPaginationPropType {
  total: number,
  current: number | string
  delta?: number
}


const getPagination = ({total, current, delta=2}:GetPaginationPropType) => {

   const range: number [] = []
   const rangeWithDots: (number | string)[] = []
   let prevsNum = null
   for(let i = 1; i <= total; i++){
     
    if(i === 1 || i === total || (i >= ( +current - delta) && i <= (+current + delta) )) {
         range.push(i)
    }
      
   }
  //  [1, 4,5,6,7,8, 20]
   for(let i  of range){
    
    if(prevsNum){
      if(i -prevsNum > 2){
        rangeWithDots.push("...")
      }else if (i - prevsNum === 2){
        rangeWithDots.push(prevsNum +1)

      }
    }
    rangeWithDots.push(i)
    prevsNum = i
  
   }
   console.log(rangeWithDots)
  
   return rangeWithDots
}

export default getPagination