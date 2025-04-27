import { create } from 'zustand';
import axios from 'axios';
import toast from 'react-hot-toast';

const AuthStore = create((set) => ({
    AuthUser: null,
    isLoading: false,
    isAuthChecking: true,

    checkCurreentUser: async () => {
        set({isCheckAuth: true});
        try {
            let response = await axios.get('https://event-listing-six.vercel.app/eventmanagement/api/CheckingLoggedInUser');
            if(response.data.status ==="success"){
                 set({AuthUser: response.data.data, isAuthChecking: false})
            } else{
                set({AuthUser: null, isAuthChecking: false})
            }   
        } catch (error) {
            console.log(error.message)
            set({ AuthUser: null, isAuthChecking: false });
        }
    },

    getAuthSignUp: async (data) => {
        set({isLoading: true});
        try {
            let response = await axios.post('https://event-listing-six.vercel.app/eventmanagement/api/UserSignUp', data);
            if(response.data.status ==="success"){
               toast.success("User created successfully")
               set({AuthUser: response.data.data})
               await AuthStore.getState().checkCurreentUser()
            } 
        } catch (error) {
            toast.error(error.response.data.message)
        } finally {
            set({isLoading: false});
        }

    },

    getAuthSignIn: async (data) => {
        set({isLoading: true});
        try {
            let response = await axios.post('https://event-listing-six.vercel.app/eventmanagement/api/UserSignIn', data);
            if(response.data.status ==="success"){
               toast.success("User Login successful")
                set({AuthUser: response.data.data})
                await AuthStore.getState().checkCurreentUser()
            } 
        } catch (error) {
            toast.error(error.response.data.message)
        } finally {
            set({isLoading: false});
        }
    },

    LogOutUser: async () => {
        try {
            let response = await axios.get('https://event-listing-six.vercel.app/eventmanagement/api/UserLogOut')
            if(response.data.status === "success"){
                set({AuthUser: null})
                toast.success("Logout User")
            }
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
}))

export default AuthStore;