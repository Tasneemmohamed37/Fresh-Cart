import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom';
import { userContext } from '../../context/User.Context';

export default function AuthGard({ children }) {
    const {token} = useContext(userContext);
        if (token){
            return children 
        }
        else{
            return <Navigate to='auth/login' />
        }
}
