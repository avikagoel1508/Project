import { useState } from "react"
import Mood from "./mood"
function Welcome(){
    
    const[currscreen, setcurrscreen]=useState("Welcome")
    return(
        currscreen==="Mood"?<Mood/>:
        <div>
          <h1>Welcome to the Mood Galaxy</h1><br />
          <p>The universe listens differently to every heart.</p>
          <p>How you're feeling will shape the galaxy you enter.</p>
          <button type="submit" id="btn" onClick={()=>{setcurrscreen("Mood")}}>Enter the Galaxy</button>
          
          <p>Put on your headphones for the best experience</p>
          
        </div>
       
       
    )
     
}
export default Welcome