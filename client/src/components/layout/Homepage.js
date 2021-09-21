import Carousel from "react-bootstrap/Carousel"
import Container from "react-bootstrap/Container"
import car from "./images/car.jpg";
import insurance from "./images/insurance.jpg";
import repair from "./images/repair.jpg";
import styled from "styled-components";
const StyledType = styled(Container)`
   background-color: black;
      color: black;
`;
function Homepage() {
    return(
        <StyledType>
    <Carousel fade>
        <Carousel.Item>
            <img
                className="d-block w-100"
                src={car}
                alt="First slide"
            />
            <Carousel.Caption>
                <h3>Cars</h3>
                <p>Add your cars to the registry</p>
            </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
            <img
                className="d-block w-100"
                src={insurance}
                alt="Second slide"
            />
            <Carousel.Caption>
                <h3>Insurances</h3>
                <p>Keep track of all your insurances</p>
            </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
            <img
                className="d-block w-100"
                src={repair}
                alt="Third slide"
            />
            <Carousel.Caption>
                <h3>MOT and repairs</h3>
                <p>Document all tests and repairs</p>
            </Carousel.Caption>
        </Carousel.Item>
    </Carousel>

        </StyledType>
)
}
export default Homepage;