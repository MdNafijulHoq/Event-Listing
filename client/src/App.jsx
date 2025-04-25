import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router";
import HomePage from './pages/HomePage';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import { Toaster } from 'react-hot-toast';
import CategoryDetails from './components/home/CategoryDetails';
import Details from './shared/Details';
import CreateEvent from './components/dashboard/CreateEvent';
import MyEvent from './components/dashboard/MyEvent';
import PrivateRoute from './PrivateRoute/PrivateRoute';
import ErrorPage from './pages/ErrorPage';

const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomePage/>} />
      <Route path="/category/:id" element={<CategoryDetails/>} />
      <Route path="/event-details/:id" element={<Details/>} />
      <Route path="/createEvent" element={<PrivateRoute><CreateEvent/></PrivateRoute>} />
      <Route path="/event-by-user" element={<PrivateRoute><MyEvent/></PrivateRoute>} />
      <Route path="/signin" element={<SignIn/>} />
      <Route path="/signup" element={<SignUp/>} />
      <Route path="*" element={<ErrorPage/>} />
    </Routes>
    <Toaster reverseOrder={false} />
  </BrowserRouter>
  );
};

export default App;