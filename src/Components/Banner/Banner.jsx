import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

const Banner = () => {
    return (
        <Carousel>
            <div>
                <img src="https://i.ibb.co/Bwj1xD3/Liceria-Co.png" />
            </div>
            <div>
                <img src="https://i.ibb.co/6FMwyVv/Neutron-LTD.png" />
            </div>
            <div>
                <img src="https://i.ibb.co/26qqqkQ/Liceria-Co-1.png" />
            </div>
        </Carousel>
    );
};

export default Banner;