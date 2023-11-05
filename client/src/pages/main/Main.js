import {useState,useEffect} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {useCookies} from "react-cookie";
import {toast} from 'react-toastify';
import useUserStore from "../../store/UserStore";
function Main() {
    const navigate = useNavigate();
    const [cookies,removeCookie] = useCookies([]);

    useEffect(()=>{
        const checkUser = async ()=>{
            if(!cookies.token){
                navigate('/auth')
            }
            const {data} = await axios.post('http://localhost:4000/',{},{
                withCredentials:true
            })
            const {status,user} = data;
            if (status){
                toast(`welcome ${user}`)
                useUserStore.setState({user})
            }else {
                removeCookie('token');
                navigate('/auth')
            }
        }
        checkUser()
    },[cookies,navigate,removeCookie])

    const logout = () => {
        removeCookie('token')
        navigate('/auth')
        useUserStore.setState({user:null})
    }
    return (
        <div>
            <h4>
                {''}
                welcome {useUserStore(state=>state.user)}
            </h4>
            <button onClick = {logout}>logout</button>
        </div>
    );
}

export default Main;