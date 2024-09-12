import { useState, useEffect } from "react";
import {useAuth} from "../../context/Auth.jsx";
import {Outlet} from 'react-router-dom';
import axios from 'axios';
import Spinner from "../Spinner.jsx";

export default function PrivateRoute() {
    const [ok, setOk] = useState(false);
    const [auth, setAuth] = useAuth();

    useEffect(() => {

        // this authCheck is the function inside useEffect hook and it will runs only when we call it
        const authCheck = async() => {
            const res = await axios.get(`${import.meta.env.VITE_API}/api/v1/auth/user-auth`); 
            if(res.data.ok) {
                setOk(true)
            }else {
                setOk(false);
            }
        }

        // this below line is the line which runs inside useEFfect hook
        if(auth?.token) authCheck();
    } , [auth?.token]);

    return ok ? <Outlet /> : <Spinner />;
}

// This file is Private Routing file