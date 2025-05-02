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

        document.body.appendChild(script);
        document.body.appendChild(script2);

        return () => {
            document.head.removeChild(link1);
            document.head.removeChild(link2);
            document.body.removeChild(script);
            document.body.removeChild(script2);
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
                                    <div id="map">
                                        <iframe
                                            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7933.974303374864!2d106.706299!3d-6.132428!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e6a02a474c9b185%3A0xe3042c977b79a3ce!2sSekolah%20glbl!5e0!3m2!1sen!2sid!4v1746177407164!5m2!1sen!2sid"
                                            width="100%"
                                            height="100%"
                                            style={{ border: 0 }}
                                            allowFullScreen=""
                                            loading="lazy"
                                            referrerPolicy="no-referrer-when-downgrade"
                                        />
                                    </div>
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
                                                Jakarta Office
                                            </div>
                                            <ul className="location_list">
                                                <li>
                                                    Jalan Taman Surya 5 Blok EE2
                                                    No.20-27, RT.2/RW.3,
                                                    Pegadungan, Kec. Kalideres,
                                                    Kota Jakarta Barat, Daerah
                                                    Khusus Ibukota Jakarta 11830
                                                </li>
                                                <li>0811-8880-678</li>
                                                <li>marketing@lscs.sch.id</li>
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
