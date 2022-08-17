//@ts-nocheck

import { useEffect, useState } from 'react';
import { svg } from './svg';
const Detailview = ({ restaurants, setRestaurants, index, setLearnMore}) => {
  const [resto, setResto] = useState();
  useEffect(() => {
    setResto(restaurants[index]);
  });
  //console.log(restaurants[index])
  return (
    <div className="py-7">
  
      <h1 className="text-3xl">Detail Restaurant</h1>
      <div className="py-7 flex flex-col rounded-md items-center w-1/2 mx-auto border border-slate-300">
 
        <p className="text-2xl">{resto?.businessname}</p>
        {resto >= 30 ? svg[1] : svg[0]}

        <div className="flex flex-col items-center">
          <img
            className="px-12 " 
            src={resto?.image}
            alt=""
          />
          <div className="py-3 flex flex-col p-12">
            <p>Location : {resto?.location.split(' ')[0]}</p>
            <p>
              About: Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Exercitationem illo voluptas tenetur alias, eum in quam iste
              architecto aspernatur aut mollitia laudantium totam explicabo
              fugit, commodi dolores doloribus veniam ducimus.
            </p>
            <a  className='bg-[#0e7490] shadow-[0_7px_#155e75] active:shadow-none active:relative active:top-[7px]  px-7 flex justify-center rounded-md text-white' href="/">Back</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detailview;

// - Restaurant Name & Rating
//   - Map (optional)
//   - Section
//     - Review item
//       - Image
//       - Name
//       - Rating
//       - Text
