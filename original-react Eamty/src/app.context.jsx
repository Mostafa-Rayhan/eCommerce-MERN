import { createContext, useEffect, useState } from "react";

export const AppContext = createContext({});
export const AppContextProvider = ({ children }) => {
  const [refresh, setRefresh] = useState(true);
  const [carts, setCarts] = useState([]);
  const [cartTotal, setCartTotal]=useState(0)

  const context = {
    refresh,
    setRefresh,
    carts,
    setCarts,
    cartTotal,
    setCartTotal
  };
  useEffect(() => {
    const existData = JSON.parse(localStorage.getItem("eComCart"));
    setCarts(existData);
  }, [refresh]);
  useEffect(() => {
    const existData = JSON.parse(localStorage.getItem("eComCart"));
    let totalAmount=0
    if(Array.isArray(existData) ){
      if(existData.length >0){
        existData.forEach(d=>{
          totalAmount += (d.discounted * d.buyingQuantity)
        })
        setCartTotal(totalAmount)

      }
    }


  }, [refresh, carts]);

  return <AppContext.Provider value={context}>{children}</AppContext.Provider>;
};
