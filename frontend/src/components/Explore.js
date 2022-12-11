import Carousel from 'react-bootstrap/Carousel';
import landing1 from "../static/Landing1.jpg"
import style from './Explore.module.css'
const Explore = () => {
  return (
    <Carousel className={style['main']}>
    <Carousel.Item>
      <img
        className="d-block w-100"
        style= {{height:'25rem'}}
        alt="First slide"
      />
      <Carousel.Caption className={style['caption']}>
        <h3>Learning that gets you</h3>
        <p>Skills for your present (and your future). Get started with us.</p>
      </Carousel.Caption>
    </Carousel.Item>
    <Carousel.Item>
      <img
        className="d-block w-100"
        src="holder.js/800x400?text=Second slide&bg=282c34"
        alt="Second slide"
      />

      <Carousel.Caption>
        <h3>Second slide label</h3>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      </Carousel.Caption>
    </Carousel.Item>
    <Carousel.Item>
      <img
        className="d-block w-100"
        src="holder.js/800x400?text=Third slide&bg=20232a"
        alt="Third slide"
      />

      <Carousel.Caption>
        <h3>Third slide label</h3>
        <p>
          Praesent commodo cursus magna, vel scelerisque nisl consectetur.
        </p>
      </Carousel.Caption>
    </Carousel.Item>
  </Carousel>
  );
};

export default Explore;
