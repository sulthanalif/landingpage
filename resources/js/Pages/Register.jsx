import React, { useEffect, useState } from "react";
import Layout from "../Components/Layout";
import { Link, useForm } from "@inertiajs/react";
import useApi from "../Hooks/response";

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

    const [showModal, setShowModal] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [modalMessage, setModalMessage] = useState("");
    const [isSuccess, setIsSuccess] = useState(false);

    const {
        data: types,
        loading,
        error,
        get: getTypes,
    } = useApi("dataRegister");

    const discounts = types?.discounts;

    useEffect(() => {
        getTypes();
    }, []);

    const { data, setData, post, processing, errors, reset } = useForm({
        // Tab 1: Student Personal Data
        table_id: "",
        level: "",
        name: "",
        gender: "",
        religion: "",
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
    });

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

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // 1. Validasi data yang diperlukan untuk countFee
            if (!data.table_id || !data.level || !data.discount_id) {
                throw new Error("Program, level, dan discount harus dipilih");
            }

            // 2. Hitung biaya terlebih dahulu
            const feeResponse = await getFeeCalculation({
                jenjang: data.level,
                table_id: data.table_id,
                discount_id: data.discount_id,
            });

            if (feeResponse.error) {
                setModalTitle("Fee Calculation Failed");
                setModalMessage(
                    feeResponse.error.response?.data?.message ||
                        feeResponse.error.message ||
                        "Failed to calculate payment amount. Please try again."
                );
                setIsSuccess(false);
                setShowModal(true);
                return;
            }

            const feeData = feeResponse.data.data;

            // 3. Siapkan data form dengan hasil perhitungan biaya
            const formData = {
                ...data,
                amount: feeData.amount,
                discount: feeData.discount,
                total: feeData.total,
                // Konversi tanggal ke format Y-m-d
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
            post("/register", {
                data: formData,
                preserveScroll: true,
                onSuccess: () => {
                    setModalTitle("Registration Successful");
                    setModalMessage(
                        `Your registration has been submitted successfully. Total payment: Rp ${feeData.total.toLocaleString(
                            "id-ID"
                        )}. We will contact you soon.`
                    );
                    setIsSuccess(true);
                    setShowModal(true);
                    reset();
                },
                onError: (errors) => {
                    setModalTitle("Registration Failed");
                    setModalMessage(
                        "Please check your form and try again. " +
                            (errors.message || Object.values(errors).join(" "))
                    );
                    setIsSuccess(false);
                    setShowModal(true);

                    // Scroll ke field yang error
                    if (Object.keys(errors).length > 0) {
                        const firstErrorField = Object.keys(errors)[0];
                        document
                            .getElementById(firstErrorField)
                            ?.scrollIntoView({
                                behavior: "smooth",
                                block: "center",
                            });
                    }
                },
            });
        } catch (error) {
            setModalTitle("Fee Calculation Failed");
            setModalMessage(
                error.response?.data?.message ||
                    error.message ||
                    "Failed to calculate payment amount. Please try again."
            );
            setIsSuccess(false);
            setShowModal(true);
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
                                                                className={`form-control ${
                                                                    errors.table_id
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
                                                                className={`form-control ${
                                                                    errors.level
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
                                                        className={`form-control ${
                                                            errors.name
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
                                                                className={`form-control ${
                                                                    errors.gender
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
                                                                className={`form-control ${
                                                                    errors.religion
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
                                                        <div className="form-group">
                                                            <label htmlFor="place_of_birth">
                                                                Place of Birth{" "}
                                                                <span className="text-danger">
                                                                    *
                                                                </span>
                                                            </label>
                                                            <input
                                                                type="text"
                                                                className={`form-control ${
                                                                    errors.place_of_birth
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
                                                                className={`form-control ${
                                                                    errors.date_of_birth
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
                                                                type="text"
                                                                className={`form-control ${
                                                                    errors.phone
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
                                                                Email
                                                            </label>
                                                            <input
                                                                type="email"
                                                                className={`form-control ${
                                                                    errors.email
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

                                                <div className="row">
                                                    <div className="col-lg-6">
                                                        <div className="form-group">
                                                            <label htmlFor="previous-school">
                                                                Previous School
                                                                Name{" "}
                                                                <span className="text-danger">
                                                                    *
                                                                </span>
                                                            </label>
                                                            <input
                                                                type="text"
                                                                className={`form-control ${
                                                                    errors.previous_school
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
                                                                        e.target
                                                                            .value
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
                                                    </div>

                                                    <div className="col-lg-6">
                                                        <div className="form-group">
                                                            <label htmlFor="discount_id">
                                                                Refference{" "}
                                                                <span className="text-danger">
                                                                    *
                                                                </span>
                                                            </label>
                                                            <select
                                                                className={`form-control ${
                                                                    errors.discount_id
                                                                        ? "is-invalid"
                                                                        : "text-secondary"
                                                                }`}
                                                                id="discount_id"
                                                                value={
                                                                    data.discount_id
                                                                }
                                                                onChange={(e) =>
                                                                    setData(
                                                                        "discount_id",
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
                                                                    Refference---
                                                                </option>
                                                                {discounts?.map(
                                                                    (
                                                                        discount
                                                                    ) => (
                                                                        <option
                                                                            key={
                                                                                discount.id
                                                                            }
                                                                            value={
                                                                                discount.id
                                                                            }
                                                                        >
                                                                            {
                                                                                discount.name
                                                                            }
                                                                        </option>
                                                                    )
                                                                )}
                                                            </select>
                                                            {errors.discount_id && (
                                                                <div className="invalid-feedback">
                                                                    {
                                                                        errors.discount_id
                                                                    }
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
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
                                                        className={`form-control ${
                                                            errors.father_name
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
                                                                className={`form-control ${
                                                                    errors.place_of_birth_father
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
                                                                className={`form-control ${
                                                                    errors.date_of_birth_father
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
                                                        className={`form-control ${
                                                            errors.mother_name
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
                                                                className={`form-control ${
                                                                    errors.place_of_birth_mother
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
                                                                className={`form-control ${
                                                                    errors.date_of_birth_mother
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
                                                        type="text"
                                                        className={`form-control ${
                                                            errors.number_of_siblings
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
                                                                className={`form-control ${
                                                                    errors.phone_parent
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
                                                                className={`form-control ${
                                                                    errors.email_parent
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
                                                        className={`form-control ${
                                                            errors.father_address
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
                                                            className={`form-control ${
                                                                errors.mother_address
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
                                                        className={`form-control ${
                                                            errors.student_residence_status
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
                                                            className={`form-control ${
                                                                errors.student_address
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
                                            className="btn btn-primary ms-auto"
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

                {/* Modal Backdrop */}
                {showModal && <div className="modal-backdrop fade show"></div>}
            </Layout>
        </>
    );
};

export default Register;
