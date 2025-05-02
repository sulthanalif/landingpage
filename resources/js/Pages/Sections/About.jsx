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
                                        At Lia Stephanie, we believe that
                                        education is not just about academic
                                        scores, but also about shaping
                                        character, building self-confidence, and
                                        preparing a resilient and moral future
                                        generation.
                                    </p>
                                    <p>
                                        With an integrated curriculum,
                                        experienced educators, and a comfortable
                                        and safe learning environment, we are
                                        committed to providing the best
                                        education for every child.
                                    </p>
                                    <p>
                                        At Lia Stephanie, we offer educational
                                        programs that are comprehensively
                                        designed to support the academic,
                                        emotional, social, and spiritual
                                        development of students. We believe that
                                        every child possesses unique potential
                                        that needs to be nurtured through the
                                        right learning approach, relevant to the
                                        times.
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
