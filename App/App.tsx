import { BrowserRouter } from "react-router-dom";
import PageLayout from './components/PageLayout'
import { Box, CssBaseline } from '@mui/material';

const App = () => {
  return (
    <Box>
      <CssBaseline />
      <BrowserRouter>
        <PageLayout />
      </BrowserRouter>
    </Box>
  )
}

export default App;