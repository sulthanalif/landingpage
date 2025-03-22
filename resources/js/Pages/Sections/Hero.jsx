import { Link } from "@inertiajs/react";
import React from "react";

const Hero = () => {
    const sliderImages = [
        `/landing/images/hero_slider1.jpg`,
        `/landing/images/hero_slider2.jpg`,
        `/landing/images/hero_slider3.jpg`,
    ];

    return (
        <>
            <div className="home">
                <div className="home_slider_container">
                    {/* Home Slider */}
                    <div className="owl-carousel owl-theme home_slider">
                        {sliderImages.map((image, index) => (
                            <div className="owl-item" key={index}>
                                <div
                                    className="home_slider_background"
                                    loading="lazy"
                                    style={{
                                        backgroundImage: `url(${image})`,
                                    }}
                                />
                                <div className="home_slider_content">
                                    <div className="container">
                                        <div className="row">
                                            <div className="col text-center">
                                                <div className="home_slider_title">
                                                    Welcome To Website
                                                </div>
                                                <div className="home_slider_subtitle text-uppercase">
                                                    Lia Stephanie Catholic School
                                                </div>
                                                <div className="home_slider_form_container">
                                                    <div
                                                        className="home_search_form d-flex flex-lg-row flex-column align-items-center justify-content-center"
                                                    >
                                                        <a
                                                            href="#about"
                                                            className="home_search_button d-flex align-items-center justify-content-center p-3"
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

                {/* Home Slider Navigation */}
                <div className="home_slider_nav home_slider_prev">
                    <i className="fa fa-angle-left" aria-hidden="true" />
                </div>
                <div className="home_slider_nav home_slider_next">
                    <i className="fa fa-angle-right" aria-hidden="true" />
                </div>
            </div>
        </>
    );
};

export default Hero;
