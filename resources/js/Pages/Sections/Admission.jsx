import React from "react";

const Admission = () => {
    return (
        <>
            <div className="events">
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <div className="section_title_container text-center">
                                <h2 className="section_title">Admission</h2>
                                <div className="section_subtitle">
                                    <p>
                                        We are currently accepting applications
                                        for Elementary- Senior High School for
                                        the new academic year.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row events_row">
                        <div className="col-lg-4 event_col">
                            <div className="event event_left">
                                <div className="event_image">
                                    <img
                                        src="/landing/images/step-1.png"
                                        alt=""
                                        loading="lazy"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-4 event_col">
                            <div className="event event_mid">
                                <div className="event_image">
                                    <img
                                        src="/landing/images/step-2.png"
                                        alt=""
                                        loading="lazy"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-4 event_col">
                            <div className="event event_right">
                                <div className="event_image">
                                    <img
                                        src="/landing/images/step-3.png"
                                        alt=""
                                        loading="lazy"
                                    />
                                </div>
                                {/* <div className="event_body d-flex flex-row align-items-start justify-content-start">
                                    <div className="event_date">
                                        <div className="d-flex flex-column align-items-center justify-content-center trans_200">
                                            <div className="event_day trans_200">
                                                <i className="fa fa-list" />
                                            </div>
                                            <div className="event_month trans_200">
                                                Sep
                                            </div>
                                        </div>
                                    </div>
                                    <div className="event_content">
                                        <div className="event_title">
                                            <a href="#">Return of Form</a>
                                        </div>
                                        <div className="event_info_container">
                                            <div className="event_info">
                                                <i
                                                    className="fa fa-clock-o"
                                                    aria-hidden="true"
                                                />
                                                <span>13.00 - 18.30</span>
                                            </div>
                                            <div className="event_info">
                                                <i
                                                    className="fa fa-map-marker"
                                                    aria-hidden="true"
                                                />
                                                <span>25 New York City</span>
                                            </div>
                                            <div className="event_text">
                                                <p>
                                                    Return of form accompanied
                                                    by payment of initial fee.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Admission;
