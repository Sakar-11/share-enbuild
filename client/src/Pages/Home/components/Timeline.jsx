import { Typography } from "@material-ui/core";
import {
  CodeOutlined,
  EmojiObjectsOutlined,
  LaunchOutlined,
} from "@material-ui/icons";
import React from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";

const Timeline = () => {
  return (
    <VerticalTimeline>
      <VerticalTimelineElement
        className="vertical-timeline-element--work"
        date="2021"
        contentArrowStyle={{ borderRight: "7px solid  #2E86AB" }}
        iconStyle={{ background: "#2E86AB", color: "#fff" }}
        icon={<LaunchOutlined />}
      >
        <Typography
          variant="overline"
          display="block"
          style={{ fontSize: "1.25em" }}
        >
          <strong>Execution</strong>
        </Typography>
        <p style={{ fontSize: "1.15em" }}>
          <ul>
            <li>Product Launched</li>
            <li>Representation Started</li>
            <li>Feedback Taken</li>
          </ul>
        </p>
      </VerticalTimelineElement>
      <VerticalTimelineElement
        className="vertical-timeline-element--work"
        date="2020"
        contentArrowStyle={{ borderRight: "7px solid  #2E86AB" }}
        iconStyle={{ background: "#2E86AB", color: "#fff" }}
        icon={<CodeOutlined />}
      >
        <Typography
          variant="overline"
          display="block"
          style={{ fontSize: "1.25em" }}
        >
          <strong>Research</strong>
        </Typography>
        <p style={{ fontSize: "1.15em" }}>
          Development of app, understanding the need of the market, conducting
          trials, and coming up with feedback.
        </p>
        <Typography
          variant="overline"
          display="block"
          style={{ fontSize: "1.25em", marginTop: "0.5em" }}
        >
          <strong>Implementation</strong>
        </Typography>
        <p style={{ fontSize: "1.15em" }}>
          <ul>
            <li>Establishment of Tech Side</li>
            <li>Testing Betas</li>
            <li>Improvement of the product</li>
          </ul>
        </p>
      </VerticalTimelineElement>

      <VerticalTimelineElement
        className="vertical-timeline-element--work"
        contentArrowStyle={{ borderRight: "7px solid  #2E86AB" }}
        date="2019"
        iconStyle={{ background: "#2E86AB", color: "#fff" }}
        icon={<EmojiObjectsOutlined fontSize="large" />}
      >
        <Typography
          variant="overline"
          display="block"
          style={{ fontSize: "1.25em" }}
        >
          <strong>Thought</strong>
        </Typography>
        <p style={{ fontSize: "1.15em" }}>
          Started facing big-time problem related to managing physical files
          data presentation, data monitoring, duplicity of work, etc.
        </p>
        <Typography
          variant="overline"
          display="block"
          style={{ fontSize: "1.25em", marginTop: "0.5em" }}
        >
          <strong>Idea</strong>
        </Typography>
        <p style={{ fontSize: "1.15em" }}>
          <ul>
            <li>Elimination of physical files</li>
            <li>Developing transparent communication</li>
          </ul>
        </p>
      </VerticalTimelineElement>
    </VerticalTimeline>
  );
};
export default Timeline;
