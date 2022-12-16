import style from "./Sucess.module.css";
import CloseIcon from '@mui/icons-material/Close';
const Cancel = () => {
    return (  <div className={style['container']}>
    <div className={style["card"]}>
<div className={style["cardDiv"]}>
    <CloseIcon className={style['fail']} style={{color:'#a00407'}}/>
</div>
 <h1 style={{color:'#a00407'}}>Fail</h1> 
 <p>Oops payment failed</p>
 <button onClick={()=>window.location.href="/"}  style={{backgroundColor:'#a00407'}}>Go to home</button>
</div>
</div>);
}
 
export default Cancel;