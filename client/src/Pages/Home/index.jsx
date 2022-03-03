import React from "react";
import TaglineLoginButton from "./components/TaglineLoginButton";
import Timeline from "./components/Timeline";
import Objective from "./components/Objective";
import Services from "./components/Services";
import Problems from "./components/Problems";
import About from "./components/About";
import Visitor from "./PopUp/Visitor";
import Demo from "./components/Demo";
import Contact from "./components/ContactUs";

const Home = () => {
  return (
    <>
      <div id="user">
        <Visitor />
      </div>
      <TaglineLoginButton />
      <div id="about">
        <About />
      </div>
      <div id="problems">
        <Problems />
      </div>
      <div id="objective">
        <Objective />
      </div>
      <div id="timeline">
        <Timeline />
      </div>
      <div id="services">
        <Services />
      </div>
      <div id="demo">
        <Demo />
      </div>
      <div id="contact">
        <Contact />
      </div>
      <footer
        style={{
          backgroundColor: "#f3f5f8",
          fontSize: "1.25em",
          paddingTop: 10,
          paddingBottom: 10,
        }}
      >
        <strong>
          <center>™ 2021 Daksh Constructions. All Rights Reserved.</center>
        </strong>
      </footer>
    </>
  );
};

export default Home;
