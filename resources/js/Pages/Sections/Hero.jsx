import React from "react";

const Hero = () => {
    const sliderImages = [
        `/landing/images/home_slider_1.jpg`,
        `/landing/images/course_image.jpg`,
        `/landing/images/about_1.jpg`,
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
                                                    Selamat Datang di
                                                </div>
                                                <div className="home_slider_subtitle">
                                                    Website Sekolah
                                                </div>
                                                <div className="home_slider_form_container">
                                                    <div
                                                        className="home_search_form d-flex flex-lg-row flex-column align-items-center justify-content-center"
                                                    >
                                                        <a
                                                            href="#"
                                                            className="home_search_button d-flex align-items-center justify-content-center text-white p-3"
                                                        >
                                                            Lihat Selengkapnya
                                                        </a>
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
