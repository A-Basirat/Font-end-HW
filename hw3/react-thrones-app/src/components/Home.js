import React from "react";
import "../views/Home.css";

const Home = () => {
  return (
    <div className="home">
      <div className="container">
      <h1 className="home-title">Game of Thrones</h1>
      <p className="home-text">
        Welcome to the React Thrones App! This application allows you to search
        for your favorite characters from the "Game of Thrones" series and view
        their information. You can also see a chart of the characters from each
        house.
      </p>
      <p className="home-text">
        Use the navigation bar at the top of the page to navigate between the
        Home, Search, and Houses sections of the app.
      </p>
      </div>
    </div>
  );
};

export default Home;
