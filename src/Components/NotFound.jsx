import "./CSS Files/Global.css"
import { useRouteError } from "react-router-dom";

const NotFound = () => {
    let error = useRouteError();
    console.log(error);
    return (<div className="main">
     <div className="container">
        <br />
     <h1 className="text">OOPS !!!  {error.statusText}
        <br />Please Go To A Valid Url .
        </h1><br />
     <h1 className="errordata">{error.data}</h1><br />
     <h1 className="errorstatus">{error.status}</h1>
     </div>
     
    </div>)
}

export default NotFound;