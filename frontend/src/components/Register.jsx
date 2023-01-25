import './style.scss';
import Pin from '../pin.png';
import { useRef, useState } from 'react';
import axios from 'axios';
import CancelIcon from '@mui/icons-material/Cancel';

export default function Register({setShowRegister}) {

    const [success, setSuccess] = useState(false);
    const [failure, setFailure] = useState(false)

    const userName = useRef();
    const email = useRef();
    const passWord = useRef();

    const handleRegister = async (e) => {
        e.preventDefault();
        const newUser = {
            username: userName.current.value,
            email: email.current.value,
            password: passWord.current.value,
        }
        try {
            await axios.post('/users/register', newUser); 
            setSuccess(true)
            setFailure(false);
        } catch (error) {
            setFailure(true);
        }
    }

    return (
        <div className="LoginRegisterContainer">
            <div className="logo">
            <img src={Pin} alt=""/><h1><sub>PG</sub>Maps </h1>
            </div>
            <form onSubmit={handleRegister}>
                <input type="text" placeholder="Username" ref={userName} />
                <input type="email" placeholder="Email" ref={email}/>
                <input type="password" placeholder="Password" ref={passWord}/>
                <button type="submit">Register</button>
                {success && <span className="success">Success! You can login now.</span>}
                {failure && <span className="failure">Somethng went wrong!</span>}
            </form>
            <CancelIcon onClick={()=>setShowRegister(false)}/>
        </div>
    )
}