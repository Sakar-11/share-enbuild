import React, { useState } from "react";
import useStyles from "./DrawerStyle";
import {
  CssBaseline,
  Toolbar,
  List,
  ListItem,
  ListItemIcon,
  Divider,
  SwipeableDrawer,
} from "@material-ui/core";
import { Link as ScrollLink } from "react-scroll";
import { connect } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { drawerDataUtil } from "./DrawerData";
import DrawerItemWithContent from "./DrawerItemWithContent";

function ClippedDrawer(props) {
  const classes = useStyles();

  const [isOpen, setIsOpen] = useState(false);
  const [drawerItems, setDrawerItems] = useState(() => {
    const role = global.config.secureStorage.getItem("role");
    return drawerDataUtil(role);
  });
  const his = useHistory();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <SwipeableDrawer
        anchor="left"
        className={classes.drawer}
        variant="temporary"
        open={props.isOpen}
        classes={{
          paper: classes.drawerPaper,
        }}
        onOpen={() => {
          props.toggleDrawer();
        }}
        onClose={() => {
          props.toggleDrawer();
        }}
      >
        <Toolbar />
        <List className={classes.drawerContainer}>
          {drawerItems.map((item, index) => {
            return (
              <>
                {his.location.pathname !== "/" ? (
                  <>
                    {item.content ? (
                      <DrawerItemWithContent
                        item={item}
                        toggleDrawer={props.toggleDrawer}
                      />
                    ) : (
                      <Link
                        to={item.route}
                        style={{ textDecoration: "none" }}
                        key={item.name}
                      >
                        <ListItem button onClick={props.toggleDrawer}>
                          <ListItemIcon>{item.icon}</ListItemIcon>
                          <span className={classes.linkDrawer}>
                            {item.name}
                          </span>
                        </ListItem>
                      </Link>
                    )}
                  </>
                ) : (
                  <>
                    {item.content ? (
                      <DrawerItemWithContent
                        item={item}
                        toggleDrawer={props.toggleDrawer}
                      />
                    ) : (
                      <ScrollLink
                        spy={true}
                        smooth={true}
                        to={item.route}
                        style={{ textDecoration: "none" }}
                        key={item.name}
                      >
                        <ListItem button onClick={props.toggleDrawer}>
                          <ListItemIcon>{item.icon}</ListItemIcon>
                          <span className={classes.linkDrawer}>
                            {item.name}
                          </span>
                        </ListItem>
                      </ScrollLink>
                    )}
                  </>
                )}
              </>
            );
          })}
        </List>
        <Divider />
      </SwipeableDrawer>
    </div>
  );
}

const mapStateToProps = state => {
  return {};
};

export default connect(mapStateToProps, {})(ClippedDrawer);
