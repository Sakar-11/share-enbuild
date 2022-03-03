import React, { useState } from "react";
import {
  Collapse,
  ListItemText,
  ListItem,
  ListItemIcon,
  Divider,
  Typography,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { ExpandLess, ExpandMore } from "@material-ui/icons";
import useStyles from "./DrawerStyle";

const DrawerItemWithContent = props => {
  const classes = useStyles();
  const item = props.item;
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);

  const handleClick = () => {
    setOpen(prev => !prev);
  };
  const handleClick2 = () => {
    setOpen2(prev => !prev);
  };

  return (
    <ListItem button style={{ padding: 0, margin: 0, flexDirection: "column" }}>
      <ListItem onClick={handleClick}>
        <ListItemIcon>{item.icon}</ListItemIcon>
        <ListItemText primary={item.name} className={classes.linkDrawer} />
        {open ? <ExpandLess color="primary" /> : <ExpandMore color="primary" />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        {item.content.map(subItem => {
          return subItem.content ? (
            <>
              <ListItem
                button
                onClick={handleClick2}
                className={classes.nested}
              >
                <ListItemIcon>{subItem.icon}</ListItemIcon>
                <ListItemText primary={subItem.name} />
                {open2 ? (
                  <ExpandLess color="primary" />
                ) : (
                  <ExpandMore color="primary" />
                )}
              </ListItem>
              <Collapse in={open2} timeout="auto" unmountOnExit>
                {subItem.content.map(tt => {
                  return (
                    <Link
                      to={tt.route}
                      style={{
                        textDecoration: "none",
                      }}
                      key={tt.name}
                    >
                      <ListItem
                        button
                        onClick={props.toggleDrawer}
                        className={classes.nested2}
                      >
                        <ListItemIcon>{tt.icon}</ListItemIcon>
                        <span className={classes.linkDrawer}>{tt.name}</span>
                      </ListItem>
                    </Link>
                  );
                })}
              </Collapse>
            </>
          ) : (
            <Link
              to={subItem.route}
              style={{
                textDecoration: "none",
              }}
              key={subItem.name}
            >
              <ListItem
                button
                onClick={props.toggleDrawer}
                className={classes.nested}
              >
                <ListItemIcon>{subItem.icon}</ListItemIcon>
                <span className={classes.linkDrawer}>{subItem.name}</span>
              </ListItem>
            </Link>
          );
        })}
        <Divider />
      </Collapse>
    </ListItem>
  );
};

export default DrawerItemWithContent;
