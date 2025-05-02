import React from "react";

const Value = () => {
    return (
        <>
            <div className="features">
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <div className="section_title_container text-center">
                                <h2 className="section_title">
                                    Why Choose Us?
                                </h2>
                                {/* <div className="section_subtitle">
                                    <p>
                                        Strong beliefs and values are very
                                        important to us.
                                    </p>
                                </div> */}
                            </div>
                        </div>
                    </div>
                    <div className="row features_row">
                        {/* Features Item */}
                        <div className="col-lg-3 feature_col">
                            <div className="feature text-center trans_400">
                                <div className="feature_icon">
                                    <img
                                        src="/landing/images/icon_value3.png"
                                        style={{
                                            maxHeight: "50px",
                                            maxWidth: "auto",
                                        }}
                                        alt=""
                                        loading="lazy"
                                    />
                                </div>
                                <h3 className="feature_title">
                                    Holistic and Globally-Minded Curriculum
                                </h3>
                                <div className="feature_text">
                                    <p>
                                        Integrating the national curriculum with
                                        a global perspective and active learning
                                        approaches that foster creativity,
                                        critical thinking, and collaboration.
                                    </p>
                                </div>
                            </div>
                        </div>
                        {/* Features Item */}
                        <div className="col-lg-3 feature_col">
                            <div className="feature text-center trans_400">
                                <div className="feature_icon">
                                    <img
                                        src="/landing/images/icon_value1.png"
                                        style={{
                                            maxHeight: "50px",
                                            maxWidth: "auto",
                                        }}
                                        alt=""
                                        loading="lazy"
                                    />
                                </div>
                                <h3 className="feature_title">
                                    Professional & Caring Teachers
                                </h3>
                                <div className="feature_text">
                                    <p>
                                        Our team of educators are not only
                                        experts in teaching but also present as
                                        mentors who understand the emotional
                                        needs and development of students.
                                    </p>
                                </div>
                            </div>
                        </div>
                        {/* Features Item */}
                        <div className="col-lg-3 feature_col">
                            <div className="feature text-center trans_400">
                                <div className="feature_icon">
                                    <img
                                        src="/landing/images/icon_value2.png"
                                        style={{
                                            maxHeight: "50px",
                                            maxWidth: "auto",
                                        }}
                                        alt=""
                                        loading="lazy"
                                    />
                                </div>
                                <h3 className="feature_title">
                                    Complete Facilities
                                </h3>
                                <div className="feature_text">
                                    <p>
                                        Moving classes, interactive classrooms,
                                        science laboratories, digital libraries,
                                        art rooms, and sports areas—all designed
                                        to support an optimal learning process.
                                    </p>
                                </div>
                            </div>
                        </div>
                        {/* Features Item */}
                        <div className="col-lg-3 feature_col">
                            <div className="feature text-center trans_400">
                                <div className="feature_icon">
                                    <img
                                        src="/landing/images/icon_value4.png"
                                        style={{
                                            maxHeight: "50px",
                                            maxWidth: "auto",
                                        }}
                                        alt=""
                                        loading="lazy"
                                    />
                                </div>
                                <h3 className="feature_title">
                                    Character & Soft Skills Development
                                </h3>
                                <div className="feature_text">
                                    <p>
                                        We instill values of discipline,
                                        empathy, and leadership from an early
                                        age through various school activities.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Value;
