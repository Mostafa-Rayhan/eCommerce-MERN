import React from 'react';
import { useNavigate } from 'react-router-dom';

const OrderSuccess = () => {
    const navigate=useNavigate()
    const goHome=()=>{
        navigate('/')
    }
    return (
        <div style={{width:"100%",display:"flex", justifyContent:"center", marginTop:"60px" }}>
          <div>
          <h2>Succesfully order placed</h2>
          <a href='/' style={{backgroundColor:"#D10024", color:"white", fontWeight:"700", padding:"5px 20px", cursor:"pointer", textDecoration:"none"}}>Go to Home</a>
          </div>

        </div>
    );
};

export default OrderSuccess;
