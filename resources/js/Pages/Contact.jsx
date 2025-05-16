import React, { useEffect, useState } from "react";
import Layout from "../Components/Layout";
import { Link, useForm } from "@inertiajs/react";

const Contact = () => {
    const [showModal, setShowModal] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [modalMessage, setModalMessage] = useState("");
    const [isSuccess, setIsSuccess] = useState(false);

    const { data, setData, post, processing, errors } = useForm({
        name: "",
        to: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
    });

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

    const handleSubmit = (e) => {
        e.preventDefault();

        post("/send-mail", {
            data: data,
            preserveScroll: true,
            onSuccess: () => {
                setModalTitle("Success");
                setModalMessage("Your message has been sent successfully!");
                setIsSuccess(true);
                setShowModal(true);
            },
            onError: (errors) => {
                setModalTitle("Error");
                setModalMessage(
                    "Please check your form and try again. " +
                        (errors.message || Object.values(errors).join(" "))
                );
                setIsSuccess(false);
                setShowModal(true);

                if (Object.keys(errors).length > 0) {
                    const firstErrorField = Object.keys(errors)[0];
                    document.getElementById(firstErrorField)?.scrollIntoView({
                        behavior: "smooth",
                        block: "center",
                    });
                }
            },
        });
    };

    const handleCloseModal = () => {
        setShowModal(false);
        if (isSuccess) {
            window.location.href = "/contact";
        }
    };

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
                    <div className="contact_info_container">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-6">
                                    <div className="contact_form">
                                        <div className="contact_info_title">
                                            Contact Form
                                        </div>
                                        <form
                                            onSubmit={handleSubmit}
                                            className="comment_form"
                                        >
                                            <div className="row">
                                                <div className="col-lg-6">
                                                    <div className="form_title">
                                                        Name
                                                    </div>
                                                    <input
                                                        type="text"
                                                        className={`comment_input ${
                                                            errors.name
                                                                ? "is-invalid"
                                                                : ""
                                                        }`}
                                                        required
                                                        value={data.name}
                                                        onChange={(e) =>
                                                            setData(
                                                                "name",
                                                                e.target.value
                                                            )
                                                        }
                                                    />
                                                    {errors.name && (
                                                        <div className="invalid-feedback">
                                                            {errors.name}
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="col-lg-6">
                                                    <div className="form_title">
                                                        To
                                                    </div>
                                                    <select
                                                        name="to"
                                                        id="to"
                                                        className={`comment_input ${
                                                            errors.name
                                                                ? "is-invalid"
                                                                : ""
                                                        }`}
                                                        required
                                                        value={data.to}
                                                        onChange={(e) =>
                                                            setData(
                                                                "to",
                                                                e.target.value
                                                            )
                                                        }
                                                    >
                                                        <option
                                                            selected
                                                            disabled
                                                        >
                                                            --Select message
                                                            destination--
                                                        </option>
                                                        <option value="hrd">
                                                            HRD
                                                        </option>
                                                        <option value="marketing">
                                                            Marketing
                                                        </option>
                                                        <option value="information">
                                                            Information
                                                        </option>
                                                    </select>
                                                    {errors.to && (
                                                        <div className="invalid-feedback">
                                                            {errors.to}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-lg-6">
                                                    <div className="form_title">
                                                        Email
                                                    </div>
                                                    <input
                                                        type="email"
                                                        className={`comment_input ${
                                                            errors.email
                                                                ? "is-invalid"
                                                                : ""
                                                        }`}
                                                        required
                                                        value={data.email}
                                                        onChange={(e) =>
                                                            setData(
                                                                "email",
                                                                e.target.value
                                                            )
                                                        }
                                                    />
                                                    {errors.email && (
                                                        <div className="invalid-feedback">
                                                            {errors.email}
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="col-lg-6">
                                                    <div className="form_title">
                                                        Phone
                                                    </div>
                                                    <input
                                                        type="number"
                                                        className={`comment_input ${
                                                            errors.phone
                                                                ? "is-invalid"
                                                                : ""
                                                        }`}
                                                        required
                                                        value={data.phone}
                                                        onChange={(e) =>
                                                            setData(
                                                                "phone",
                                                                e.target.value
                                                            )
                                                        }
                                                    />
                                                    {errors.phone && (
                                                        <div className="invalid-feedback">
                                                            {errors.phone}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                            <div>
                                                <div className="form_title">
                                                    Subject
                                                </div>
                                                <input
                                                    type="text"
                                                    className={`comment_input ${
                                                        errors.subject
                                                            ? "is-invalid"
                                                            : ""
                                                    }`}
                                                    required
                                                    value={data.subject}
                                                    onChange={(e) =>
                                                        setData(
                                                            "subject",
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                                {errors.subject && (
                                                    <div className="invalid-feedback">
                                                        {errors.subject}
                                                    </div>
                                                )}
                                            </div>
                                            <div>
                                                <div className="form_title">
                                                    Message
                                                </div>
                                                <textarea
                                                    className={`comment_input comment_textarea ${
                                                        errors.message
                                                            ? "is-invalid"
                                                            : ""
                                                    }`}
                                                    required
                                                    value={data.message}
                                                    onChange={(e) =>
                                                        setData(
                                                            "message",
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                                {errors.message && (
                                                    <div className="invalid-feedback">
                                                        {errors.message}
                                                    </div>
                                                )}
                                            </div>
                                            <div>
                                                <button
                                                    type="submit"
                                                    className="comment_button trans_200"
                                                    disabled={processing}
                                                >
                                                    {processing
                                                        ? "Sending..."
                                                        : "Submit Now"}
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
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

                                        <div className="contact_map mt-4">
                                            <div className="map">
                                                <div
                                                    id="google_map"
                                                    className="google_map"
                                                >
                                                    <div className="map_container">
                                                        <div id="map">
                                                            <iframe
                                                                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7933.974303374864!2d106.706299!3d-6.132428!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e6a02a474c9b185%3A0xe3042c977b79a3ce!2sSekolah%20glbl!5e0!3m2!1sen!2sid!4v1746177407164!5m2!1sen!2sid"
                                                                width="100%"
                                                                height="100%"
                                                                style={{
                                                                    border: 0,
                                                                }}
                                                                allowFullScreen=""
                                                                loading="lazy"
                                                                referrerPolicy="no-referrer-when-downgrade"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div
                    className={`modal fade ${showModal ? "show" : ""}`}
                    style={{ display: showModal ? "block" : "none" }}
                >
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">{modalTitle}</h5>
                                <button
                                    type="button"
                                    className="close"
                                    onClick={handleCloseModal}
                                >
                                    <span>&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <p>{modalMessage}</p>
                                {!isSuccess && errors && (
                                    <ul className="text-danger">
                                        {Object.entries(errors).map(
                                            ([key, value]) =>
                                                key !== "message" && (
                                                    <li key={key}>{value}</li>
                                                )
                                        )}
                                    </ul>
                                )}
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className={`btn ${
                                        isSuccess ? "btn-success" : "btn-danger"
                                    }`}
                                    onClick={handleCloseModal}
                                >
                                    OK
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {showModal && <div className="modal-backdrop fade show"></div>}
            </Layout>
        </>
    );
};

export default Contact;
