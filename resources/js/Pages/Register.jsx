import React, { useEffect, useState } from "react";
import Layout from "../Components/Layout";
import { Link, router, useForm } from "@inertiajs/react";
import useApi from "../Hooks/response";
import axios from "axios";
import ReCAPTCHA from "react-google-recaptcha";

const Register = () => {
    const siteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY;
    const [recaptchaToken, setRecaptchaToken] = useState(null);

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

    const [showModal, setShowModal] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [modalMessage, setModalMessage] = useState("");
    const [isSuccess, setIsSuccess] = useState(false);

    const { data, setData, post, processing, errors, reset, transform } =
        useForm({
            // Tab 1: Student Personal Data
            table_id: "",
            level: "",
            name: "",
            gender: "",
            religion: "",
            is_biduk: false,
            feeder: false,
            place_of_birth: "",
            date_of_birth: "",
            phone: "",
            email: "",
            previous_school: "",
            hobbi: "",
            achievement: "",
            discount_id: "",

            // Tab 2: Student Parent Data
            father_name: "",
            place_of_birth_father: "",
            date_of_birth_father: "",
            mother_name: "",
            place_of_birth_mother: "",
            date_of_birth_mother: "",
            number_of_siblings: "",
            phone_parent: "",
            email_parent: "",

            // Tab 3: Student Address Data
            father_address: "",
            same_with_father: true,
            mother_address: "",
            student_residence_status: "",
            student_address: "",
            voucher_code: "",
            is_child_lscs: false,
            children: [{ name: "", class_level: "" }],
            amount: "",
            discount_biduk: "",
            discount_lscs: "",
            referral_by: "",
            vouchers: "",
            total: "",
        });

    const {
        data: types,
        loading,
        error,
        get: getTypes,
    } = useApi("dataRegister");

    useEffect(() => {
        getTypes();
    }, []);

    const [programs, setPrograms] = useState([]);
    const [levels, setLevels] = useState([]);
    const [selectedProgram, setSelectedProgram] = useState(null);

    useEffect(() => {
        if (types?.types) {
            setPrograms(types.types);
        }
    }, [types]);

    useEffect(() => {
        if (data.table_id && programs.length > 0) {
            const selectedProgram = programs.find(
                (p) => p.table.id?.toString() === data.table_id.toString()
            );

            setSelectedProgram(selectedProgram);

            if (selectedProgram?.rows) {
                const levels = selectedProgram.rows.map((r) => r);

                if (levels.length > 0) {
                    setLevels(levels || []);
                } else {
                    setLevels([]);
                }
            } else {
                setData("level", "");
            }
        } else {
            setSelectedProgram(null);
            setData("level", "");
        }
    }, [data.table_id, programs, setData]);

    useEffect(() => {
        if (data.same_with_father && data.father_address) {
            setData("mother_address", data.father_address);
        }
    }, [data.same_with_father, data.father_address]);

    useEffect(() => {
        if (data.student_residence_status === "Father" && data.father_address) {
            setData("student_address", data.father_address);
        } else if (
            data.student_residence_status === "Mother" &&
            data.mother_address
        ) {
            setData("student_address", data.mother_address);
        }
    }, [
        data.student_residence_status,
        data.father_address,
        data.mother_address,
    ]);

    const handleChildChange = (index, field, value) => {
        const updatedChildren = [...data.children];
        updatedChildren[index][field] = value;
        setData("children", updatedChildren);
    };

    const addChild = () => {
        setData("children", [...data.children, { name: "", class_level: "" }]);
    };

    const removeChild = (index) => {
        const updatedChildren = data.children.filter((_, i) => i !== index);
        setData("children", updatedChildren);
    };

    const [activeTab, setActiveTab] = useState(0);
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

    const { get: getFeeCalculation } = useApi("/countFee");
    const { post: postRegister } = useApi("/register", { fetchOnMount: false });

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
            // 1. Validasi data yang diperlukan untuk countFee
            if (!data.table_id || !data.level) {
                throw new Error("Program and level must be selected");
            }

            if (data.is_child_lscs && data.children.length === 0) {
                throw new Error("Minimum 1 child must be filled");
            }

            let childrenDiscount = 0;

            if (data.is_child_lscs) {
                childrenDiscount = data.children.length;
            }

            // 2. Hitung biaya terlebih dahulu
            let feeData;
            try {
                const feeResponse = await getFeeCalculation({
                    level: data.level,
                    table_id: data.table_id,
                    is_biduk: data.is_biduk ? 1 : 0,
                    feeder: data.feeder ? 1 : 0,
                    cildren: childrenDiscount,
                    voucher_code: data.voucher_code,
                });

                feeData = feeResponse;

                if (!feeData || feeData.amount == null || feeData.total == null) {
                    throw new Error("Fee calculation result is invalid");
                }

            } catch (error) {
                const status = error.response?.status;
                const message = error.response?.data?.message || error.message;

                setModalTitle("Registration Failed");

                if (status === 404 && message) {
                    setModalMessage(message || "Failed to calculate payment amount. Please try again.");
                } else {
                    setModalMessage("Voucher code is invalid or not applicable. Please check the voucher code and try again.");
                }

                setIsSuccess(false);
                setShowModal(true);

                // Scroll ke voucher field kalau error tentang voucher
                if (message?.toLowerCase().includes("voucher")) {
                    document.getElementById('voucher_code')?.scrollIntoView({
                        behavior: 'smooth',
                        block: 'center',
                    });
                }
                return; // stop proses karena fee gagal
            }

            if (!feeData || feeData.amount == null || feeData.total == null) {
                throw new Error("Fee calculation result is invalid");
            }

            // 3. Siapkan data form dengan hasil perhitungan biaya
            let formDataToSend = {
                ...data,
                amount: feeData.amount,
                discount_biduk: feeData.discount.biduk,
                discount_feeder: feeData.discount.feeder,
                discount_lscs: feeData.discount.lscs,
                vouchers: feeData.discount.voucher,
                total: feeData.total,
                // konversi tanggal ke format YYYY-MM-DD
                date_of_birth: data.date_of_birth
                    ? new Date(data.date_of_birth).toISOString().split("T")[0]
                    : "",
                father_date_of_birth: data.father_date_of_birth
                    ? new Date(data.father_date_of_birth)
                        .toISOString()
                        .split("T")[0]
                    : "",
                mother_date_of_birth: data.mother_date_of_birth
                    ? new Date(data.mother_date_of_birth)
                        .toISOString()
                        .split("T")[0]
                    : "",
            };

            // 4. Kirim data pendaftaran
            try {
                const registerResponse = await postRegister(formDataToSend);

                setModalTitle("Registration Successful");
                setModalMessage(`
                    <p>Your registration has been submitted successfully. Please contact admin for simulation.</p>
                    `);
                setIsSuccess(true);
                setShowModal(true);
                reset();
            } catch (error) {
                setModalTitle("Registration Failed");
                setModalMessage(
                    error.response?.data?.message ||
                    error.message ||
                    "Failed to submit registration. Please try again."
                );
                setIsSuccess(false);
                setShowModal(true);
            }
        } catch (error) {
            setModalTitle("Registration Failed");

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
            window.location.href = "/register";
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
                                            Please fill out all required fields
                                            (*) to complete your registration.
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
                                            className={`nav-link ${activeTab === index
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
                            <form className="mt-3" onSubmit={handleSubmit}>
                                <div className="card">
                                    <div className="card-body">
                                        {/* Tab 1: Student Personal Data */}
                                        {activeTab === 0 && (
                                            <>
                                                <div className="row">
                                                    <div className="col-lg-6">
                                                        <div className="form-group">
                                                            <label htmlFor="table_id">
                                                                Registered
                                                                Program{" "}
                                                                <span className="text-danger">
                                                                    *
                                                                </span>
                                                            </label>
                                                            <select
                                                                className={`form-control ${errors.table_id
                                                                    ? "is-invalid"
                                                                    : "text-secondary"
                                                                    }`}
                                                                id="table_id"
                                                                value={
                                                                    data.table_id
                                                                }
                                                                onChange={(e) =>
                                                                    setData(
                                                                        "table_id",
                                                                        e.target
                                                                            .value
                                                                    )
                                                                }
                                                                required
                                                            >
                                                                <option
                                                                    value=""
                                                                    disabled
                                                                >
                                                                    ---Select
                                                                    Registered
                                                                    Program---
                                                                </option>
                                                                {programs?.map(
                                                                    (
                                                                        program
                                                                    ) => (
                                                                        <option
                                                                            key={
                                                                                program
                                                                                    .table
                                                                                    .id
                                                                            }
                                                                            value={
                                                                                program
                                                                                    .table
                                                                                    .id
                                                                            }
                                                                        >
                                                                            {
                                                                                program
                                                                                    .table
                                                                                    .name
                                                                            }
                                                                        </option>
                                                                    )
                                                                )}
                                                            </select>
                                                            {errors.table_id && (
                                                                <div className="invalid-feedback">
                                                                    {
                                                                        errors.table_id
                                                                    }
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>

                                                    <div className="col-lg-6">
                                                        <div className="form-group">
                                                            <label htmlFor="level">
                                                                Registered Level{" "}
                                                                <span className="text-danger">
                                                                    *
                                                                </span>
                                                            </label>
                                                            <select
                                                                className={`form-control ${errors.level
                                                                    ? "is-invalid"
                                                                    : "text-secondary"
                                                                    }`}
                                                                id="level"
                                                                value={
                                                                    data.level
                                                                }
                                                                onChange={(e) =>
                                                                    setData(
                                                                        "level",
                                                                        e.target
                                                                            .value
                                                                    )
                                                                }
                                                                required
                                                            >
                                                                <option
                                                                    value=""
                                                                    disabled
                                                                >
                                                                    {levels.length >
                                                                        0
                                                                        ? "---Select Registered Level---"
                                                                        : data.table_id
                                                                            ? "No levels available"
                                                                            : "---Select Program First---"}
                                                                </option>
                                                                {levels.map(
                                                                    (
                                                                        row,
                                                                        index
                                                                    ) => (
                                                                        <option
                                                                            key={`${row.level}-${index}`}
                                                                            value={
                                                                                row.level
                                                                            }
                                                                        >
                                                                            {
                                                                                row.level
                                                                            }
                                                                        </option>
                                                                    )
                                                                )}
                                                            </select>
                                                            {errors.level && (
                                                                <div className="invalid-feedback">
                                                                    {
                                                                        errors.level
                                                                    }
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="form-group">
                                                    <label htmlFor="name">
                                                        Full Name{" "}
                                                        <span className="text-danger">
                                                            *
                                                        </span>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className={`form-control ${errors.name
                                                            ? "is-invalid"
                                                            : "text-secondary"
                                                            }`}
                                                        id="name"
                                                        value={data.name}
                                                        onChange={(e) =>
                                                            setData(
                                                                "name",
                                                                e.target.value
                                                            )
                                                        }
                                                        required
                                                    />
                                                    {errors.name && (
                                                        <div className="invalid-feedback">
                                                            {errors.name}
                                                        </div>
                                                    )}
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
                                                                className={`form-control ${errors.gender
                                                                    ? "is-invalid"
                                                                    : "text-secondary"
                                                                    }`}
                                                                id="gender"
                                                                value={
                                                                    data.gender
                                                                }
                                                                onChange={(e) =>
                                                                    setData(
                                                                        "gender",
                                                                        e.target
                                                                            .value
                                                                    )
                                                                }
                                                                required
                                                            >
                                                                <option
                                                                    value={""}
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
                                                            {errors.gender && (
                                                                <div className="invalid-feedback">
                                                                    {
                                                                        errors.gender
                                                                    }
                                                                </div>
                                                            )}
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
                                                                className={`form-control ${errors.religion
                                                                    ? "is-invalid"
                                                                    : "text-secondary"
                                                                    }`}
                                                                id="religion"
                                                                value={
                                                                    data.religion
                                                                }
                                                                onChange={(e) =>
                                                                    setData(
                                                                        "religion",
                                                                        e.target
                                                                            .value
                                                                    )
                                                                }
                                                                required
                                                            >
                                                                <option
                                                                    value={""}
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
                                                            {errors.religion && (
                                                                <div className="invalid-feedback">
                                                                    {
                                                                        errors.religion
                                                                    }
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="row">
                                                    <div className="col-lg-6">
                                                        <div className="form-check ml-4">
                                                            <input
                                                                className="form-check-input"
                                                                type="checkbox"
                                                                id="feeder"
                                                                checked={
                                                                    data.feeder
                                                                }
                                                                onChange={(e) =>
                                                                    setData(
                                                                        "feeder",
                                                                        e.target
                                                                            .checked
                                                                    )
                                                                }
                                                            />
                                                            <label
                                                                className="form-check-label"
                                                                htmlFor="feeder"
                                                            >
                                                                Previous School at Lia Stephanie
                                                            </label>
                                                        </div>
                                                    </div>
                                                    {data.religion ===
                                                        "Catholic" && (
                                                            <div className="col-lg-6">
                                                                <div className="form-check ml-4">
                                                                    <input
                                                                        className="form-check-input"
                                                                        type="checkbox"
                                                                        id="is_biduk"
                                                                        checked={
                                                                            data.is_biduk
                                                                        }
                                                                        onChange={(e) =>
                                                                            setData(
                                                                                "is_biduk",
                                                                                e.target
                                                                                    .checked
                                                                            )
                                                                        }
                                                                    />
                                                                    <label
                                                                        className="form-check-label"
                                                                        htmlFor="is_biduk"
                                                                    >
                                                                        Is a Biduk
                                                                    </label>
                                                                </div>
                                                            </div>
                                                        )}
                                                </div>

                                                <div className="row">
                                                    <div className="col-lg-6">
                                                        <div className="form-group">
                                                            <label htmlFor="place_of_birth">
                                                                Place of Birth{" "}
                                                                <span className="text-danger">
                                                                    *
                                                                </span>
                                                            </label>
                                                            <input
                                                                type="text"
                                                                className={`form-control ${errors.place_of_birth
                                                                    ? "is-invalid"
                                                                    : "text-secondary"
                                                                    }`}
                                                                id="place_of_birth"
                                                                value={
                                                                    data.place_of_birth
                                                                }
                                                                onChange={(e) =>
                                                                    setData(
                                                                        "place_of_birth",
                                                                        e.target
                                                                            .value
                                                                    )
                                                                }
                                                                required
                                                            />
                                                            {errors.place_of_birth && (
                                                                <div className="invalid-feedback">
                                                                    {
                                                                        errors.place_of_birth
                                                                    }
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6">
                                                        <div className="form-group">
                                                            <label htmlFor="date_of_birth">
                                                                Date of Birth{" "}
                                                                <span className="text-danger">
                                                                    *
                                                                </span>
                                                            </label>
                                                            <input
                                                                type="date"
                                                                className={`form-control ${errors.date_of_birth
                                                                    ? "is-invalid"
                                                                    : "text-secondary"
                                                                    }`}
                                                                id="date_of_birth"
                                                                value={
                                                                    data.date_of_birth
                                                                }
                                                                onChange={(e) =>
                                                                    setData(
                                                                        "date_of_birth",
                                                                        e.target
                                                                            .value
                                                                    )
                                                                }
                                                                required
                                                            />
                                                            {errors.date_of_birth && (
                                                                <div className="invalid-feedback">
                                                                    {
                                                                        errors.date_of_birth
                                                                    }
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="row">
                                                    <div className="col-lg-6">
                                                        <div className="form-group">
                                                            <label htmlFor="phone">
                                                                Number
                                                                Handphone/Whatsapp{" "}
                                                                <span className="text-danger">
                                                                    *
                                                                </span>
                                                            </label>
                                                            <input
                                                                type="number"
                                                                className={`form-control ${errors.phone
                                                                    ? "is-invalid"
                                                                    : "text-secondary"
                                                                    }`}
                                                                id="phone"
                                                                value={
                                                                    data.phone
                                                                }
                                                                onChange={(e) =>
                                                                    setData(
                                                                        "phone",
                                                                        e.target
                                                                            .value
                                                                    )
                                                                }
                                                                required
                                                            />
                                                            {errors.phone && (
                                                                <div className="invalid-feedback">
                                                                    {
                                                                        errors.phone
                                                                    }
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6">
                                                        <div className="form-group">
                                                            <label htmlFor="email">
                                                                Email{" "}
                                                                <span className="text-danger">
                                                                    *
                                                                </span>
                                                            </label>
                                                            <input
                                                                type="email"
                                                                className={`form-control ${errors.email
                                                                    ? "is-invalid"
                                                                    : "text-secondary"
                                                                    }`}
                                                                id="email"
                                                                value={
                                                                    data.email
                                                                }
                                                                onChange={(e) =>
                                                                    setData(
                                                                        "email",
                                                                        e.target
                                                                            .value
                                                                    )
                                                                }
                                                                required
                                                            />
                                                            {errors.email && (
                                                                <div className="invalid-feedback">
                                                                    {
                                                                        errors.email
                                                                    }
                                                                </div>
                                                            )}
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
                                                        className={`form-control ${errors.previous_school
                                                            ? "is-invalid"
                                                            : "text-secondary"
                                                            }`}
                                                        id="previous_school"
                                                        value={
                                                            data.previous_school
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "previous_school",
                                                                e.target.value
                                                            )
                                                        }
                                                        required
                                                    />
                                                    {errors.previous_school && (
                                                        <div className="invalid-feedback">
                                                            {
                                                                errors.previous_school
                                                            }
                                                        </div>
                                                    )}
                                                </div>

                                                <div className="form-group">
                                                    <label htmlFor="hobbi">
                                                        Hobbies
                                                    </label>
                                                    <textarea
                                                        className="form-control text-secondary"
                                                        id="hobbi"
                                                        rows={2}
                                                        value={data.hobbi}
                                                        onChange={(e) =>
                                                            setData(
                                                                "hobbi",
                                                                e.target.value
                                                            )
                                                        }
                                                    />
                                                    {errors.hobbi && (
                                                        <div className="invalid-feedback">
                                                            {errors.hobbi}
                                                        </div>
                                                    )}
                                                </div>

                                                <div className="form-group">
                                                    <label htmlFor="achievement">
                                                        Achievements
                                                    </label>
                                                    <textarea
                                                        className="form-control text-secondary"
                                                        id="achievement"
                                                        rows={2}
                                                        value={data.achievement}
                                                        onChange={(e) =>
                                                            setData(
                                                                "achievement",
                                                                e.target.value
                                                            )
                                                        }
                                                    />
                                                    {errors.achievement && (
                                                        <div className="invalid-feedback">
                                                            {errors.achievement}
                                                        </div>
                                                    )}
                                                </div>
                                            </>
                                        )}

                                        {/* Tab 2: Student Parent Data */}
                                        {activeTab === 1 && (
                                            <>
                                                <div className="form-group">
                                                    <label htmlFor="father_name">
                                                        Father Name{" "}
                                                        <span className="text-danger">
                                                            *
                                                        </span>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className={`form-control ${errors.father_name
                                                            ? "is-invalid"
                                                            : "text-secondary"
                                                            }`}
                                                        id="father_name"
                                                        value={data.father_name}
                                                        onChange={(e) =>
                                                            setData(
                                                                "father_name",
                                                                e.target.value
                                                            )
                                                        }
                                                        required
                                                    />
                                                    {errors.father_name && (
                                                        <div className="invalid-feedback">
                                                            {errors.father_name}
                                                        </div>
                                                    )}
                                                </div>

                                                <div className="row">
                                                    <div className="col-lg-6">
                                                        <div className="form-group">
                                                            <label htmlFor="place_of_birth_father">
                                                                Place of Birth{" "}
                                                                <span className="text-danger">
                                                                    *
                                                                </span>
                                                            </label>
                                                            <input
                                                                type="text"
                                                                className={`form-control ${errors.place_of_birth_father
                                                                    ? "is-invalid"
                                                                    : "text-secondary"
                                                                    }`}
                                                                id="place_of_birth_father"
                                                                value={
                                                                    data.place_of_birth_father
                                                                }
                                                                onChange={(e) =>
                                                                    setData(
                                                                        "place_of_birth_father",
                                                                        e.target
                                                                            .value
                                                                    )
                                                                }
                                                                required
                                                            />
                                                            {errors.place_of_birth_father && (
                                                                <div className="invalid-feedback">
                                                                    {
                                                                        errors.place_of_birth_father
                                                                    }
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6">
                                                        <div className="form-group">
                                                            <label htmlFor="date_of_birth_father">
                                                                Date of Birth{" "}
                                                                <span className="text-danger">
                                                                    *
                                                                </span>
                                                            </label>
                                                            <input
                                                                type="date"
                                                                className={`form-control ${errors.date_of_birth_father
                                                                    ? "is-invalid"
                                                                    : "text-secondary"
                                                                    }`}
                                                                id="date_of_birth_father"
                                                                value={
                                                                    data.date_of_birth_father
                                                                }
                                                                onChange={(e) =>
                                                                    setData(
                                                                        "date_of_birth_father",
                                                                        e.target
                                                                            .value
                                                                    )
                                                                }
                                                                required
                                                            />
                                                            {errors.date_of_birth_father && (
                                                                <div className="invalid-feedback">
                                                                    {
                                                                        errors.date_of_birth_father
                                                                    }
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="form-group">
                                                    <label htmlFor="mother_name">
                                                        Mother Name{" "}
                                                        <span className="text-danger">
                                                            *
                                                        </span>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className={`form-control ${errors.mother_name
                                                            ? "is-invalid"
                                                            : "text-secondary"
                                                            }`}
                                                        id="mother_name"
                                                        value={data.mother_name}
                                                        onChange={(e) =>
                                                            setData(
                                                                "mother_name",
                                                                e.target.value
                                                            )
                                                        }
                                                        required
                                                    />
                                                    {errors.mother_name && (
                                                        <div className="invalid-feedback">
                                                            {errors.mother_name}
                                                        </div>
                                                    )}
                                                </div>

                                                <div className="row">
                                                    <div className="col-lg-6">
                                                        <div className="form-group">
                                                            <label htmlFor="place_of_birth_mother">
                                                                Place of Birth{" "}
                                                                <span className="text-danger">
                                                                    *
                                                                </span>
                                                            </label>
                                                            <input
                                                                type="text"
                                                                className={`form-control ${errors.place_of_birth_mother
                                                                    ? "is-invalid"
                                                                    : "text-secondary"
                                                                    }`}
                                                                id="place_of_birth_mother"
                                                                value={
                                                                    data.place_of_birth_mother
                                                                }
                                                                onChange={(e) =>
                                                                    setData(
                                                                        "place_of_birth_mother",
                                                                        e.target
                                                                            .value
                                                                    )
                                                                }
                                                                required
                                                            />
                                                            {errors.place_of_birth_mother && (
                                                                <div className="invalid-feedback">
                                                                    {
                                                                        errors.place_of_birth_mother
                                                                    }
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6">
                                                        <div className="form-group">
                                                            <label htmlFor="date_of_birth_mother">
                                                                Date of Birth{" "}
                                                                <span className="text-danger">
                                                                    *
                                                                </span>
                                                            </label>
                                                            <input
                                                                type="date"
                                                                className={`form-control ${errors.date_of_birth_mother
                                                                    ? "is-invalid"
                                                                    : "text-secondary"
                                                                    }`}
                                                                id="date_of_birth_mother"
                                                                value={
                                                                    data.date_of_birth_mother
                                                                }
                                                                onChange={(e) =>
                                                                    setData(
                                                                        "date_of_birth_mother",
                                                                        e.target
                                                                            .value
                                                                    )
                                                                }
                                                                required
                                                            />
                                                            {errors.date_of_birth_mother && (
                                                                <div className="invalid-feedback">
                                                                    {
                                                                        errors.date_of_birth_mother
                                                                    }
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="form-group">
                                                    <label htmlFor="number_of_siblings">
                                                        Number Of Siblings{" "}
                                                        <span className="text-danger">
                                                            *
                                                        </span>
                                                    </label>
                                                    <input
                                                        type="number"
                                                        className={`form-control ${errors.number_of_siblings
                                                            ? "is-invalid"
                                                            : "text-secondary"
                                                            }`}
                                                        id="number_of_siblings"
                                                        value={
                                                            data.number_of_siblings
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "number_of_siblings",
                                                                e.target.value
                                                            )
                                                        }
                                                        required
                                                    />
                                                    {errors.number_of_siblings && (
                                                        <div className="invalid-feedback">
                                                            {
                                                                errors.number_of_siblings
                                                            }
                                                        </div>
                                                    )}
                                                </div>

                                                <div className="row">
                                                    <div className="col-lg-6">
                                                        <div className="form-group">
                                                            <label htmlFor="phone_parent">
                                                                Number
                                                                Handphone/Whatsapp{" "}
                                                                <span className="text-danger">
                                                                    *
                                                                </span>
                                                            </label>
                                                            <input
                                                                type="text"
                                                                className={`form-control ${errors.phone_parent
                                                                    ? "is-invalid"
                                                                    : "text-secondary"
                                                                    }`}
                                                                id="phone_parent"
                                                                value={
                                                                    data.phone_parent
                                                                }
                                                                onChange={(e) =>
                                                                    setData(
                                                                        "phone_parent",
                                                                        e.target
                                                                            .value
                                                                    )
                                                                }
                                                                required
                                                            />
                                                            {errors.phone_parent && (
                                                                <div className="invalid-feedback">
                                                                    {
                                                                        errors.phone_parent
                                                                    }
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6">
                                                        <div className="form-group">
                                                            <label htmlFor="email_parent">
                                                                Email
                                                            </label>
                                                            <input
                                                                type="text"
                                                                className={`form-control ${errors.email_parent
                                                                    ? "is-invalid"
                                                                    : "text-secondary"
                                                                    }`}
                                                                id="email_parent"
                                                                value={
                                                                    data.email_parent
                                                                }
                                                                onChange={(e) =>
                                                                    setData(
                                                                        "email_parent",
                                                                        e.target
                                                                            .value
                                                                    )
                                                                }
                                                                required
                                                            />
                                                            {errors.email_parent && (
                                                                <div className="invalid-feedback">
                                                                    {
                                                                        errors.email_parent
                                                                    }
                                                                </div>
                                                            )}
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
                                                    <label htmlFor="father_address">
                                                        Father Address{" "}
                                                        <span className="text-danger">
                                                            *
                                                        </span>
                                                    </label>
                                                    <textarea
                                                        className={`form-control ${errors.father_address
                                                            ? "is-invalid"
                                                            : "text-secondary"
                                                            }`}
                                                        id="father_address"
                                                        rows={2}
                                                        value={
                                                            data.father_address
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "father_address",
                                                                e.target.value
                                                            )
                                                        }
                                                        required
                                                    />
                                                    {errors.father_address && (
                                                        <div className="invalid-feedback">
                                                            {
                                                                errors.father_address
                                                            }
                                                        </div>
                                                    )}
                                                </div>

                                                {/* Checkbox: Same with father */}
                                                <div className="form-check ml-4">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        id="same_with_father"
                                                        checked={
                                                            data.same_with_father
                                                        }
                                                        onChange={(e) => {
                                                            setData(
                                                                "same_with_father",
                                                                e.target.checked
                                                            );
                                                            if (
                                                                e.target.checked
                                                            ) {
                                                                setData(
                                                                    "mother_address",
                                                                    data.father_address
                                                                );
                                                            }
                                                        }}
                                                    />
                                                    <label
                                                        className="form-check-label"
                                                        htmlFor="same_with_father"
                                                    >
                                                        Same with father
                                                    </label>
                                                </div>

                                                {/* Student Residence Status */}
                                                {!data.same_with_father && (
                                                    <div className="form-group">
                                                        <label htmlFor="mother_address">
                                                            Mother Address{" "}
                                                            <span className="text-danger">
                                                                *
                                                            </span>
                                                        </label>
                                                        <textarea
                                                            className={`form-control ${errors.mother_address
                                                                ? "is-invalid"
                                                                : "text-secondary"
                                                                }`}
                                                            id="mother_address"
                                                            rows={2}
                                                            value={
                                                                data.mother_address
                                                            }
                                                            onChange={(e) =>
                                                                setData(
                                                                    "mother_address",
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                            required={
                                                                !data.same_with_father
                                                            }
                                                            disabled={
                                                                data.same_with_father
                                                            }
                                                        />
                                                        {errors.mother_address && (
                                                            <div className="invalid-feedback">
                                                                {
                                                                    errors.mother_address
                                                                }
                                                            </div>
                                                        )}
                                                    </div>
                                                )}

                                                <div className="form-group">
                                                    <label htmlFor="student_residence_status">
                                                        Student Residence Status{" "}
                                                        <span className="text-danger">
                                                            *
                                                        </span>
                                                    </label>
                                                    <select
                                                        className={`form-control ${errors.student_residence_status
                                                            ? "is-invalid"
                                                            : "text-secondary"
                                                            }`}
                                                        id="student_residence_status"
                                                        value={
                                                            data.student_residence_status
                                                        }
                                                        onChange={(e) => {
                                                            setData(
                                                                "student_residence_status",
                                                                e.target.value
                                                            );
                                                            // Auto-fill student address based on selection
                                                            if (
                                                                e.target
                                                                    .value ===
                                                                "Father"
                                                            ) {
                                                                setData(
                                                                    "student_address",
                                                                    data.father_address
                                                                );
                                                            } else if (
                                                                e.target
                                                                    .value ===
                                                                "Mother"
                                                            ) {
                                                                setData(
                                                                    "student_address",
                                                                    data.mother_address
                                                                );
                                                            }
                                                        }}
                                                        required
                                                    >
                                                        <option value="">
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
                                                    {errors.student_residence_status && (
                                                        <div className="invalid-feedback">
                                                            {
                                                                errors.student_residence_status
                                                            }
                                                        </div>
                                                    )}
                                                </div>

                                                {data.student_residence_status ===
                                                    "Other" && (
                                                        <div className="form-group">
                                                            <label htmlFor="student_address">
                                                                Student Address{" "}
                                                                <span className="text-danger">
                                                                    *
                                                                </span>
                                                            </label>
                                                            <textarea
                                                                className={`form-control ${errors.student_address
                                                                    ? "is-invalid"
                                                                    : "text-secondary"
                                                                    }`}
                                                                id="student_address"
                                                                rows={2}
                                                                value={
                                                                    data.student_address
                                                                }
                                                                onChange={(e) =>
                                                                    setData(
                                                                        "student_address",
                                                                        e.target
                                                                            .value
                                                                    )
                                                                }
                                                                required={
                                                                    data.student_residence_status ===
                                                                    "Other"
                                                                }
                                                            />
                                                            {errors.student_address && (
                                                                <div className="invalid-feedback">
                                                                    {
                                                                        errors.student_address
                                                                    }
                                                                </div>
                                                            )}
                                                        </div>
                                                    )}

                                                <div className="row">
                                                    <div className="col-lg-6">
                                                        <div className="form-group">
                                                            <label htmlFor="voucher_code">
                                                                Voucher/Code
                                                                Event
                                                            </label>
                                                            <input
                                                                type="voucher_code"
                                                                className={`form-control ${errors.voucher_code
                                                                    ? "is-invalid"
                                                                    : "text-secondary"
                                                                    }`}
                                                                id="voucher_code"
                                                                value={
                                                                    data.voucher_code
                                                                }
                                                                onChange={(e) =>
                                                                    setData(
                                                                        "voucher_code",
                                                                        e.target
                                                                            .value
                                                                    )
                                                                }
                                                            />
                                                            {errors.voucher_code && (
                                                                <div className="invalid-feedback">
                                                                    {
                                                                        errors.voucher_code
                                                                    }
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6">
                                                        <div className="form-group">
                                                            <label htmlFor="referral_by">
                                                                Referral By
                                                            </label>
                                                            <input
                                                                type="referral_by"
                                                                className={`form-control ${errors.referral_by
                                                                    ? "is-invalid"
                                                                    : "text-secondary"
                                                                    }`}
                                                                id="referral_by"
                                                                value={
                                                                    data.referral_by
                                                                }
                                                                onChange={(e) =>
                                                                    setData(
                                                                        "referral_by",
                                                                        e.target
                                                                            .value
                                                                    )
                                                                }
                                                            />
                                                            {errors.referral_by && (
                                                                <div className="invalid-feedback">
                                                                    {
                                                                        errors.referral_by
                                                                    }
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6">
                                                        <div className="form-check ml-4">
                                                            <input
                                                                className="form-check-input"
                                                                type="checkbox"
                                                                id="is_child_lscs"
                                                                checked={
                                                                    data.is_child_lscs
                                                                }
                                                                onChange={(e) =>
                                                                    setData(
                                                                        "is_child_lscs",
                                                                        e.target
                                                                            .checked
                                                                    )
                                                                }
                                                            />
                                                            <label
                                                                className="form-check-label"
                                                                htmlFor="is_child_lscs"
                                                            >
                                                                Having a child
                                                                attending LSCS
                                                            </label>
                                                        </div>
                                                    </div>
                                                </div>

                                                {data.is_child_lscs && (
                                                    <div className="form-group">
                                                        <label>
                                                            <strong>
                                                                Children
                                                                Information
                                                            </strong>
                                                        </label>
                                                        {data.children.map(
                                                            (child, index) => (
                                                                <div
                                                                    key={index}
                                                                    className="row mb-2"
                                                                >
                                                                    <div className="col-md-6">
                                                                        <input
                                                                            type="text"
                                                                            className={`form-control ${errors.children
                                                                                ? "is-invalid"
                                                                                : "text-secondary"
                                                                                }`}
                                                                            placeholder="Child's Name"
                                                                            value={
                                                                                child.name
                                                                            }
                                                                            onChange={(
                                                                                e
                                                                            ) =>
                                                                                handleChildChange(
                                                                                    index,
                                                                                    "name",
                                                                                    e
                                                                                        .target
                                                                                        .value
                                                                                )
                                                                            }
                                                                        />
                                                                    </div>
                                                                    <div className="col-md-4">
                                                                        <input
                                                                            type="text"
                                                                            className={`form-control ${errors.children
                                                                                ? "is-invalid"
                                                                                : "text-secondary"
                                                                                }`}
                                                                            placeholder="Class/Level"
                                                                            value={
                                                                                child.class_level
                                                                            }
                                                                            onChange={(
                                                                                e
                                                                            ) =>
                                                                                handleChildChange(
                                                                                    index,
                                                                                    "class_level",
                                                                                    e
                                                                                        .target
                                                                                        .value
                                                                                )
                                                                            }
                                                                        />
                                                                    </div>
                                                                    <div className="col-md-2">
                                                                        {data
                                                                            .children
                                                                            .length >
                                                                            1 && (
                                                                                <button
                                                                                    type="button"
                                                                                    className="btn btn-danger"
                                                                                    onClick={() =>
                                                                                        removeChild(
                                                                                            index
                                                                                        )
                                                                                    }
                                                                                >
                                                                                    Remove
                                                                                </button>
                                                                            )}
                                                                    </div>
                                                                </div>
                                                            )
                                                        )}
                                                        <button
                                                            type="button"
                                                            className="btn btn-success mt-2"
                                                            onClick={addChild}
                                                        >
                                                            Add Another Child
                                                        </button>
                                                    </div>
                                                )}

                                                <ReCAPTCHA
                                                    sitekey={siteKey}
                                                    onChange={(token) =>
                                                        setRecaptchaToken(token)
                                                    }
                                                    onExpired={() =>
                                                        setRecaptchaToken(null)
                                                    }
                                                />
                                            </>
                                        )}
                                    </div>
                                </div>

                                {/* Buttons */}
                                <div className="d-flex justify-content-between mt-4">
                                    {activeTab > 0 && (
                                        <button
                                            type="button"
                                            className="btn btn-primary"
                                            onClick={prevTab}
                                            disabled={processing}
                                        >
                                            Previous
                                        </button>
                                    )}
                                    {activeTab == 2 ? (
                                        <button
                                            type="submit"
                                            className="btn btn-success ms-auto"
                                            disabled={processing}
                                        >
                                            {processing
                                                ? "Processing..."
                                                : "Register"}
                                        </button>
                                    ) : (
                                        <button
                                            type="button"
                                            className="btn btn-success ms-auto"
                                            onClick={nextTab}
                                            disabled={processing}
                                        >
                                            Next
                                        </button>
                                    )}
                                </div>
                            </form>
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
                                <p
                                    dangerouslySetInnerHTML={{
                                        __html: modalMessage,
                                    }}
                                />
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

                {/* Modal Backdrop */}
                {showModal && <div className="modal-backdrop fade show"></div>}
            </Layout>
        </>
    );
};

export default Register;
