
import { Navigate, useLocation } from "react-router-dom";

const RequireAdmin=({children})=>{

    const data = JSON.parse(localStorage.getItem("ecomuser"));
    console.log("data", data);
    const location=useLocation()
    // if(loading){
    //   return <Loading></Loading>
    // }
    // if(data.role !="admin" ){
    //     const user=localStorage.getItem('ecomuser')

    //         localStorage.removeItem(user);

    //     return <Navigate to='/signin' state={{from: location}} replace></Navigate>
    // }
    return children;
}
export default RequireAdmin; 
