import Carousel from 'react-bootstrap/Carousel';
import A1 from "../static/Technology.png"
import A2 from "../static/A2.png"

const Thumbnail = () => {
    return ( <Carousel >
    <Carousel.Item>
      <img
        className="d-block w-100 "
        style={{height:'30rem'}}
        src={A1}
        alt="First slide"
      />
     
    
     
    </Carousel.Item>
    <Carousel.Item>
      <img
       src={A2}
        className="d-block w-100"
        style={{height:'30rem'}}
        alt="Second slide"
      />
    </Carousel.Item>
  </Carousel> );
}
 
export default Thumbnail;