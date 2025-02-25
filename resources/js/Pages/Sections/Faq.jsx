import React from "react";

const Faq = () => {
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
                    <div className="row courses_row">
                        <div className="col-lg-4">
                            <div className="section_title_container text-center">
                                <h2 className="section_title">
                                    Frequently asked questions
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
                        <div className="col-lg-8">
                            <div className="accordion" id="accordionExample">
                                <div className="course">
                                    <div className="card-header" id="headingOne">
                                        <h3 className="course_title">
                                            <a
                                                href="#"
                                                type="button"
                                                data-toggle="collapse"
                                                data-target="#collapseOne"
                                                aria-expanded="true"
                                                aria-controls="collapseOne"
                                            >
                                                Question 1
                                            </a>
                                        </h3>
                                    </div>

                                    <div
                                        id="collapseOne"
                                        className="collapse show"
                                        aria-labelledby="headingOne"
                                        data-parent="#accordionExample"
                                    >
                                        <div className="card-body">
                                            Some placeholder content for the
                                            first accordion panel. This panel is
                                            shown by default, thanks to the{" "}
                                            <code>.show</code> class.
                                        </div>
                                    </div>
                                </div>
                                <div className="course">
                                    <div className="card-header" id="headingTwo">
                                        <h3 className="course_title">
                                            <a
                                                href="#"
                                                type="button"
                                                data-toggle="collapse"
                                                data-target="#collapseTwo"
                                                aria-expanded="true"
                                                aria-controls="collapseTwo"
                                            >
                                                Question 2
                                            </a>
                                        </h3>
                                    </div>

                                    <div
                                        id="collapseTwo"
                                        className="collapse"
                                        aria-labelledby="headingTwo"
                                        data-parent="#accordionExample"
                                    >
                                        <div className="card-body">
                                            Some placeholder content for the
                                            first accordion panel. This panel is
                                            shown by default, thanks to the{" "}
                                            <code>.show</code> class.
                                        </div>
                                    </div>
                                </div>
                                <div className="course">
                                    <div className="card-header" id="headingThree">
                                        <h3 className="course_title">
                                            <a
                                                href="#"
                                                type="button"
                                                data-toggle="collapse"
                                                data-target="#collapseThree"
                                                aria-expanded="true"
                                                aria-controls="collapseThree"
                                            >
                                                Question 3
                                            </a>
                                        </h3>
                                    </div>

                                    <div
                                        id="collapseThree"
                                        className="collapse"
                                        aria-labelledby="headingThree"
                                        data-parent="#accordionExample"
                                    >
                                        <div className="card-body">
                                            Some placeholder content for the
                                            first accordion panel. This panel is
                                            shown by default, thanks to the{" "}
                                            <code>.show</code> class.
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Faq;
