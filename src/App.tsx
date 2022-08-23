//@ts-nocheck
import Main from './components/Main';
import Detailview from './components/DetailView';
import './App.scss';
import { useState } from 'react';
function App() {
  const [restaurants, setRestaurants] = useState();
  const [learnMore, setLearnMore] = useState(false);
  const [index, setIndex] = useState();

  return (
    <div className="p-12">
      <h1 className="text-4xl">Restaurants</h1>
      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nisi tempore,
        unde, nulla reprehenderit vel nihil ex asperiores minima natus nam
        officia! Sapiente laboriosam quo quisquam amet reprehenderit suscipit
        natus? Magni!
      </p>
      {learnMore ? (
        <Detailview
          restaurants={restaurants}
          setRestaurants={setRestaurants}
          index={index}
          setIndex={setIndex}
          setLearnMore={setLearnMore}
        />
      ) : (
        <Main
          restaurants={restaurants}
          setRestaurants={setRestaurants}
          learnMore={learnMore}
          setLearnMore={setLearnMore}
          index={index}
          setIndex={setIndex}
        />
      )}
    </div>
  );
}

export default App;

// "username": "Admin45",
// "password": "123456789",
// "phoneNumber": "089510011398",
// "email": "admin45@email.com"
//token : eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyZmE1ZGZlZjY1ZjNlMDAwNGY5ZDAwMyIsImlhdCI6MTY2MDU3NTIzMCwiZXhwIjoxNjYwODM0NDMwfQ.aTBNBhZpTEPuvZNs1Z4KZs-XXQm7LA5dQe35Krz8YkY"
// register-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyZmE1ZGZlZjY1ZjNlMDAwNGY5ZDAwMyIsImlhdCI6MTY2MDU3NTMzNiwiZXhwIjoxNjYwODM0NTM2fQ.e0cX1PzvBnoA9MTzXDxBEusEe_Qh1DjqxzXPelfDekU"
