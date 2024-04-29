import React, { useState, useEffect } from "react";
import "./Home.css";
import Navbar from "../../component/Navbar/Navbar";
import HeroSection from "../../component/HeroSection/HeroSection";
import Footer from "../../component/Footer/Footer";
import Accordion from "../../component/Accordion/Accordion";
import Navibar from "../../component/Navibar/Navibar";
import PostCard from "../../component/PostCard/PostCard";
import axios from "axios";
import Loading from "../../component/Loading/Loading";

const Home = () => {
  const [postData, setPostData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/posts");
        const data = response.data; // Use response.data directly without calling .json()
        const reversedData = Array.isArray(data.fetchPosts)
          ? data.fetchPosts.reverse()
          : [];
        setPostData(reversedData);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchData();
  }, []);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="HomepageBody">
      <section className="TopLayer">
        <marquee behavior="scroll" direction="left">
          Welcome to InkyNovel Academy. Home of Pen Bearers and Inkers. We are
          here to give support to every writer, and to help them gain
          recognition. Sign up today and start dishing out your amazing contents
          for the whole world to see and enjoy.
        </marquee>
      </section>
      <Navbar />
      <Navibar />
      <HeroSection />
      <PostCard postData={postData} />
      <Accordion />
      <Footer />
    </div>
  );
};

export default Home;
