import { useContext, useState } from 'react'
import Style from './ProtectedRoute.module.css'
import { useEffect } from 'react'
import { UserContext } from '../../Context/UserContext'
import { Navigate } from 'react-router-dom';

function ProtectedRoute(props) {
    
    const {token} = useContext(UserContext);
    if(token) {
        
        return props.children
    }else {
        
        return <Navigate to={'/login'}></Navigate>
    }


   
}

export default ProtectedRoute
