import React, { useEffect, useState } from "react";
import Layout from "../Components/Layout";
import { Link, useForm } from "@inertiajs/react";
import ReCAPTCHA from "react-google-recaptcha";
import useApi from "../Hooks/response";

const Contact = () => {
    const siteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY;
    const [recaptchaToken, setRecaptchaToken] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [modalMessage, setModalMessage] = useState("");
    const [isSuccess, setIsSuccess] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        to: "hrd",
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

    const { post: postContact } = useApi("/send-mail", { fetchOnMount: false });

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!recaptchaToken) {
            setModalTitle("Error");
            setModalMessage("Please complete the reCAPTCHA before submitting.");
            setIsSuccess(false);
            setShowModal(true);
            return;
        }

        try {
            const contactResponse = await postContact(data);

            setModalTitle("Success");
            setModalMessage("Your message has been sent successfully!");
            setIsSuccess(true);
            setShowModal(true);
            reset();
        } catch (error) {
            setModalTitle("Message Failed To Sent");

            const errors = error.response?.data?.errors;
            if (errors) {
                let errorMessage = "Please check the following errors:\n";
                for (const field in errors) {
                    errorMessage += `- ${errors[field]}\n`;
                }
                setModalMessage(errorMessage);
                setIsSuccess(false);
                setShowModal(true);

                const firstErrorField = Object.keys(errors)[0];
                document.getElementById(firstErrorField)?.scrollIntoView({
                    behavior: "smooth",
                    block: "center",
                });
            } else {
                setModalMessage(
                    error.response?.data?.message ||
                    error.message ||
                    "Something went wrong."
                );
                setIsSuccess(false);
                setShowModal(true);
            }
        }
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
                                                        className={`comment_input ${errors.name
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
                                                        className={`comment_input ${errors.to
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
                                                        className={`comment_input ${errors.email
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
                                                        className={`comment_input ${errors.phone
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
                                                    className={`comment_input ${errors.subject
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
                                                    className={`comment_input comment_textarea ${errors.message
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
                                            <ReCAPTCHA
                                                sitekey={siteKey}
                                                onChange={(token) =>
                                                    setRecaptchaToken(token)
                                                }
                                                onExpired={() =>
                                                    setRecaptchaToken(null)
                                                }
                                            />
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
                                                Lia Stephanie School continues to be committed to providing holistic education, preparing students not only to excel in knowledge but also to have strong character and firm faith, ready to face the challenges of the future.
                                            </p>
                                        </div>
                                        <div className="contact_info_location">
                                            <div className="contact_info_location_title">
                                                Jakarta Office
                                            </div>
                                            <p>
                                                Jalan Taman Surya 5 Blok EE2
                                                No.20-27, RT.2/RW.3,
                                                Pegadungan, Kec. Kalideres,
                                                Kota Jakarta Barat, Daerah
                                                Khusus Ibukota Jakarta 11830
                                            </p>
                                            <p className="mb-0">
                                                Contactable Email:
                                            </p>
                                            <ul className="contact_list_number">
                                                <li>info@lscs.sch.id</li>
                                                <li>marketing@lscs.sch.id</li>
                                            </ul>
                                            <br />
                                            <p>
                                                Contactable Number:
                                            </p>
                                            <ul className="contact_list_number">
                                                <li>(021) 54390371 (Foundation Number)</li>
                                                <li>0813-1060-2143 (Administrative Number)</li>
                                                <li>0811-8880-678 (Marketing Number)</li>
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
                                                                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d991.7458580171236!2d106.7057622!3d-6.132928!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e6a0365f7c151b3%3A0xbe58ad1e5471319c!2sLia%20Stephanie%20Catholic%20National%20School%20(LSCNS)!5e0!3m2!1sid!2sid!4v1747846623575!5m2!1sid!2sid"
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
                                    className={`btn ${isSuccess ? "btn-success" : "btn-danger"
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
