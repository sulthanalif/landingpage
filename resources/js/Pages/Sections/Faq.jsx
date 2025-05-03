import React from "react";

const Faq = ({ faqs }) => {
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
                                    Frequently Asked Questions
                                </h2>
                                <div className="section_subtitle">
                                    <p>
                                        Explore our FAQ page to find quick and
                                        comprehensive solutions to common
                                        queries. Get the information you need
                                        effortlessly and make the most of your
                                        experience with us.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-8">
                            <div className="accordion" id="faqAccordion">
                                {faqs && faqs.length > 0 ? (
                                    faqs.map((faq, index) => {
                                        const questionId = `heading${
                                            index + 1
                                        }`;
                                        const answerId = `collapse${index + 1}`;
                                        return (
                                            <div
                                                className="course"
                                                key={faq.id}
                                            >
                                                <div
                                                    className="card-header"
                                                    id={questionId}
                                                >
                                                    <h3 className="course_title">
                                                        <a
                                                            href={`#${answerId}`}
                                                            type="button"
                                                            data-toggle="collapse"
                                                            data-target={`#${answerId}`}
                                                            aria-expanded={
                                                                index === 0
                                                                    ? "true"
                                                                    : "false"
                                                            }
                                                            aria-controls={
                                                                answerId
                                                            }
                                                        >
                                                            {faq.question}
                                                        </a>
                                                    </h3>
                                                </div>
                                                <div
                                                    id={answerId}
                                                    className={`collapse ${
                                                        index === 0
                                                            ? "show"
                                                            : ""
                                                    }`}
                                                    aria-labelledby={questionId}
                                                    data-parent="#faqAccordion"
                                                >
                                                    <div className="card-body">
                                                        {faq.answer}
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })
                                ) : (
                                    <div className="course">
                                        <div className="card-header">
                                            <h3 className="course_title text-center">
                                                There are no questions at this
                                                time
                                            </h3>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Faq;
