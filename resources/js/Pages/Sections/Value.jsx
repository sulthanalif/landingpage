import React, { useEffect, useState } from "react";
import useApi from "../../Hooks/response";

const Value = () => {
    const {
        data: datas,
        loading,
        error,
        get: getDatas,
    } = useApi("getDataHome");

    const [features, setFeatures] = useState([]);
    const [carouselInitialized, setCarouselInitialized] = useState(false);

    useEffect(() => {
        getDatas();
    }, []);

    useEffect(() => {
        if (datas?.wcus) {
            setFeatures(datas.wcus);
        }
    }, [datas]);

    useEffect(() => {
        if (features.length > 0 && !carouselInitialized) {
            initFeatureSlider();
            setCarouselInitialized(true);
        }
    }, [features, carouselInitialized]);

    const handleRefresh = () => {
        getDatas();
    };

    const initFeatureSlider = () => {
        if ($(".feature_slider").length) {
            $(".feature_slider").trigger("destroy.owl.carousel");

            const featureSlider = $(".feature_slider").owlCarousel({
                loop: features.length > 4,
                autoplay: features.length > 4,
                autoplayTimeout: 5000,
                dots: false,
                smartSpeed: 1200,
                center: features.length === 1,
                responsive: {
                    0: {
                        items: 1,
                    },
                    576: {
                        items: 2,
                    },
                    992: {
                        items: 3,
                    },
                    1200: {
                        items: 4,
                    },
                },
            });

            $(".feature_slider_prev")
                .off("click")
                .on("click", function () {
                    featureSlider.trigger("prev.owl.carousel");
                });

            $(".feature_slider_next")
                .off("click")
                .on("click", function () {
                    featureSlider.trigger("next.owl.carousel");
                });
        }
    };

    useEffect(() => {
        return () => {
            if (window.$ && $(".feature_slider").length) {
                $(".feature_slider").trigger("destroy.owl.carousel");
                $(".feature_slider_prev, .feature_slider_next").off("click");
            }
        };
    }, []);

    return (
        <div className="features py-5 bg-light">
            <div className="container">
                <div className="row">
                    <div className="col">
                        <div className="section_title_container text-center mb-5">
                            <h2 className="section_title">Why Choose Us?</h2>
                        </div>
                    </div>
                </div>

                {loading ? (
                    <div className="row">
                        <div className="col-12 text-center py-5">
                            <div
                                className="spinner-border text-secondary"
                                role="status"
                            >
                                <span className="sr-only">Loading...</span>
                            </div>
                        </div>
                    </div>
                ) : error ? (
                    <div className="row">
                        <div className="col-12 text-center py-5">
                            <div className="alert alert-danger">
                                {error}
                                <button
                                    onClick={handleRefresh}
                                    className="btn btn-link"
                                >
                                    Try Again
                                </button>
                            </div>
                        </div>
                    </div>
                ) : features && features.length > 0 ? (
                    <div className={`feature_slider-container position-relative ${features.length === 1 ? 'single-item' : ''}`}>
                        <div className="owl-carousel owl-theme feature_slider">
                            {features.map((feature) => (
                                <div className="owl-item" key={feature.id}>
                                    <div className="card feature-card h-100 border-0 shadow-sm mx-2">
                                        <div className="card-body text-center p-4">
                                            <div className="feature-icon mb-4">
                                                <img
                                                    src={feature.icon ? `storage/${feature.icon}` : "/landing/images/icon_value3.png"}
                                                    alt={feature.title}
                                                    loading="lazy"
                                                    className="img-fluid"
                                                    style={{ height: "60px" }}
                                                />
                                            </div>
                                            <h3 className="feature-title h5 mb-3">
                                                {feature.title}
                                            </h3>
                                            <p className="feature-text mb-0">
                                                {feature.description}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {features.length > 4 && (
                            <>
                                <div className="feature_slider_nav feature_slider_prev">
                                    <i
                                        className="fa fa-angle-left"
                                        aria-hidden="true"
                                    />
                                </div>
                                <div className="feature_slider_nav feature_slider_next">
                                    <i
                                        className="fa fa-angle-right"
                                        aria-hidden="true"
                                    />
                                </div>
                            </>
                        )}
                    </div>
                ) : (
                    <div className="row">
                        <div className="col-12 text-center py-5">
                            <div className="alert alert-warning">
                                No values available.
                                <button
                                    onClick={handleRefresh}
                                    className="btn btn-link"
                                >
                                    Refresh
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Value;
