import './style.scss';
import Pin from '../pin.png';
import { useRef, useState } from 'react';
import axios from 'axios';
import CancelIcon from '@mui/icons-material/Cancel';

export default function Login({setShowLogin, myStorage, setCurrentUser}) {

    const [failure, setFailure] = useState(false);

    const userName = useRef();
    const passWord = useRef();

    const handleLogin = async (e) => {
        e.preventDefault();
        const user = {
            username: userName.current.value,
            password: passWord.current.value,
        }
        try {
            const res = await axios.post('/users/login', user);
            setCurrentUser(res.data.username);
            myStorage.setItem('user', res.data.username);
            setShowLogin(false);
        } catch (error) {
            setFailure(true);
        }
    }


    return (
        <div className="LoginRegisterContainer">
              <div className="logo">
            <img src={Pin} alt=""/><h1><sub>PG</sub>Maps </h1>
            </div>
            <form onSubmit={handleLogin}>
                <input type="text" placeholder="Username" ref={userName} />
                <input type="password" placeholder="Password" ref={passWord}/>
                <button type="submit">Login</button>
                {failure && <span className="failure">Somethng went wrong!</span>}
            </form>
            <CancelIcon onClick={()=>setShowLogin(false)}/>
        </div>
    )
}