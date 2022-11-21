import slide1 from '../Images/slide1.jpg';
import slide2 from '../Images/slide2.jpg';
import slide3 from '../Images/slide3.jpg';

export const Carousel = () => {
    return (
        <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel" style={{ height: "25%" }}>
            <div className="carousel-indicators">
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
            </div>
            <div className="carousel-inner">
                <div className="carousel-item active">
                    <img src={slide1} className="d-block w-100" alt="..." style={{ height: "500px", opacity: "0.8" }} />
                    <div className="carousel-caption d-none d-md-block" >
                        <h5 style={{ color: "black" }}>Best Burgers In Entire World</h5>
                    </div>
                </div>
                <div className="carousel-item">
                    <img src={slide2} className="d-block w-100" alt="..." style={{ height: "500px", opacity: "0.8" }} />
                    <div className="carousel-caption d-none d-md-block">
                        <h5 style={{ color: "black" }}>Best Pizza's in Italy</h5>
                    </div>
                </div>
                <div className="carousel-item">
                    <img src={slide3} className="d-block w-100" alt="..." style={{ height: "500px", opacity: "0.8" }} />
                    <div className="carousel-caption d-none d-md-block">
                        <h5 style={{ color: "black" }}>Best Pasta's in India</h5>
                    </div>
                </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
    )
}