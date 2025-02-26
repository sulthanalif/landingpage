import React, { useEffect } from "react";
import Layout from "../Components/Layout";
import { Link } from "@inertiajs/react";

const Contact = () => {
    useEffect(() => {
        const link1 = document.createElement("link");
        link1.rel = "stylesheet";
        link1.type = "text/css";
        link1.href = "/landing/styles/contact.css";

        const link2 = document.createElement("link");
        link2.rel = "stylesheet";
        link2.type = "text/css";
        link2.href = "/landing/styles/contact_responsive.css";

        document.head.appendChild(link1);
        document.head.appendChild(link2);

        const script = document.createElement("script");
        script.src = "/landing/js/contact.js";
        script.async = true;

        const script2 = document.createElement("script");
        script2.src = "/landing/plugins/marker_with_label/marker_with_label.js";
        script2.async = true;

        const script3 = document.createElement("script");
        script3.src = "https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyCIwF204lFZg1y4kPSIhKaHEXMLYxxuMhA";
        script3.async = true;

        document.body.appendChild(script);
        document.body.appendChild(script2);
        document.body.appendChild(script3);

        return () => {
            document.head.removeChild(link1);
            document.head.removeChild(link2);
            document.body.removeChild(script);
            document.body.removeChild(script2);
            document.body.removeChild(script3);
        };
    }, []);

    return (
        <>
            <Layout>
                <div className="home">
                    <div className="breadcrumbs_container">
                        <div className="container">
                            <div className="row">
                                <div className="col">
                                    <div className="breadcrumbs">
                                        <ul>
                                            <li>
                                                <Link href="/">Home</Link>
                                            </li>
                                            <li>Contact</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="contact">
                    {/* Contact Map */}
                    <div className="contact_map">
                        {/* Google Map */}
                        <div className="map">
                            <div id="google_map" className="google_map">
                                <div className="map_container">
                                    <div id="map" />
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Contact Info */}
                    <div className="contact_info_container">
                        <div className="container">
                            <div className="row">
                                {/* Contact Form */}
                                <div className="col-lg-6">
                                    <div className="contact_form">
                                        <div className="contact_info_title">
                                            Contact Form
                                        </div>
                                        <form
                                            action="#"
                                            className="comment_form"
                                        >
                                            <div>
                                                <div className="form_title">
                                                    Name
                                                </div>
                                                <input
                                                    type="text"
                                                    className="comment_input"
                                                    required="required"
                                                />
                                            </div>
                                            <div>
                                                <div className="form_title">
                                                    Email
                                                </div>
                                                <input
                                                    type="text"
                                                    className="comment_input"
                                                    required="required"
                                                />
                                            </div>
                                            <div>
                                                <div className="form_title">
                                                    Message
                                                </div>
                                                <textarea
                                                    className="comment_input comment_textarea"
                                                    required="required"
                                                    defaultValue={""}
                                                />
                                            </div>
                                            <div>
                                                <button
                                                    type="submit"
                                                    className="comment_button trans_200"
                                                >
                                                    submit now
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                                {/* Contact Info */}
                                <div className="col-lg-6">
                                    <div className="contact_info">
                                        <div className="contact_info_title">
                                            Contact Info
                                        </div>
                                        <div className="contact_info_text">
                                            <p>
                                                It is a long established fact
                                                that a reader will be distracted
                                                by the readable content of a
                                                page when looking at its layout.
                                                The point of using Lorem Ipsum
                                                is that it has a distribution of
                                                letters.
                                            </p>
                                        </div>
                                        <div className="contact_info_location">
                                            <div className="contact_info_location_title">
                                                New York Office
                                            </div>
                                            <ul className="location_list">
                                                <li>
                                                    T8/480 Collins St, Melbourne
                                                    VIC 3000, New York
                                                </li>
                                                <li>1-234-567-89011</li>
                                                <li>
                                                    info.deercreative@gmail.com
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="contact_info_location">
                                            <div className="contact_info_location_title">
                                                Australia Office
                                            </div>
                                            <ul className="location_list">
                                                <li>
                                                    Forrest Ray, 191-103 Integer
                                                    Rd, Corona Australia
                                                </li>
                                                <li>1-234-567-89011</li>
                                                <li>
                                                    info.deercreative@gmail.com
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    );
};

export default Contact;
