import React, { useEffect } from 'react';
import { Navigate } from 'react-router';
import AuthStore from '../zustandStore/useAuthStore';

const PrivateRoute = ({children}) => {
    const {AuthUser, checkCurreentUser, isAuthChecking } = AuthStore();
    useEffect(() =>{
        (
            async() => {
                await checkCurreentUser();
            }
        )()
    },[checkCurreentUser])

    if (isAuthChecking) {
        return <div className="text-center mt-20">Checking authentication...</div>;
      } 
    if(AuthUser) return children
    return <Navigate to="/signin"/>;
};

export default PrivateRoute;