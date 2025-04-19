import React, { useEffect, useState } from "react";
import Layout from "../Components/Layout";
import { Link } from "@inertiajs/react";

const Register = () => {
    useEffect(() => {
        const link1 = document.createElement("link");
        link1.rel = "stylesheet";
        link1.type = "text/css";
        link1.href = "/landing/styles/about.css";

        const link2 = document.createElement("link");
        link2.rel = "stylesheet";
        link2.type = "text/css";
        link2.href = "/landing/styles/about_responsive.css";

        document.head.appendChild(link1);
        document.head.appendChild(link2);

        const script = document.createElement("script");
        script.src = "/landing/js/about.js";
        script.async = true;

        document.body.appendChild(script);

        return () => {
            document.head.removeChild(link1);
            document.head.removeChild(link2);
            document.body.removeChild(script);
        };
    }, []);

    const [activeTab, setActiveTab] = useState(0);
    const [sameWithFather, setSameWithFather] = useState(true);
    const [residenceStatus, setResidenceStatus] = useState("");
    const tabs = [
        "Student Personal Data",
        "Student Parent Data",
        "Student Address Data",
    ];

    const nextTab = () => {
        if (activeTab < tabs.length - 1) setActiveTab(activeTab + 1);
    };

    const prevTab = () => {
        if (activeTab > 0) setActiveTab(activeTab - 1);
    };

    const handleRegistration = (e) => {
        e.preventDefault();
        // Di sini Anda akan melakukan logika pendaftaran,
        // seperti mengirimkan data ke server.
    
        // Setelah pendaftaran berhasil, Anda bisa mengarahkan pengguna ke /payment
        console.log("Data registrasi akan dikirim.");
        // Simulasi pendaftaran berhasil setelah 1 detik
        setTimeout(() => {
            console.log("Pendaftaran berhasil, mengarahkan ke /payment.");
            window.location.href = "/payment";
            // ATAU, lebih baik menggunakan router jika Anda menggunakan library seperti React Router
            // history.push('/payment');
        }, 1000);
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
                                            <li>Register</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="feature">
                    <div
                        className="feature_background"
                        style={{
                            backgroundImage:
                                "url(/landing/images/courses_background.jpg)",
                        }}
                    />
                    <div className="container">
                        <div className="row">
                            <div className="col">
                                <div className="section_title_container text-center">
                                    <h2 className="section_title">
                                        Form Register New Student
                                    </h2>
                                    <div className="section_subtitle">
                                        <p>
                                            Lorem ipsum dolor sit amet,
                                            consectetur adipiscing elit. Donec
                                            vel gravida arcu. Vestibulum
                                            feugiat, sapien ultrices fermentum
                                            congue, quam velit venenatis sem
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="container mt-4">
                            {/* Non-clickable Tab Headers */}
                            <ul className="nav nav-tabs">
                                {tabs.map((tab, index) => (
                                    <li key={index} className="nav-item">
                                        <span
                                            className={`nav-link ${
                                                activeTab === index
                                                    ? "active"
                                                    : "disabled"
                                            }`}
                                            style={{ cursor: "not-allowed" }}
                                        >
                                            {tab}
                                        </span>
                                    </li>
                                ))}
                            </ul>

                            {/* Form Body */}
                            <form
                                className="mt-3"
                                onSubmit={handleRegistration}
                            >
                                <div className="card">
                                    <div className="card-body">
                                        {/* Tab 1: Student Personal Data */}
                                        {activeTab === 0 && (
                                            <>
                                                <div className="form-group">
                                                    <label htmlFor="registered-level">
                                                        Registered Level{" "}
                                                        <span className="text-danger">
                                                            *
                                                        </span>
                                                    </label>
                                                    <select
                                                        className="form-control text-secondary"
                                                        id="registered-level"
                                                    >
                                                        <option
                                                            selected
                                                            disabled
                                                        >
                                                            ---Select Registered
                                                            Level---
                                                        </option>
                                                        {[
                                                            "KB",
                                                            "TKA",
                                                            "TKB",
                                                            "SD1",
                                                            "SD2",
                                                            "SD3",
                                                            "SD4",
                                                            "SD5",
                                                            "SD6",
                                                            "SMP1",
                                                            "SMP2",
                                                            "SMP3",
                                                            "SMA1",
                                                            "SMA2",
                                                            "SMA3",
                                                        ].map((level) => (
                                                            <option key={level}>
                                                                {level}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>

                                                <div className="form-group">
                                                    <label htmlFor="full-name">
                                                        Full Name{" "}
                                                        <span className="text-danger">
                                                            *
                                                        </span>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="full-name"
                                                    />
                                                </div>

                                                <div className="row">
                                                    <div className="col-lg-6">
                                                        <div className="form-group">
                                                            <label htmlFor="gender">
                                                                Gender{" "}
                                                                <span className="text-danger">
                                                                    *
                                                                </span>
                                                            </label>
                                                            <select
                                                                className="form-control text-secondary"
                                                                id="gender"
                                                            >
                                                                <option
                                                                    selected
                                                                    disabled
                                                                >
                                                                    ---Select
                                                                    Gender---
                                                                </option>
                                                                <option>
                                                                    Male
                                                                </option>
                                                                <option>
                                                                    Female
                                                                </option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6">
                                                        <div className="form-group">
                                                            <label htmlFor="religion">
                                                                Religion{" "}
                                                                <span className="text-danger">
                                                                    *
                                                                </span>
                                                            </label>
                                                            <select
                                                                className="form-control text-secondary"
                                                                id="religion"
                                                            >
                                                                <option
                                                                    selected
                                                                    disabled
                                                                >
                                                                    ---Select
                                                                    Religion---
                                                                </option>
                                                                <option>
                                                                    Catholic
                                                                </option>
                                                                <option>
                                                                    Christian
                                                                </option>
                                                                <option>
                                                                    Buddha
                                                                </option>
                                                                <option>
                                                                    Islam
                                                                </option>
                                                                <option>
                                                                    Hindu
                                                                </option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="row">
                                                    <div className="col-lg-6">
                                                        <div className="form-group">
                                                            <label htmlFor="place-of-birth">
                                                                Place of Birth{" "}
                                                                <span className="text-danger">
                                                                    *
                                                                </span>
                                                            </label>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                id="place-of-birth"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6">
                                                        <div className="form-group">
                                                            <label htmlFor="date-of-birth">
                                                                Date of Birth{" "}
                                                                <span className="text-danger">
                                                                    *
                                                                </span>
                                                            </label>
                                                            <input
                                                                type="date"
                                                                className="form-control text-secondary"
                                                                id="date-of-birth"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="row">
                                                    <div className="col-lg-6">
                                                        <div className="form-group">
                                                            <label htmlFor="number">
                                                                Number
                                                                Handphone/Whatsapp{" "}
                                                                <span className="text-danger">
                                                                    *
                                                                </span>
                                                            </label>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                id="number"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6">
                                                        <div className="form-group">
                                                            <label htmlFor="email">
                                                                Email
                                                            </label>
                                                            <input
                                                                type="email"
                                                                className="form-control text-secondary"
                                                                id="email"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="form-group">
                                                    <label htmlFor="previous-school">
                                                        Previous School Name{" "}
                                                        <span className="text-danger">
                                                            *
                                                        </span>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="previous-school"
                                                    />
                                                </div>

                                                <div className="form-group">
                                                    <label htmlFor="hobbies">
                                                        Hobbies
                                                    </label>
                                                    <textarea
                                                        className="form-control"
                                                        id="hobbies"
                                                        rows={2}
                                                    />
                                                </div>

                                                <div className="form-group">
                                                    <label htmlFor="achievements">
                                                        Achievements
                                                    </label>
                                                    <textarea
                                                        className="form-control"
                                                        id="achievements"
                                                        rows={2}
                                                    />
                                                </div>
                                            </>
                                        )}

                                        {/* Tab 2: Student Parent Data */}
                                        {activeTab === 1 && (
                                            <>
                                                <div className="form-group">
                                                    <label htmlFor="father-name">
                                                        Father Name{" "}
                                                        <span className="text-danger">
                                                            *
                                                        </span>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="father-name"
                                                    />
                                                </div>

                                                <div className="row">
                                                    <div className="col-lg-6">
                                                        <div className="form-group">
                                                            <label htmlFor="place-of-birth-father">
                                                                Place of Birth{" "}
                                                                <span className="text-danger">
                                                                    *
                                                                </span>
                                                            </label>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                id="place-of-birth-father"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6">
                                                        <div className="form-group">
                                                            <label htmlFor="date-of-birth-father">
                                                                Date of Birth{" "}
                                                                <span className="text-danger">
                                                                    *
                                                                </span>
                                                            </label>
                                                            <input
                                                                type="date"
                                                                className="form-control text-secondary"
                                                                id="date-of-birth-father"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="form-group">
                                                    <label htmlFor="mother-name">
                                                        Mother Name{" "}
                                                        <span className="text-danger">
                                                            *
                                                        </span>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="mother-name"
                                                    />
                                                </div>

                                                <div className="row">
                                                    <div className="col-lg-6">
                                                        <div className="form-group">
                                                            <label htmlFor="place-of-birth-mother">
                                                                Place of Birth{" "}
                                                                <span className="text-danger">
                                                                    *
                                                                </span>
                                                            </label>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                id="place-of-birth-mother"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6">
                                                        <div className="form-group">
                                                            <label htmlFor="date-of-birth-mother">
                                                                Date of Birth{" "}
                                                                <span className="text-danger">
                                                                    *
                                                                </span>
                                                            </label>
                                                            <input
                                                                type="date"
                                                                className="form-control text-secondary"
                                                                id="date-of-birth-mother"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="form-group">
                                                    <label htmlFor="number-of-siblings">
                                                        Number Of Siblings{" "}
                                                        <span className="text-danger">
                                                            *
                                                        </span>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="number-of-siblings"
                                                    />
                                                </div>

                                                <div className="row">
                                                    <div className="col-lg-6">
                                                        <div className="form-group">
                                                            <label htmlFor="parent-number">
                                                                Number
                                                                Handphone/Whatsapp{" "}
                                                                <span className="text-danger">
                                                                    *
                                                                </span>
                                                            </label>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                id="parent-number"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6">
                                                        <div className="form-group">
                                                            <label htmlFor="parent-email">
                                                                Email
                                                            </label>
                                                            <input
                                                                type="email"
                                                                className="form-control text-secondary"
                                                                id="parent-email"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </>
                                        )}

                                        {/* Tab 3: Student Address Data */}
                                        {activeTab === 2 && (
                                            <>
                                                {/* Father Address */}
                                                <div className="form-group">
                                                    <label htmlFor="father-address">
                                                        Father Address{" "}
                                                        <span className="text-danger">
                                                            *
                                                        </span>
                                                    </label>
                                                    <textarea
                                                        className="form-control"
                                                        id="father-address"
                                                        rows={2}
                                                    />
                                                </div>

                                                {/* Checkbox: Same with father */}
                                                <div className="form-check ml-4">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        id="flexCheckDefault"
                                                        checked={sameWithFather}
                                                        onChange={(e) =>
                                                            setSameWithFather(
                                                                e.target.checked
                                                            )
                                                        }
                                                    />
                                                    <label
                                                        className="form-check-label"
                                                        htmlFor="flexCheckDefault"
                                                    >
                                                        Same with father
                                                    </label>
                                                </div>

                                                {/* Mother Address - show only if NOT sameWithFather */}
                                                {!sameWithFather && (
                                                    <div className="form-group">
                                                        <label htmlFor="mother-address">
                                                            Mother Address{" "}
                                                            <span className="text-danger">
                                                                *
                                                            </span>
                                                        </label>
                                                        <textarea
                                                            className="form-control"
                                                            id="mother-address"
                                                            rows={2}
                                                        />
                                                    </div>
                                                )}

                                                {/* Student Residence Status */}
                                                <div className="form-group">
                                                    <label htmlFor="student-resident-status">
                                                        Student Residence Status{" "}
                                                        <span className="text-danger">
                                                            *
                                                        </span>
                                                    </label>
                                                    <select
                                                        className="form-control text-secondary"
                                                        id="student-resident-status"
                                                        value={residenceStatus}
                                                        onChange={(e) =>
                                                            setResidenceStatus(
                                                                e.target.value
                                                            )
                                                        }
                                                    >
                                                        <option
                                                            value=""
                                                            disabled
                                                        >
                                                            ---Select Student
                                                            Residence Status---
                                                        </option>
                                                        <option value="Father">
                                                            Father
                                                        </option>
                                                        <option value="Mother">
                                                            Mother
                                                        </option>
                                                        <option value="Other">
                                                            Other
                                                        </option>
                                                    </select>
                                                </div>

                                                {/* Student Address - only show if status is "Other" */}
                                                {residenceStatus ===
                                                    "Other" && (
                                                    <div className="form-group">
                                                        <label htmlFor="student-address">
                                                            Student Address{" "}
                                                            <span className="text-danger">
                                                                *
                                                            </span>
                                                        </label>
                                                        <textarea
                                                            className="form-control"
                                                            id="student-address"
                                                            rows={2}
                                                        />
                                                    </div>
                                                )}
                                            </>
                                        )}
                                    </div>
                                </div>

                                {/* Buttons */}
                                <div className="d-flex justify-content-between mt-4">
                                    {activeTab > 0 && (
                                        <button
                                            type="button"
                                            className="btn btn-secondary"
                                            onClick={prevTab}
                                        >
                                            Previous
                                        </button>
                                    )}
                                    {activeTab == 2 ? (
                                        <button
                                            type="submit"
                                            className="btn btn-success ms-auto"
                                        >
                                            Register
                                        </button>
                                    ) : (
                                        <button
                                            type="button"
                                            className="btn btn-primary ms-auto"
                                            onClick={nextTab}
                                        >
                                            Next
                                        </button>
                                    )}
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    );
};

export default Register;
