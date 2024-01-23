import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

const Banner = () => {
    return (
        <Carousel>
            <div>
                <img className='' src="https://i.ibb.co/MPVWj54/ba1.jpg" />
            </div>
            <div>
                <img src="https://i.ibb.co/SmZPF24/ba2.jpg" />
            </div>
            <div>
                <img src="https://i.ibb.co/JkbfQWP/ba2.jpg" />
            </div>
        </Carousel>
    );
};

export default Banner;