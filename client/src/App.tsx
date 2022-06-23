import React from "react"
import "./App.css"
import TableView from "./components/TableView"
import { createTheme, ThemeProvider } from '@mui/material/styles'

const theme = createTheme({
  components: {
    // Name of the component ⚛️
    MuiButtonBase: {
      defaultProps: {
        // The default props to change
        disableRipple: true, // No more ripple, on the whole application 💣!
      },
    }
  }
});

const App: React.FC = () => {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <TableView/>
      </ThemeProvider>
    </div>
  );
}

export default App;
