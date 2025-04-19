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
                animateOut: 'fadeOut',
                animateIn: 'fadeIn',
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
                                <div className="container">
                                    <div className="row">
                                        <div className="col text-center">
                                            <div className="home_slider_title text-primary bg-light">
                                                Welcome To Website
                                                <div className="home_slider_subtitle text-uppercase bg-light pb-2">
                                                    Lia Stephanie Catholic School
                                                </div>
                                            </div>
                                            <div className="home_slider_form_container">
                                                <div className="home_search_form d-flex flex-lg-row flex-column align-items-center justify-content-center">
                                                    <a
                                                        href="#about"
                                                        className="home_search_button d-flex align-items-center justify-content-center p-3 mb-2 mb-lg-0"
                                                    >
                                                        Read More
                                                    </a>
                                                    <Link
                                                        href="/register"
                                                        className="home_register_button d-flex align-items-center justify-content-center p-3 ml-3"
                                                    >
                                                        Register Here
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
