import React from "react";
import Home from "./pages/Home/Home";
import SignIn from "./pages/SignIn/SignIn";
import LogIn from "./pages/LogIn/LogIn";
import Articles from "./pages/Articles/Articles";
import Story from "./pages/Story/Story";
import NonFiction from "./pages/NonFiction/NonFiction";
import Poetry from "./pages/Poetry/Poetry";
import PenBearers from "./pages/PenBearers/PenBearers";
import Contact from "./pages/ContactUs/ContactUs";
import About from "./pages/AboutUs/AboutUs";
import Sponsorship from "./pages/Sponsorship/Sponsorship";
import CreatePost from "./pages/CreatePost/CreatePost";
import Admin from "./pages/Admin/Admin";
import Dashboard from "./pages/Dashboard/Dashboard";
import SinglePost from "./pages/SinglePost/SinglePost";
import UpdateProfile from "./pages/UpdateProfile/UpdateProfile";
import EditPost from "./pages/EditPost/EditPost";
import UserPosts from "./pages/UserPosts/UserPosts";

import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/register" element={<SignIn />} />
          <Route exact path="/login" element={<LogIn />} />
          <Route exact path="/articles" element={<Articles />} />
          <Route exact path="/stories" element={<Story />} />
          <Route exact path="/non-fiction" element={<NonFiction />} />
          <Route exact path="/poetries" element={<Poetry />} />
          <Route exact path="/pen-bearers" element={<PenBearers />} />
          <Route exact path="/contact-us" element={<Contact />} />
          <Route exact path="/about-us" element={<About />} />
          <Route exact path="/sponsorship" element={<Sponsorship />} />
          <Route exact path="/post-content" element={<CreatePost />} />
          <Route exact path="/admin" element={<Admin />} />
          <Route exact path="/profile/:username" element={<Dashboard />} />
          <Route exact path="/post/edit/:id" element={<EditPost />} />
          <Route exact path="/writer/:userId/posts" element={<UserPosts />} />

          <Route
            exact
            path="/profile/edit/:username"
            element={<UpdateProfile />}
          />
          <Route exact path="/contents/:id" element={<SinglePost />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
