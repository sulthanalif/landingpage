import React, { useEffect } from "react";
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
                        <div className="row feature_row ml-0 ml-lg-4">
                            <form className="row justify-content-center">
                                <div className="col-lg-6">
                                    <div className="card">
                                        <div className="card-header">
                                            <h4>Student Personal Data</h4>
                                        </div>
                                        <div className="card-body">
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
                                                    <option selected disabled>
                                                        ---Select Registered Level---
                                                    </option>
                                                    <option>KB</option>
                                                    <option>TKA</option>
                                                    <option>TKB</option>
                                                    <option>SD1</option>
                                                    <option>SD2</option>
                                                    <option>SD3</option>
                                                    <option>SD4</option>
                                                    <option>SD5</option>
                                                    <option>SD6</option>
                                                    <option>SMP1</option>
                                                    <option>SMP2</option>
                                                    <option>SMP3</option>
                                                    <option>SMA1</option>
                                                    <option>SMA2</option>
                                                    <option>SMA3</option>
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
                                            <div className="form-group">
                                                <label htmlFor="baptismal-name">
                                                    Baptismal Name (If Catholic)
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="baptismal-name"
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
                                                            <option selected disabled>
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
                                                            <option selected disabled>
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
                                                        <label htmlFor="siblings">
                                                            Number of Siblings{" "}
                                                            <span className="text-danger">
                                                                *
                                                            </span>
                                                        </label>
                                                        <input
                                                            type="number"
                                                            className="form-control"
                                                            id="siblings"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-lg-6">
                                                    <div className="form-group">
                                                        <label htmlFor="citizenship">
                                                            Citizenship{" "}
                                                            <span className="text-danger">
                                                                *
                                                            </span>
                                                        </label>
                                                        <select
                                                            className="form-control text-secondary"
                                                            id="citizenship"
                                                        >
                                                            <option disabled>
                                                                ---Select
                                                                Citizenship---
                                                            </option>
                                                            <option>WNI</option>
                                                            <option>WNA</option>
                                                        </select>
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
                                                <label htmlFor="previous-school-address">
                                                    Previous School Address
                                                    <span className="text-danger">
                                                        *
                                                    </span>
                                                </label>
                                                <textarea
                                                    className="form-control"
                                                    id="previous-school-address"
                                                    rows={3}
                                                    defaultValue={""}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="Hobbies">
                                                    Hobbies
                                                </label>
                                                <textarea
                                                    className="form-control"
                                                    id="Hobbies"
                                                    rows={2}
                                                    defaultValue={""}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="achievments">
                                                    Achievments
                                                </label>
                                                <textarea
                                                    className="form-control"
                                                    id="achievments"
                                                    rows={2}
                                                    defaultValue={""}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="card">
                                        <div className="card-header">
                                            <h4>Student Parent Data</h4>
                                        </div>
                                        <div className="card-body">
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
                                            <div className="row">
                                                <div className="col-lg-6">
                                                    <div className="form-group">
                                                        <label htmlFor="father-religion">
                                                            Father Religion{" "}
                                                            <span className="text-danger">
                                                                *
                                                            </span>
                                                        </label>
                                                        <select
                                                            className="form-control text-secondary"
                                                            id="father-religion"
                                                        >
                                                            <option selected disabled>
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
                                                <div className="col-lg-6">
                                                    <div className="form-group">
                                                        <label htmlFor="father-profession">
                                                            Father Profession{" "}
                                                            <span className="text-danger">
                                                                *
                                                            </span>
                                                        </label>
                                                        <select
                                                            className="form-control text-secondary"
                                                            id="father-profession"
                                                        >
                                                            <option selected disabled>
                                                                ---Select
                                                                Profession---
                                                            </option>
                                                            <option>
                                                                Government
                                                                Employees
                                                            </option>
                                                            <option>
                                                                Private Sector
                                                                Employee
                                                            </option>
                                                            <option>
                                                                other
                                                            </option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="father-education">
                                                    Father Last Education{" "}
                                                    <span className="text-danger">
                                                        *
                                                    </span>
                                                </label>
                                                <select
                                                    className="form-control text-secondary"
                                                    id="father-education"
                                                >
                                                    <option selected disabled>
                                                        ---Select Last
                                                        Education---
                                                    </option>
                                                    <option>
                                                        SD/Sederajat
                                                    </option>
                                                    <option>
                                                        SMP/Sederajat
                                                    </option>
                                                    <option>
                                                        SMA/Sederajat
                                                    </option>
                                                    <option>D1/D2/D3</option>
                                                    <option>S1</option>
                                                    <option>S2</option>
                                                    <option>S3</option>
                                                </select>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="father-address">
                                                    Father Address
                                                    <span className="text-danger">
                                                        *
                                                    </span>
                                                </label>
                                                <textarea
                                                    className="form-control"
                                                    id="father-address"
                                                    rows={3}
                                                    defaultValue={""}
                                                />
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
                                            <div className="row">
                                                <div className="col-lg-6">
                                                    <div className="form-group">
                                                        <label htmlFor="mother-religion">
                                                            Mother Religion{" "}
                                                            <span className="text-danger">
                                                                *
                                                            </span>
                                                        </label>
                                                        <select
                                                            className="form-control text-secondary"
                                                            id="mother-religion"
                                                        >
                                                            <option selected disabled>
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
                                                <div className="col-lg-6">
                                                    <div className="form-group">
                                                        <label htmlFor="mother-profession">
                                                            Mother Profession{" "}
                                                            <span className="text-danger">
                                                                *
                                                            </span>
                                                        </label>
                                                        <select
                                                            className="form-control text-secondary"
                                                            id="mother-profession"
                                                        >
                                                            <option selected disabled>
                                                                ---Select
                                                                Profession---
                                                            </option>
                                                            <option>
                                                                Government
                                                                Employees
                                                            </option>
                                                            <option>
                                                                Private Sector
                                                                Employee
                                                            </option>
                                                            <option>
                                                                other
                                                            </option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="mother-education">
                                                    Mother Last Education{" "}
                                                    <span className="text-danger">
                                                        *
                                                    </span>
                                                </label>
                                                <select
                                                    className="form-control text-secondary"
                                                    id="mother-education"
                                                >
                                                    <option selected disabled>
                                                        ---Select Last
                                                        Education---
                                                    </option>
                                                    <option>
                                                        SD/Sederajat
                                                    </option>
                                                    <option>
                                                        SMP/Sederajat
                                                    </option>
                                                    <option>
                                                        SMA/Sederajat
                                                    </option>
                                                    <option>D1/D2/D3</option>
                                                    <option>S1</option>
                                                    <option>S2</option>
                                                    <option>S3</option>
                                                </select>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="mother-address">
                                                    Mother Address
                                                    <span className="text-danger">
                                                        *
                                                    </span>
                                                </label>
                                                <textarea
                                                    className="form-control"
                                                    id="mother-address"
                                                    rows={3}
                                                    defaultValue={""}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <button className="btn btn-primary mt-4">Register</button>
                            </form>
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    );
};

export default Register;
