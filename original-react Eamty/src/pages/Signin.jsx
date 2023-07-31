import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ToastError, ToastSuccess, base } from '../components/SmallCom';
import Loading from '../components/Loading';

const Signin = () => {
    const [status, setStatus]=useState(true)
    const location = useLocation();
    let from = location.state?.from?.pathname || "/";
    const navigate = useNavigate();
    const [members, setMembers] = useState([]);
    const [load, setLoad]=useState(false)
    const [pRefresh, setPRefresh]=useState(false)

    useEffect(() => {
      const user = localStorage.getItem("ecomuser");
      // console.log("from", from);
      if (user) {
        navigate(from, { replace: true });
      }
    }, [from, navigate]);

    useEffect(() => {
      axios
        .get(`${base}/member`)
        .then(function (response) {
          console.log("re", response.data);
          setMembers(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    }, [pRefresh]);
    // if( pRefresh){
    //   return <Loading/>
    // }

    console.log("members", members );

    const login = (e) => {
      e.preventDefault();
      const t = e.target;
        const checkingMember = members.find(
          (m) => m.email == t.email.value && m.password == t.password.value
        );
        if (checkingMember) {
          localStorage.setItem("ecomuser", JSON.stringify(checkingMember));
          //  setRefresh(!refresh)

          navigate('/'); 
        } else {
          ToastError("User not found")
        }


    };


    const signup = (e) => {
      e.preventDefault();
      setLoad(true)
      const t = e.target;

      const existing = members.find((m) => m.email == t.email.value);
      console.log("exist", existing);
      if (existing) {
       ToastError("This email already used")
        return;
      }
      const body = {
        name:t.name.value,
        email: t.email.value,
        password: t.password.value,
        role: t.account_type.value,

      };
      axios
      .post(`${base}/member`, body)
      .then(function (response) {
        // localStorage.setItem("bloodUserData", JSON.stringify(body));
        // setRefresh(!refresh);
        // navigate(from, { replace: true });
        setPRefresh(!pRefresh)
        ToastSuccess("Successfully created")
        setLoad(false)
        console.log(response?.data);
      })
      .catch(function (error) {
        console.log(error);
        setLoad(false)
        ToastError(error?.message)
      });


    };


    return (
        <div>
            <div className='signInDiv'>
                <div className='signInSub'>
                   {
                    status ?
                    <form className='signForm' onSubmit={login}>
                    <h4>Login Here</h4>
                  <div className='inputDiv'>
                  <label htmlFor="">Email</label> <br />
                    <input type="email" name="email" id="" required  />
                  </div>
                  <div className='inputDiv'>
                  <label htmlFor="">Password</label> <br />
                    <input type="text" name="password" id="" required  />
                  </div>
                  <button className='loginBtn' type='submit' >Login</button>
                  <p className='optionLogin'>Don't have account ? <button onClick={()=>setStatus(false)} className='simpleLogin'>Sign up </button></p>
                </form>
                :
                <form className='signForm' onSubmit={signup}>
                <h4>Sign Up Here</h4>
              <div className='inputDiv'>
              <label htmlFor="">Name</label> <br />
                <input type="text" name="name" id="" required  />
              </div>

              <div className='inputDiv'>
              <label htmlFor="">Email</label> <br />
                <input type="email" name="email" id="" required  />
              </div>
              <div className='inputDiv'>
              <label htmlFor="">Password</label> <br />
                <input type="text" name="password" id="" required  />
              </div>
              <div className='inputDiv'>
              <label htmlFor="">Account Type</label> <br />
               <select name="account_type" id="" defaultValue="retailer">
                <option value="retailer">Retailer</option>
                <option value="whole_seller">Whole Seller</option>
               </select>
              </div>
              <button className='loginBtn' type='submit'>Sign up</button>
              <p className='optionLogin'>Already have account ? <button onClick={()=>setStatus(true)} className='simpleLogin'>Login </button></p>
            </form>
                   }


                </div>
            </div>

        </div>
    );
};

export default Signin;
