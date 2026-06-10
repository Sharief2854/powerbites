
//import './App.css'

import { Box } from "@mui/material"
import Register from "./pages/Common/Register"
import Login from "./pages/Common/Login"
import { PrimaryButton } from "./Components/StyledComponents/Buttons"
import { InputText } from "./Components/StyledComponents/FormFields"


function App() {

  return (
    <Box>
      <Register/>
      <Login/>
      <PrimaryButton>highlight</PrimaryButton>
      <InputText label="name" variant="outlined"/>
    </Box>
  )
}

export default App
