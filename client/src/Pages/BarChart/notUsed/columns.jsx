const columns = [
  {
    name: "activity",
    label: "Activity",
    options: {
      setCellHeaderProps: () => {
        return { style: style };
      },
      display: "true",
      filter: false
    }
  },
  {
    name: "startdate",
    label: "Start date",
    options: {
      setCellHeaderProps: () => {
        return { style: style };
      },
      customBodyRender: (value, tableMeta, updateValue) => {
        return (
          <div style={{ display: "flex", alignItems: "center" }}>
            <MuiPickersUtilsProvider utils={DateFnsUtils} key={tableMeta}>
              <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="MM/dd/yyyy"
                margin="normal"
                id="date-picker-inline"
                value={value}
                onChange={date => {
                  handleStartDate(tableMeta.rowIndex, date);
                }}
                KeyboardButtonProps={{
                  "aria-label": "change date"
                }}
              />
            </MuiPickersUtilsProvider>
          </div>
        );
      },
      display: "true",
      filter: false
    }
  },
  {
    name: "enddate",
    label: "End date",
    options: {
      setCellHeaderProps: () => {
        return { style: style };
      },
      customBodyRender: (value, tableMeta, updateValue) => {
        
        return (
          <div style={{ display: "flex", alignItems: "center" }}>
            <MuiPickersUtilsProvider utils={DateFnsUtils} key={tableMeta}>
              <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="MM/dd/yyyy"
                margin="normal"
                id="date-picker-inline"
                value={value}
                onChange={date => {
                  handleEndDate(tableMeta.rowIndex, date);
                }}
                KeyboardButtonProps={{
                  "aria-label": "change date"
                }}
              />
            </MuiPickersUtilsProvider>
          </div>
        );
      },
      display: "true",
      filter: false
    }
  }
];
