import { Link } from "@inertiajs/react";
import React, { useEffect } from "react";

const Hero = () => {
    const sliderImages = [
        `/landing/images/hero_slider1.jpg`,
        `/landing/images/hero_slider2.jpg`,
        `/landing/images/hero_slider3.jpg`,
    ];

    useEffect(() => {
        // Tunggu jQuery dan OwlCarousel tersedia
        if (window.$ && $(".home_slider").length) {
            $(".home_slider").owlCarousel("destroy"); // optional: reset sebelumnya
            $(".home_slider").owlCarousel({
                items: 1,
                loop: true,
                autoplay: true,
                autoplayTimeout: 5000,
                dots: false,
                animateOut: "fadeOut",
                animateIn: "fadeIn",
            });
        }
    }, []);

    return (
        <div className="home">
            <div className="home_slider_container">
                <div className="owl-carousel owl-theme home_slider">
                    {sliderImages.map((image, index) => (
                        <div className="owl-item" key={index}>
                            <div
                                className="home_slider_background"
                                style={{
                                    backgroundImage: `url(${image})`,
                                    backgroundSize: "cover",
                                    backgroundPosition: "center",
                                    backgroundRepeat: "no-repeat",
                                    width: "100%",
                                    height: "100vh",
                                }}
                            />
                            <div className="home_slider_content">
                                <div className="container position-relative z-index-1">
                                    <div className="row justify-content-center">
                                        <div className="col-lg-8 col-md-10 text-center">
                                            <div className="slider-content">
                                                <div className="school-subtitle text-uppercase mb-2">
                                                    <span className="highlight-text">
                                                        Lia Stephanie Catholic
                                                        School
                                                    </span>
                                                </div>

                                                <h1 className="slider-title mb-4">
                                                    "Becoming Part of the World
                                                    Starts Here"
                                                </h1>

                                                <div className="slider-buttons d-flex flex-wrap justify-content-center mt-5">
                                                    <a
                                                        href="#about"
                                                        className="cta-button cta-primary d-flex align-items-center justify-content-center px-4 py-3 mr-2"
                                                    >
                                                        <span>Read More</span>
                                                    </a>

                                                    <Link
                                                        href="/register"
                                                        className="cta-button cta-secondary d-flex align-items-center justify-content-center px-4 py-3"
                                                    >
                                                        <span>
                                                            Register Now
                                                        </span>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="home_slider_nav home_slider_prev">
                <i className="fa fa-angle-left" aria-hidden="true" />
            </div>
            <div className="home_slider_nav home_slider_next">
                <i className="fa fa-angle-right" aria-hidden="true" />
            </div>
        </div>
    );
};

export default Hero;
