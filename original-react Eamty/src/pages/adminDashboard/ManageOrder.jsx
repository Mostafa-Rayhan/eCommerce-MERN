import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import axios from "axios";
import { ToastError, ToastSuccess, base } from "../../components/SmallCom";
import Avatar from '@mui/material/Avatar';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const ManageOrder = () => {
  const [value, setValue] = React.useState("1");
  const [orders, setOrders] = useState([]);
  const [ordersA, setOrdersA] = useState([]);
  const [ordersD, setOrdersD] = useState([]);
  const [ordersC, setOrdersC] = useState([]);
  const [user, setUser] = React.useState();
  const [pRefresh, setPRefresh]=useState(false)

  React.useEffect(() => {
    if (localStorage.getItem("ecomuser")) {
      let cUser = JSON.parse(localStorage.getItem("ecomuser"));
      setUser(cUser);
    }
  }, []);

  useEffect(() => {
    if (user) {
      console.log("cc", user);
      axios
        .get(`${base}/order/owner/${user.email}`) 
        .then(function (response) {
          console.log("manage", response.data)
          const owned=[]
          const allOrders=response.data
          // allOrders.forEach(s=>{
          //   s?.items?.forEach(so=>{
          //     if(so.owner==user.email){
          //       owned.push({...s})
          //     }
          //   })
          // })

          setOrders(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }, [user, pRefresh]);
  useEffect(() => {
    const filtered = orders?.filter((p) => p.status == "not delivered");
    setOrdersA(filtered);
  }, [orders]);
  useEffect(() => {
    const filtered = orders?.filter((p) => p.status == "delivered");
    setOrdersD(filtered);
  }, [orders]);
  useEffect(() => {
    const filtered = orders?.filter((p) => p.status == "cancelled");
    setOrdersC(filtered);
  }, [orders]);

  console.log("orders", orders);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const getTotalproducts=(row)=>{
    return (
        <>
        {
            row?.items?.map(r=>{
            return(
                <>
                <small style={{fontSize:"1em "}} >{r.product_name} : {r.buyingQuantity}</small> <br />
                </>
            )

            })
        }</>
    )
  }

  const cancel=(row)=>{
    const body={
      status:"cancelled"
    }
    axios
      .patch(`${base}/order/${row._id}`, body)
      .then(function (response) {
        setPRefresh(!pRefresh)
        ToastSuccess("Successfully order cancelled")

        // console.log(response);
      })
      .catch(function (error) {

        ToastError(error?.message)
        console.log(error);

      });

  }
  const approve=(row)=>{
    const body={
      status:"delivered"
    }
    axios
      .patch(`${base}/order/${row._id}`, body)
      .then(function (response) {
        setPRefresh(!pRefresh)
        ToastSuccess("Successfully delivered")

        // console.log(response);
      })
      .catch(function (error) {
        ToastError(error?.message)
        console.log(error);

      });

  }

  const pending = (pro) => {
    return (
      <>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="right">Address</TableCell>
                <TableCell align="right">Products</TableCell>
                <TableCell align="right">Total Price</TableCell>
                <TableCell align="right">Manage</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {pro?.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.first_name} {" "}   {row.last_name}

                  </TableCell>
                  <TableCell align="right">
                    {row.address}, {row.zip_code} <br /> {row.city},
                    {row.country}{" "}
                  </TableCell>
                  <TableCell align="right">
                    {getTotalproducts(row)}
                    </TableCell>
                  <TableCell align="right">{row.total_price}</TableCell>
                  <TableCell align="right">
                    <div className="manageBtns">
                <button onClick={()=>approve(row)}><CheckCircleIcon style={{color:"blue "}}/></button>
                <button onClick={()=>cancel(row)}><CancelIcon style={{color:"#FF5722 "}}/></button>
                    </div>
                    </TableCell>

                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </>
    );
  };
  const others = (pro) => {
    return (
      <>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="right">Address</TableCell>
                <TableCell align="right">Products</TableCell>
                <TableCell align="right">Total Price</TableCell>
                {/* <TableCell align="right">Manage</TableCell> */}
              </TableRow>
            </TableHead>
            <TableBody>
              {pro?.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.first_name} {" "}   {row.last_name}

                  </TableCell>
                  <TableCell align="right">
                    {row.address}, {row.zip_code} <br /> {row.city},
                    {row.country}{" "}
                  </TableCell>
                  <TableCell align="right">
                    {getTotalproducts(row)}
                    </TableCell>
                  <TableCell align="right">{row.total_price}</TableCell>
                  {/* <TableCell align="right">
                    <div className="manageBtns">
                <button onClick={()=>approve(row)}><CheckCircleIcon style={{color:"blue "}}/></button>
                <button onClick={()=>cancel(row)}><CancelIcon style={{color:"#FF5722 "}}/></button>
                    </div>
                    </TableCell> */}

                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </>
    );
  };
  return (
    <div>
      <Box sx={{ width: "100%", typography: "body1" }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="Pending Orders" value="1" />
              <Tab label="Delivered" value="2" />
              <Tab label="Cancelled" value="3" />
            </TabList>
          </Box>
          <TabPanel value="1">{pending(ordersA)}</TabPanel>
          <TabPanel value="2">{others(ordersD)}</TabPanel>
          <TabPanel value="3">{others(ordersC)}</TabPanel>
        </TabContext>
      </Box>
    </div>
  );
};

export default ManageOrder;
