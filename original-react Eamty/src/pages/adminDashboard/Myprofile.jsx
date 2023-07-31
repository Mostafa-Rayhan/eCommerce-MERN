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
import { base } from "../../components/SmallCom";
import Avatar from '@mui/material/Avatar';

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const Myprofile = () => {
  const [value, setValue] = React.useState("1");
  const [orders, setOrders] = useState([]);
  const [ordersA, setOrdersA] = useState([]);
  const [ordersD, setOrdersD] = useState([]);
  const [ordersC, setOrdersC] = useState([]);
  const [user, setUser] = React.useState();

  React.useEffect(() => {
    if (localStorage.getItem("ecomuser")) {
      let cUser = JSON.parse(localStorage.getItem("ecomuser"));
      setUser(cUser);
    }
  }, []);

  useEffect(() => {
    if (user) {
      axios
        .get(`${base}/order/${user?.email}`)
        .then(function (response) {
          // console.log("re", response)
          setOrders(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }, [user]);
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
                {/* <TableCell align="right">Status</TableCell> */}
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
          <TabPanel value="2">{pending(ordersD)}</TabPanel>
          <TabPanel value="3">{pending(ordersC)}</TabPanel>
        </TabContext>
      </Box>
    </div>
  );
};

export default Myprofile;
