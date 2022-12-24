import  { useState, useEffect } from 'react';
import axios from 'axios';
import LoadingScreen from "react-loading-screen";
import spinner from "../../static/download.gif";
import style from "./Profile.module.css";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
const profitURL = "/instructor/profit"
const Wallet = () => {
    const [wallet, setWallet] = useState(null);
    const [isloading, setIsLoading] = useState(false);
    const [pastWallet , setPastWallet] = useState([]);
    const [currentWallet , setCurrentWallet] = useState("0.00");
    const currentMonth = new Date().getMonth();
    const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"];      
    const fetchData = async () => {
        setIsLoading(true);
        try{
           const res = await axios.get(profitURL);
           setWallet(res.data);
           setPastWallet(res.data.filter(el=>el.month!=currentMonth));
           if (res.data.length>0){
             setCurrentWallet(res.data?.filter((el=>el.month==currentMonth))[0].amount)
           }
        }
        catch (e){
           console.log(e);
        }
        setIsLoading(false);
    }
    useEffect(()=>{ fetchData(); },[]);
    return (   <>{isloading ? (
        <LoadingScreen loading={true} logoSrc={spinner} />
      ) : (
    <section className={style['mainWallet']}>
        <h1>Ballance</h1>
        <div className={style['currentBalance']}>
          <h2>Your Current Month Balance :</h2>
          <h3>{`USD ${currentWallet}`}</h3>
        </div>
        <div className={style['profit']}>
        <h2>Your Past Months Balance :</h2>
        <TableContainer component={Paper}>
      <Table  size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell >Month</TableCell>
            <TableCell align="right">Balance</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
         {pastWallet.map((row,index) => (
            <TableRow
            key={index}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
            <TableCell component="th" scope="row">
             {monthNames[row.month]}
            </TableCell>
            <TableCell align="right" style={{color:'green'}}>USD {row.amount}</TableCell>
          </TableRow>
         ))}
        </TableBody>
      </Table>
    </TableContainer>
        </div>
    </section>)}
    </>);
}
 
export default Wallet;