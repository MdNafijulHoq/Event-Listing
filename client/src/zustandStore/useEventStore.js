import { create } from 'zustand';
import axios from 'axios';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2'

const EventStore = create((set) => ({
    Event: null,

    getEvent: async () => {
        try {
            let response = await axios.get('/eventmanagement/api/GetEvent')
            if(response.data.status === "success"){
                set({Event: response.data.data})
            }  
        } catch (error) {
            console.log(error.message)
        }

    },

    createEvent: async (formData) => {
        try {
            let response = await axios.post('/eventmanagement/api/CreateEvent', formData)
            if(response.data.status === "success"){
                set({Event: response.data.data})
                toast.success("Event Created")
            }  
        } catch (error) {
            console.log(error.message)
        }

    },

    getEventByUser: async () => {
        try {
            let response = await axios.get('/eventmanagement/api/EventByUser')
            if(response.data.status === "success"){
                set({Event: response.data.data})
            }  
        } catch (error) {
            console.log(error.message)
        }

    },

    GetEventDetailsByID:  async (id) => {
        try {
            let response = await axios.get(`/eventmanagement/api/GetEventDetailsByID/${id}`)
            if(response.data.status === "success"){
                set({Event: response.data.data})
            }
        } catch (error) {
            console.log(error.message)
        }
    },

    DeleteEvent: async (id) => {
        try {
          const result = await Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          });
      
          if (result.isConfirmed) {
            let response = await axios.delete(`/eventmanagement/api/EventDelete/${id}`);
            if (response.data.data?.deletedCount > 0) {
              await Swal.fire({
                title: "Deleted!",
                text: "Your event has been deleted.",
                icon: "success"
              });
              return true; 
            }
          }
          return false;
        } catch (error) {
          console.log(error.message);
          return false;
        }
      },
      
}))

export default EventStore;