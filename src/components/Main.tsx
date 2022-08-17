//@ts-nocheck
import React, { useEffect, useState } from 'react';
import getData from '../request/getData';
import { MoonLoader } from 'react-spinners';
import { svg } from './svg';

const override: CSSProperties = {
  color: 'red',
  margin: 'auto auto',
};

function Main({
  restaurants,
  setRestaurants,
  learnMore,
  setLearnMore,
  index,
  setIndex,
}) {
  // const [restaurants, setRestaurants] = useState();
  const [maxRange, setMaxRange] = useState(16);
  const [open, setOpen] = useState(false);
  const [sortPrice, setSortPrice] = useState();
  const [category, setCategory] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const data = await getData();
      let resto = data?.data?.Result;

      if (!sortPrice) {
        if (!open) {
          setRestaurants(resto);
          if (category === 'canteen') {
            setRestaurants(resto.filter((e) => e.restauranttype === 'canteen'));
          }
          if (category === 'eatery') {
            setRestaurants(resto.filter((e) => e.restauranttype === 'eatery'));
          }
          if (category === 'bukka') {
            setRestaurants(resto.filter((e) => e.restauranttype === 'bukka'));
          }
        }
        if (open) {
          setRestaurants(resto.filter((e) => e.reviews >= 30));
          if (category === 'canteen') {
            setRestaurants(resto.filter((e) => e.restauranttype === 'canteen'));
          }
          if (category === 'eatery') {
            setRestaurants(resto.filter((e) => e.restauranttype === 'eatery'));
          }
          if (category === 'bukka') {
            setRestaurants(resto.filter((e) => e.restauranttype === 'bukka'));
          }
        }
      }

      if (sortPrice === 'terendah') {
        function sortByReviews(a, b) {
          if (a.reviews < b.reviews) {
            return -1;
          }
          if (a.reviews > b.reviews) {
            return 1;
          }
          return 0;
        }
        const sorted = resto.sort(sortByReviews);
        if (!open) {
          setRestaurants(sorted);
          if (category === 'canteen') {
            setRestaurants(resto.filter((e) => e.restauranttype === 'canteen'));
          }
          if (category === 'eatery') {
            setRestaurants(resto.filter((e) => e.restauranttype === 'eatery'));
          }
          if (category === 'bukka') {
            setRestaurants(resto.filter((e) => e.restauranttype === 'bukka'));
          }
        }
        if (open) {
          setRestaurants(sorted.filter((e) => e.reviews >= 30));
          if (category === 'canteen') {
            setRestaurants(resto.filter((e) => e.restauranttype === 'canteen'));
          }
          if (category === 'eatery') {
            setRestaurants(resto.filter((e) => e.restauranttype === 'eatery'));
          }
          if (category === 'bukka') {
            setRestaurants(resto.filter((e) => e.restauranttype === 'bukka'));
          }
        }
      }

      if (sortPrice === 'tertinggi') {
        function sortByReviews(a, b) {
          if (a.reviews < b.reviews) {
            return 1;
          }
          if (a.reviews > b.reviews) {
            return -1;
          }
          return 0;
        }
        const sorted = resto.sort(sortByReviews);
        if (!open) setRestaurants(sorted);
        if (open) setRestaurants(sorted.filter((e) => e.reviews >= 30));
      }

      // if (category === 'canteen') {
      //   setRestaurants(resto.filter((e) => e.restauranttype === 'canteen'));
      // }
      // if (category === 'eatery') {
      //   setRestaurants(resto.filter((e) => e.restauranttype === 'eatery'));
      // }
      // if (category === 'bukka') {
      //   setRestaurants(resto.filter((e) => e.restauranttype === 'bukka'));
      // }
    }

    fetchData();
    if (!restaurants) setLoading(true);
    if (restaurants) setLoading(false);
    return () => {
      // fetchData();
    };
  }, [open, restaurants, loading, sortPrice, category]);

  function priceFilter(e) {
    setSortPrice(e.target.value);
  }
  function handleCategory(e) {
    setCategory(e.target.value);
  }
  function loadMore() {
    setMaxRange((prev) => prev + 8);
  }
  return (
    <div className="App">
      <div className="main flex gap-7 py-7">
        <p>Filter By:</p>
        <div className="flex gap-2 border-b-2 border-slate-400">
          <input
            className="cursor-pointer"
            type="radio"
            value={open}
            onClick={() => setOpen(!open)}
            checked={open ? 'checked' : ''}
            readOnly
          />
          <p>Open Now</p>
        </div>
        <div className="flex gap-2 border-b-2 border-slate-400">
          <select
            name="price"
            id="price"
            value={sortPrice}
            onChange={priceFilter}
            className="bg-white cursor-pointer"
          >
            <option value="" hidden>
              Price
            </option>
            <option value="tertinggi">tertinggi</option>
            <option value="terendah">terendah</option>
          </select>
        </div>
        <div className="flex gap-2 border-b-2 border-slate-400">
          <select
            name="kategori"
            value={category}
            onChange={handleCategory}
            id="kategori"
            className="bg-white cursor-pointer"
          >
            <option hidden>Category</option>
            <option value="canteen">canteen</option>
            <option value="eatery">eatery</option>
            <option value="bukka">bukka</option>
          </select>
        </div>
      </div>
      <div className="section py-7">
        <h1 className="text-3xl">All Restaurants</h1>

        <MoonLoader
          color={'#991b1b'}
          loading={loading}
          cssOverride={override}
        />

        <div className="w-fit flex gap-7">
          {!restaurants ? (
            ''
          ) : (
            <div>
              <div className="w-fit py-7 flex gap-7 flex-wrap justify-center">
                {restaurants.slice(0, maxRange).map((e, i) => (
                  <div key={i} className="w-18">
                    <img className="h-36 w-44" src={e.image} alt="" />
                    <div className="flex justify-between">
                      <p>{e.businessname.split(' ')[0]}</p>
                      <p>{e.restauranttype}</p>
                    </div>
                    {e.reviews >= 30 ? svg[1] : svg[0]}
                    <div className="flex justify-between">
                      <div className="flex text-sm gap-1">
                        <p>{e.location.split(' ')[0]} .</p>
                        <p>{e.reviews}$</p>
                      </div>

                      <div className="flex items-center gap-1">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill={e.reviews >= 30 ? 'green' : 'red'}
                          viewBox="0 0 16 16"
                        >
                          <circle cx="8" cy="8" r="8"></circle>
                        </svg>
                        <p>{e.reviews >= 30 ? 'Open' : 'Close'}</p>
                      </div>
                    </div>
                    <div
                      onClick={() => {
                        setLearnMore(true);
                        setIndex(i);
                        console.log(999, i);
                      }}
                      className="bg-[#0e7490] shadow-[0_7px_#155e75] active:shadow-none active:relative active:top-[7px]  flex p-1 text-white justify-center cursor-pointer"
                    >
                      <p>Learn More</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-center ">
                <button
                  onClick={loadMore}
                  className="border border-slate-900 px-28 py-2 rounded-md"
                >
                  Load More...
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Main;

// "username": "Admin45",
// "password": "123456789",
// "phoneNumber": "089510011398",
// "email": "admin45@email.com"
//token : eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyZmE1ZGZlZjY1ZjNlMDAwNGY5ZDAwMyIsImlhdCI6MTY2MDU3NTIzMCwiZXhwIjoxNjYwODM0NDMwfQ.aTBNBhZpTEPuvZNs1Z4KZs-XXQm7LA5dQe35Krz8YkY"
// register-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyZmE1ZGZlZjY1ZjNlMDAwNGY5ZDAwMyIsImlhdCI6MTY2MDU3NTMzNiwiZXhwIjoxNjYwODM0NTM2fQ.e0cX1PzvBnoA9MTzXDxBEusEe_Qh1DjqxzXPelfDekU"
