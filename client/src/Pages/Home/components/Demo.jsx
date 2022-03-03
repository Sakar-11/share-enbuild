import React from "react";
import ReactPlayer from "react-player";
import { Typography } from "@material-ui/core";

const Demo = () => {
  return (
    <div
      style={{
        backgroundColor: "#f3f5f8",
        paddingBottom: "1.5em",
      }}
    >
      <div style={{ textAlign: "center", marginBottom: 10 }}>
        <div>
          <Typography
            display="block"
            style={{
              fontSize: "2.25em",
              fontFamily: "Courgette",
              paddingBottom: "0.5em",
              paddingLeft: "0.5em",
              paddingRight: "0.5em",
            }}
          >
            <strong>Demo</strong>
          </Typography>
          <hr
            style={{
              width: "75px",
              textAlign: "center",
              height: "3px",
              background: "#2E86AB",
              padding: 0,
              marginTop: 0,
            }}
          />
        </div>
      </div>
      {window.innerWidth > 768 ? (
        <div style={{ paddingBottom: "1.5em" }}>
          <center>
            <ReactPlayer
              url="videos/enbuild.mp4"
              controls={true}
              playing={true}
              width="40%"
              height="20%"
            />
          </center>
        </div>
      ) : (
        <div style={{ paddingBottom: "1.5em" }}>
          <center>
            <ReactPlayer
              url="videos/enbuild.mp4"
              controls={true}
              playing={true}
              width="100%"
              height="100%"
            />
          </center>
        </div>
      )}
    </div>
  );
};
export default Demo;
