import { Link } from "@inertiajs/react";
import React from "react";

const About = () => {
    return (
        <>
            <div className="features" id="about">
                <div className="container">
                    <div className="row features_row">
                        <div className="col-lg-6">
                            <img
                                src="/landing/images/about.jpg"
                                alt=""
                                loading="lazy"
                                className="img-fluid mx-auto d-block"
                            />
                        </div>
                        <div className="col-lg-6 feature_col">
                            <div className="feature trans_400">
                                <h2 className="feature_title">
                                    Discover our School
                                </h2>
                                <hr className="feature_line" />
                                <div className="feature_text mt-3 text-justify">
                                    <p>
                                    Along with the global growth, Lia Stephanie School was established to be one of the leading Catholic schools in West Jakarta, with a focus on academic, personal, spiritual, and professional of our students and teachers. With the mission by cultivating our students and bring out the best version of them.
                                    </p>
                                    <Link
                                        href="/about"
                                        className="btn btn-primary mt-3"
                                    >
                                        Read More
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default About;
