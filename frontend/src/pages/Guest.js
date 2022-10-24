import {Link} from 'react-router-dom'
import "./Guest.css";

const Guest = () =>{

return(
<div className="guestContainer">



<Link to="/SelectCountry">
<button className="guestButtons">Select Country</button>
</Link>

<Link to="/courses">
<button className="guestButtons">view all courses</button>
</Link>

<Link to="/coursesPrices">
<button className="guestButtons">View the price of each course</button>
</Link>

{/* 



<link>
<button>filter the course based on a subject/rating</button>
</link>

<link>
<button>filter on price</button>
</link>

<link>
<button>search for a course by title or subject or instructor
</button>
</link>

<link>
<button>choose a course from the results and view (but not open) its details
</button>
</link>


<link>
<button>filter on price</button>
</link>
 */}




</div>


);

};
export default Guest;