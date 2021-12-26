import React, {useState} from 'react'
import LoginForm from './pages/LogIn'
import Admin from './pages/Admin'


function App() {

  const adminUser = {
    email:"admin",
    password:"admin",
  }

  const [user,setUser]=useState({name:"",email:""});
  const [error,setError]=useState("");


  const Login = details =>{
    // console.log(details);
    if(details.email===adminUser.email && details.password===adminUser.password){
      console.log("Logged In");
      setUser({
        email:details.email,
        password:details.password
      });
      
    }else{
      console.log("Error while logging in");
      setError("Error while logging, either email or password is wrong")
     
    }
  }
  const Logout = () =>{
    console.log("Log out");
    setUser({email:"",password:""});
  }
  return (
    <>   
        {(user.email !== "")?(
        <div>            
            <Admin name ={user.email} Logout={Logout}/>
         
        </div>
      ):(<LoginForm Login={Login} error={error}/>)}
     
    </>
  );
}

export default App;
