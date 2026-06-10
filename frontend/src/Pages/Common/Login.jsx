import {useState} from 'react'
import{ useNavigate } from 'react-router-dom'
import { Box, Button } from '@mui/material'

function Login(){
  const[email,setEmail] = useState()
  const[password,setPassword] = useState()
  const navigate = useNavigate()



  const handleSubmit = (e)=>{
    e.preventDefault()
    
  }
  if(email === "admin@gmail.com" && password === "admin123"){
    console.log("Login successful");
  } else {
    console.log("Invalid credentials");
  }
  return(
    <Box sx={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',height:'100vh'}}>
      <h1>Login</h1>
      <form >
        <input type="email" placeholder='Email' value={email} onChange={(e)=>setEmail(e.target.value)}/>
        <input type="password" placeholder='Password' value={password} onChange={(e)=>setPassword(e.target.value)}/>
        <button type='submit' onClick={handleSubmit}>Login</button>
      </form>
      <Button variant='contained' color='primary' onClick={()=>navigate('/ForgetPassword')}>Forgot Password?</Button>
      <Button variant='contained' color='primary' onClick={()=>navigate('/Register')}>Register</Button>
    </Box>

  )
}

export default Login