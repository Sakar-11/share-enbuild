import React, { Component } from "react";
import { Typography, Divider } from "@material-ui/core";

class Support extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <div className="container mt-2">
                <Typography
                    className="mt-3 ml-3"
                    style={{ fontSize: "2rem", marginBottom: "0.5rem" }}
                    variant="h1"
                >
                    Dakshconstruction
                </Typography>
                <Divider />
                <Typography
                    className="ml-3 mt-3"
                    style={{ fontSize: "1.25rem" }}
                    variant="body1"
                >
                    <b>Email:</b>{" "}
                    <a href="mailto:Dakshconstruction76@gmail.com">
                        {" "}
                        Dakshconstruction76@gmail.com{" "}
                    </a>
                </Typography>
            </div>
        );
    }
}

export default Support;
