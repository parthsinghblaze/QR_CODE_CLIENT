"use client";

import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {usePathname, useRouter} from "next/navigation";
import axiosInstance from "../utils/axiosInstance";
import Loader from "./Loader";
import {signSuccess} from "../redux/auth/authSlice";


const publicRoute = [
    '/sign-in',
    '/sign-up'
];

function AuthProvider({ children }) {

    const pathname = usePathname();
    const router = useRouter();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    // const [login, setLogin] = useState(false);

    const { isLogin } = useSelector((state) => state.auth);

    async function validateToken() {
        try {
          const data = await axiosInstance.post("/auth/validate-user");
            if(data) {
                dispatch(signSuccess());
                router.push('/')
            }
        } catch (e) {
            router.push('/sign-in')
        } finally {
            setLoading(false)
        }
    }


    useEffect(() => {
        console.log("RUNNING!");
        validateToken()
    }, [])


    function gotToLogin() {
        router.push('/sign-in')
    }

    if(loading) {
        return <Loader />
    }

    if(isLogin || publicRoute.includes(pathname)) {
        return children
    }

}

export default AuthProvider;