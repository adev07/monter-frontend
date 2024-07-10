import React from 'react'
import { Route, Routes } from 'react-router-dom'
import About from '../pages/About/About';
import Home from '../pages/Home/Home';
import Register from '../pages/Register/Register';
import VerifyOtp from '../pages/VerifyOtp/VerifyOtp';
import Login from '../pages/Login/Login';
import CompleteProfile from '../pages/CompleteProfile/CompleteProfile';
import BookLists from '../pages/BookLists/BookLists'; 
import BookDetails from '../pages/BookDetails/BookDetails';
import AddReview from '../pages/AddReview/AddReview';
import { ROUTES } from './RouterConfig';

const Router = () => {

    const RouteWithRole = ({ Element }) => {
        return (
          <>
            <Element/>
          </>
        );
      }

  return (
    <div>
        <Routes>
            <Route exact path={ROUTES.Home} element={<RouteWithRole Element={Home} />}></Route>
            <Route exact path={ROUTES.About} element={<RouteWithRole Element={About} />}></Route>
            <Route exact path={ROUTES.Register} element={<RouteWithRole Element={Register} />}></Route>
            <Route exact path={ROUTES.VerifyOtp} element={<RouteWithRole Element={VerifyOtp} />}></Route>
            <Route exact path={ROUTES.Login} element={<RouteWithRole Element={Login} />}></Route>
            <Route exact path={ROUTES.CompleteProfile} element={<RouteWithRole Element={CompleteProfile} />}></Route>
            <Route exact path={ROUTES.BookLists} element={<RouteWithRole Element={BookLists} />}></Route>
            <Route exact path={ROUTES.BookDetails} element={<RouteWithRole Element={BookDetails} />}></Route>
            <Route exact path={ROUTES.AddReview} element={<RouteWithRole Element={AddReview} />}></Route>
        </Routes>
    </div>
  )
}

export default Router