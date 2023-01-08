import style from "./Forbidden.module.css"
const Forbidden = () => {
  return (
    <div>
        <div className={style['header']}>
            <h1>Server Error</h1>
        </div>
        <div className={style['content']}>
          <div className={style['content-container']}>
            <fieldset>
                <h2>401 - Unauthorized: Access is denied due to invalid credentials.</h2>
                <h3>You do not have permission to view this directory or page using the credentials that you supplied.</h3>
            </fieldset>
            </div>

        </div>
    </div>
  );
};

export default Forbidden;
