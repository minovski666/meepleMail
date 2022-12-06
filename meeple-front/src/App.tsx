import React, {useContext} from 'react';
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom';
import Homepage from './Components/Homepage/Homepage';
import LoginPage from './Components/LoginPage/LoginPage';
import NavBar from './Components/NavBar/NavBar';
import "./GlobalStyles.css"
import {myContext} from './Context'
import RegisterPage from './Components/RegisterPage/RegisterPage';
import Profile from './Components/ProfilePage/ProfilePage'
import AdminPageUsers from './Components/AdminPage/AdminPageUsers'
import AdminPageBlogs from "./Components/AdminPage/AdminPageBlogs";
import AdminPageChangeLogs from "./Components/AdminPage/AdminPageChangeLogs";
import {IUser} from "./types/maintypes";
import ChangeLogPage from "./Components/ChangeLog/ChangeLogPage";
import BlogPage from "./Components/BlogPage/BlogPage";
import SingleBlogPost from "./Components/BlogPage/SingleBlogPost";

//refactor to components maybe?
import StripeSuccess from './Components/Stripe/stripe-success';
import StripeCancel from './Components/Stripe/cancel-payment';
import CreateChangeLogPage from "./Components/AdminPage/CreateChangeLogPage";
import CreateBlogPage from "./Components/AdminPage/CreateBlogPage";
import UpdateChangeLog from "./Components/AdminPage/UpdateChangeLog";
import UpdateBlog from "./Components/AdminPage/UpdateBlog";
import AdminPageSourcePage from "./Components/AdminPage/AdminPageSourcePage";
import CreateSources from "./Components/AdminPage/CreateSources";
import UpdateSource from "./Components/AdminPage/UpdateSource";
import Page404 from "./Components/Custom/Page404";
import AdminPageConnect from "./Components/AdminPage/AdminPageConnect";
import UserHomePage from "./Components/Homepage/UserHomePage";
import LandingHomePage from "./Components/Homepage/LandingHomePage";
import ForgotPasswordPage from "./Components/ForgotPasswordPage/ForgotPasswordPage";
import ChangePasswordPage from "./Components/ForgotPasswordPage/ChangePasswordPage";
import VerifyEmail from "./Components/VerifyEmail/VerifyEmail";
import AdminPageBug from "./Components/AdminPage/AdminPageBug";
import Terms from "./Components/Custom/Terms"
import Privacy from "./Components/Custom/Privacy";
import Cookie from "./Components/Custom/Cookie";

function App() {
    const userObject = useContext(myContext) as IUser;
    return (
        <BrowserRouter>
            <NavBar/>
            <Routes>
                <Route path="*" element={<Page404/>} />
                <Route path='/' element={<LandingHomePage/>}/>
                <Route path='/changelog' element={<ChangeLogPage/>} />
                <Route path='/terms' element={<Terms/>} />
                <Route path='/privacy' element={<Privacy/>} />
                <Route path='/cookie' element={<Cookie/>} />
                <Route path='/blog' element={<BlogPage/>} />
                <Route path='/post/:id' element={<SingleBlogPost/>} />
                <Route path='/forgot-password' element={<ForgotPasswordPage/>} />
                <Route path='/reset-password/new-password' element={<ChangePasswordPage/>} />
                <Route path='/verify-user/:id/verify/:token' element={<VerifyEmail/>} />
                {
                    userObject ? (
                        <>
                            {userObject.isAdmin ? <Route path='/admin-users' element={<AdminPageUsers/>}/> : null}
                            {userObject.isAdmin ? <Route path='/admin-blogs' element={<AdminPageBlogs/>}/> : null}
                            {userObject.isAdmin ? <Route path='/admin-sources' element={<AdminPageSourcePage/>}/> : null}
                            {userObject.isAdmin ? <Route path='/admin-connect' element={<AdminPageConnect/>}/> : null}
                            {userObject.isAdmin ? <Route path='/admin-connect-bug' element={<AdminPageBug/>}/> : null}
                            {userObject.isAdmin ? <Route path='/admin-update-blog/:id' element={<UpdateBlog/>}/> : null}
                            {userObject.isAdmin ? <Route path='/admin-update-source/:id' element={<UpdateSource/>}/> : null}
                            {userObject.isAdmin ? <Route path='/admin-change-logs' element={<AdminPageChangeLogs/>}/> : null}
                            {userObject.isAdmin ? <Route path='/admin-create-change-log' element={<CreateChangeLogPage/>}/> : null}
                            {userObject.isAdmin ? <Route path='/admin-update-change-log/:id' element={<UpdateChangeLog/>}/> : null}
                            {userObject.isAdmin ? <Route path='/admin-create-blog' element={<CreateBlogPage/>}/> : null}
                            {userObject.isAdmin ? <Route path='/admin-create-source' element={<CreateSources/>}/> : null}
                            <Route path='/profile' element={<Profile/>} />
                            <Route path='/home' element={<UserHomePage/>} />
                            <Route path='/stripe/success' element={<StripeSuccess/>} />
                            <Route path='/stripe/cancel' element={<StripeCancel/>} />
                        </>
                    ) : (
                        <>

                            <Route path='/login' element={<LoginPage/>} />
                            <Route path='/register' element={<RegisterPage/>} />

                        </>
                    )
                }
            </Routes>
        </BrowserRouter>
    );
}

export default App;

