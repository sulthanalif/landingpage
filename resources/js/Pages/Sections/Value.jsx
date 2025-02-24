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
                                    Welcome To Unicat E-Learning
                                </h2>
                                <div className="section_subtitle">
                                    <p>
                                        Lorem ipsum dolor sit amet, consectetur
                                        adipiscing elit. Donec vel gravida arcu.
                                        Vestibulum feugiat, sapien ultrices
                                        fermentum congue, quam velit venenatis
                                        sem
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
                                        src="/landing/images/icon_1.png"
                                        alt=""
                                    />
                                </div>
                                <h3 className="feature_title">The Experts</h3>
                                <div className="feature_text">
                                    <p>
                                        Lorem ipsum dolor sit amet, consectetur
                                        adipiscing elit
                                    </p>
                                </div>
                            </div>
                        </div>
                        {/* Features Item */}
                        <div className="col-lg-3 feature_col">
                            <div className="feature text-center trans_400">
                                <div className="feature_icon">
                                    <img
                                        src="/landing/images/icon_2.png"
                                        alt=""
                                    />
                                </div>
                                <h3 className="feature_title">
                                    Book &amp; Library
                                </h3>
                                <div className="feature_text">
                                    <p>
                                        Lorem ipsum dolor sit amet, consectetur
                                        adipiscing elit
                                    </p>
                                </div>
                            </div>
                        </div>
                        {/* Features Item */}
                        <div className="col-lg-3 feature_col">
                            <div className="feature text-center trans_400">
                                <div className="feature_icon">
                                    <img
                                        src="/landing/images/icon_3.png"
                                        alt=""
                                    />
                                </div>
                                <h3 className="feature_title">Best Courses</h3>
                                <div className="feature_text">
                                    <p>
                                        Lorem ipsum dolor sit amet, consectetur
                                        adipiscing elit
                                    </p>
                                </div>
                            </div>
                        </div>
                        {/* Features Item */}
                        <div className="col-lg-3 feature_col">
                            <div className="feature text-center trans_400">
                                <div className="feature_icon">
                                    <img
                                        src="/landing/images/icon_4.png"
                                        alt=""
                                    />
                                </div>
                                <h3 className="feature_title">
                                    Award &amp; Reward
                                </h3>
                                <div className="feature_text">
                                    <p>
                                        Lorem ipsum dolor sit amet, consectetur
                                        adipiscing elit
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
