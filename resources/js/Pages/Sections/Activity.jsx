import { Link } from "@inertiajs/react";
import React, { useEffect, useState } from "react";
import useApi from "../../Hooks/response";

const Activity = () => {
    const {
        data: datas,
        loading,
        error,
        get: getDatas,
    } = useApi("getDataHome");

    const [activities, setActivities] = useState([]);
    const [carouselInitialized, setCarouselInitialized] = useState(false);

    useEffect(() => {
        getDatas();
    }, []);

    useEffect(() => {
        if (datas?.activities) {
            setActivities(datas.activities);
        }
    }, [datas]);

    useEffect(() => {
        if (activities.length > 0 && !carouselInitialized) {
            initActivitySlider();
            setCarouselInitialized(true);
        }
    }, [activities, carouselInitialized]);

    const handleRefresh = () => {
        getDatas();
    };

    const initActivitySlider = () => {
        if ($(".feature_slider").length) {
            $(".feature_slider").trigger("destroy.owl.carousel");

            const activitySlider = $(".feature_slider").owlCarousel({
                loop: activities.length > 4,
                autoplay: activities.length > 4,
                autoplayTimeout: 2000,
                dots: false,
                smartSpeed: 1200,
                center: activities.length === 1,
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
                    activitySlider.trigger("prev.owl.carousel");
                });

            $(".feature_slider_next")
                .off("click")
                .on("click", function () {
                    activitySlider.trigger("next.owl.carousel");
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
        <>
            <div className="courses">
                <div
                    className="section_background parallax-window"
                    loading="lazy"
                    style={{
                        backgroundImage: `url('/landing/images/courses_background.jpg')`,
                        backgroundAttachment: "fixed",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                />
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <div className="section_title_container text-center">
                                <h2 className="section_title">
                                    Our Activities
                                </h2>
                                <div className="section_subtitle">
                                    <p>
                                        The following are activities at our
                                        school
                                    </p>
                                </div>
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
                    ) : activities && activities.length > 0 ? (
                        <>
                            <div className={`feature_slider-container position-relative ${activities.length === 1 ? 'single-item' : ''}`}>
                                <div className="owl-carousel owl-theme feature_slider">
                                    {activities.map((activity) => (
                                        <div className="owl-item" key={activity.id}>
                                            <Link href={`/story?activityId=${encodeURIComponent(activity.id)}`}>
                                                <div className="card feature-card h-100 border-0 shadow-sm mx-2">
                                                    <div className="card-body text-center p-4">
                                                        <div className="feature-image mb-4">
                                                            <img
                                                                src={
                                                                    activity.image
                                                                        ? `/storage/${activity.image}`
                                                                        : "/img/logo.png"
                                                                }
                                                                alt={activity.label}
                                                                loading="lazy"
                                                                style={{ width: "auto", height: "250px", objectFit: "cover" }}
                                                            />
                                                        </div>
                                                        <h3 className="feature-title h5 mb-3">
                                                            {activity.label}
                                                        </h3>
                                                        <p className="feature-text mb-0">
                                                            {activity.description}
                                                        </p>
                                                    </div>
                                                </div>
                                            </Link>
                                        </div>
                                    ))}
                                </div>

                                {activities.length > 4 && (
                                    <>
                                        <div className="feature_slider_nav feature_slider_prev d-none d-lg-block">
                                            <i
                                                className="fa fa-angle-left"
                                                aria-hidden="true"
                                            />
                                        </div>
                                        <div className="feature_slider_nav feature_slider_next d-none d-lg-block">
                                            <i
                                                className="fa fa-angle-right"
                                                aria-hidden="true"
                                            />
                                        </div>
                                    </>
                                )}
                            </div>
                            <div className="row">
                                <div className="col-lg-12 text-center">
                                    <div className="courses_button trans_200">
                                        <Link href="/story">
                                            view all activities
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="row">
                            <div className="col-12 text-center py-5">
                                <div className="alert alert-secondary">
                                    <h3>No activity available.</h3>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default Activity;
