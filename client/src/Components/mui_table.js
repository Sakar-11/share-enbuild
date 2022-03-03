import React from "react";
import MUIDataTable from "mui-datatables";

const options = {
  //Look into onDownload working
  filterType: "checkbox",
  downloadOptions: {
    filterOptions: {
      useDisplayedColumnsOnly: true,
      useDisplayedRowsOnly: true,
    },
  },
};

const OurTable = props => {
  // console.clear();
  // 
  return (
    <MUIDataTable
      title={props.title}
      data={props.data}
      columns={props.columns}
      options={
        props.options === undefined || props.options === null
          ? options
          : props.options
      }
    />
  );
};

export default OurTable;
