import React, {Component} from 'react';

import { Container, Box } from '@material-ui/core';
import Search from "components/Search";
import { windowHeight } from "../utils/index.js";

class App extends Component {
  constructor(props) {
    super(props);

    this.windowHeight = windowHeight();
  }
  
  render() {
    return (
      <Box className="page" style={{height: this.windowHeight}}>
        <Container>
          <Box className="page__content">
            <Search />
          </Box>
        </Container>
      </Box>
    )
  }
}

export default App;