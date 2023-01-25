import './style.scss';
import Map, { Marker, Popup } from 'react-map-gl';
import mapboxgl from 'mapbox-gl';
import Pin from './pin.png';
import { useEffect, useState } from 'react';
import StarIcon from '@mui/icons-material/Star';
import PersonPinCircleIcon from '@mui/icons-material/PersonPinCircle';
import axios from 'axios';
import { format } from 'timeago.js';
import Register from './components/Register';
import Login from './components/Login';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX;



function App() {
  const myStorage = window.localStorage;
  const [currentUser, setCurrentUser] = useState(myStorage.getItem("user"));
  const [showPopup, setShowPopup] = useState({});
  const [pins, setPins] = useState([]);
  const [newPlace, setNewPlace] = useState(null);
  const [title, setTitle] = useState(null);
  const [desc, setDesc] = useState(null);
  const [rating, setRating] = useState(0);
  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  
   
  const handleAddPlace = (e) => {
    // const [longitude, latitude] = e.lngLat;
    const longitude = e.lngLat.lng;
    const latitude = e.lngLat.lat;
    setNewPlace({
      longitude,
      latitude,
    })
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPin = {
      username : currentUser,
      title,
      desc,
      rating,
      longitude: newPlace.longitude,
      latitude : newPlace.latitude,
    }
    try {
      const res = await axios.post('/pins', newPin);
      setPins(...pins, res.data);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }

  }

  const handleLogout = () => {
    myStorage.removeItem('user');
    setCurrentUser(null);
  }

  console.log(newPlace);
  useEffect(() => {
    const getPins = async () => {
      try {
        const res = await axios.get('/pins');
        setPins(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getPins();
  },[])

  return (
    <>
    <Map
    initialViewState={{
      longitude: 2.294694,
      latitude: 48.858093,
      zoom: 5
    }}
    style={{width: '100vw', height: '100vh'}}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        onDblClick={handleAddPlace}
      >
      
        {console.log(pins)}
        

        {pins.map((p) => (
          <div key={p._id}>
        <Marker
          longitude={p.longitude}
          latitude={p.latitude}
          anchor="bottom"
              onClick={(e) => {
                e.originalEvent.stopPropagation();
                setShowPopup({ ...showPopup, [p._id]: true }, p.longitude, p.latitude);
          }} >
              {p.username === currentUser ? (<img src={Pin} alt='' style={{cursor:'pointer'}}/>): (<PersonPinCircleIcon className="otherIcon"/>)}
          </Marker>
  
            {showPopup[p._id] && (   
          <Popup longitude={p.longitude} latitude={p.latitude}
            anchor="left"
            onClose={() => setShowPopup(false)}>
            <div className="card">
              <label>Place</label>
                  <h4><b>{p.title }</b></h4>
              <label>Review</label>
              <p>{p.desc }</p>
              <label>Rating</label>
                  <div>{Array(p.rating).fill(<StarIcon />) }</div>
              <label>Information</label>
                  <span>Created by <b>{p.username}</b> <span>{format(p.createdAt) }</span></span>
            </div>
          </Popup>    
            )}
          </div>
        ))}
        
        {newPlace && (
        <Popup longitude={newPlace.longitude} latitude={newPlace.latitude}
            anchor="left"
            onClose={() => setShowPopup(false)}>
            
            <div className="addPlace">
              <form onSubmit={handleSubmit}>
                <label>Title</label>
                <input type="text" placeholder="Title" onChange={(e) => setTitle(e.target.value)}/>
                <label>Review</label>
                <textarea placeholder="Say something about this place" onChange={(e) => setDesc(e.target.value)}/>
                <label>Rating</label>
                <select onChange={(e) => setRating(e.target.value)}>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
                <button type='submit'>Add Pin</button>
            </form>
            </div>
          </Popup>
        )}
        <div className="topRight">      
          {currentUser ? (<button className='button logout' onClick={handleLogout}>Log Out</button>) :
            (<>
          <button className='button login' onClick={()=>setShowLogin(true)}>Login</button>
          <button className='button register' onClick={()=>setShowRegister(true)}>Register</button>
          </>)
          }      
        </div>
        {showRegister && <Register setShowRegister={setShowRegister} />}
        {showLogin && <Login setShowLogin={setShowLogin} myStorage={myStorage} setCurrentUser={setCurrentUser} />}
        
      </Map>
      </>
  );
}

export default App;
