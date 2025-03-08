import React from "react";

const Value = () => {
    return (
        <>
            <div className="features">
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <div className="section_title_container text-center">
                                <h2 className="section_title">Our Values</h2>
                                <div className="section_subtitle">
                                    <p>
                                        Strong beliefs and values are very
                                        important to us.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row features_row">
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
                                    Quality of Education
                                </h3>
                                {/* <div className="feature_text">
                                    <p>
                                        Lorem ipsum dolor sit amet, consectetur
                                        adipiscing elit
                                    </p>
                                </div> */}
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
                                <h3 className="feature_title">Innovation</h3>
                            </div>
                        </div>
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
                                    Integrity & Responsibility
                                </h3>
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
                                <h3 className="feature_title">Spirituality</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Value;
