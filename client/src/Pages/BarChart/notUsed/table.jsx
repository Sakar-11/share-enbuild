import React from "react";
import Item from "../Item";

const Table = props => {
  return (
    <div>
      {props.data.map(item => {
        return <Item name={item[0]} startdate={item[1]} enddate={item[2]} />;
      })}
    </div>
  );
};

export default Table;
