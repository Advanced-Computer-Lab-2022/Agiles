import style from "./Thumbnail.module.css"
const Thumbnail = () => {
    return ( <section className={style["main"]}>
      <section className={style["container"]}>
      <label>Lets</label>
          <h1>
          E-learning
          </h1>
          <label>at your home</label>
          <div  className={style["container-signUp"]}>
            <button className={style["container-signUp-1"]} onClick={()=>window.location.href="/signup"}>Sign up</button>
            <button className={style["container-signUp-2"]} onClick={()=>window.location.href="/login"}>Log in</button>
          </div>
      </section>
          

    </section>)
}
 
export default Thumbnail;