import React, { Component } from "react";
import {
  Typography,
  Grid,
  Card,
  CardContent,
  Checkbox,
} from "@material-ui/core";
import Loading from "../../Loading";

class DisplayChecklist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      allCheckLists: [0, 1, 2, 3, 4],
    };
  }
  componentDidMount() {
    this.setState({
      loading: !this.state.loading,
    });
  }
  handleCheckBox = (event, index) => {};
  render() {
    return (
      <div>
        <div className="d-flex justify-content-center my-2">
          <Typography variant="h4">Checklists</Typography>
        </div>
        <div className="container mt-1">
          {this.state.loading ? (
            <Loading loading={this.state.loading} />
          ) : (
            this.state.allCheckLists.map((data, index) => {
              return (
                <Card
                  style={{
                    boxShadow: "0 2px 4px rgb(179, 179, 179)",
                  }}
                  className="mb-2"
                  variant="outlined"
                  key={index}
                >
                  <CardContent>
                    <Grid
                      container
                      justify="space-between"
                      alignItems="center"
                      direction="row"
                    >
                      <Grid item>
                        <Typography variant="h5" component="h2" noWrap>
                          {data}
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Checkbox
                          onChange={event => this.handleCheckBox(event, index)}
                        />
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              );
            })
          )}
        </div>
      </div>
    );
  }
}

export default DisplayChecklist;
