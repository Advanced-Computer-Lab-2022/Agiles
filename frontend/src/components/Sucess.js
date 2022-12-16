import style from "./Sucess.module.css";
const Sucess = () => {
    return ( 
        <div className={style['container']}>
         <div className={style["card"]} style={{color:'#88B04B'}}>
    <div className={style["cardDiv"]}>
      <i className="checkmark" style={{color:'#88B04B'}}>✓</i>
    </div>
      <h1 style={{color:'#88B04B'}}>Success</h1> 
      <p>Congratulation payment succeded</p>
      <button onClick={()=>window.location.href="/"} style={{backgroundColor:'#466b0d'}}>Go to home</button>
    </div>
    </div>);
}
 
export default Sucess;