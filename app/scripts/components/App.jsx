import React from 'react';
import { green900, green700, yellow200 } from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import MenuBar from './MenuBar';

const theme = getMuiTheme({
  palette: {
    primary1Color: green700,
    primary2Color: green900,
    accent1Color: yellow200
  }
});

const styles = {
  content: {
    padding: 30
  }
};

class App extends React.Component {
  render() {
    return (
      <MuiThemeProvider muiTheme={theme}>
        <div>
          <MenuBar />
          <div style={styles.content}>
            {this.props.children}
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
