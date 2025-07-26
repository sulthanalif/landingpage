import { useForm } from "@inertiajs/react";
import React, { useState } from "react";
import useApi from "../../Hooks/response";

const CareerItem = ({ career }) => {
    const [showModal, setShowModal] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [modalMessage, setModalMessage] = useState("");
    const [isSuccess, setIsSuccess] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        location: "",
        birth_date: "",
        phone_number: "",
        description: "",
        cv: "",
    });

    const { post: postApply } = useApi(`/careers/${career.id}`, {
        fetchOnMount: false,
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const applyResponse = await postApply(data);

            setModalTitle("Success");
            setModalMessage("Your application has been sent successfully!");
            setIsSuccess(true);
            setShowModal(true);
            reset();
        } catch (error) {
            setModalTitle("Application Failed to Send");

            const errors = error.response?.data?.errors;
            if (errors) {
                let errorMessage = `
                <p>Please check the following errors:</p>
                <ul>
                    ${Object.entries(errors)
                        .map(
                            ([field, message]) =>
                                `<li><strong>${field}:</strong> ${message}</li>`
                        )
                        .join("")}
                </ul>
            `;

                setModalMessage(errorMessage);
                setIsSuccess(false);
                setShowModal(true);

                const firstErrorField = Object.keys(errors)[0];
                const errorElement = document.getElementById(firstErrorField);
                if (errorElement) {
                    errorElement.scrollIntoView({
                        behavior: "smooth",
                        block: "center",
                    });
                    errorElement.focus();
                }
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
            window.location.href = "/career";
        }
    };

    return (
        <>
            <div className="col-lg-4 feature_col">
                <div className="feature text-center trans_400 px-3 py-4">
                    <a
                        type="button"
                        data-toggle="modal"
                        data-target={`#career-${career.id}`}
                        aria-label={`View details about ${career.name}`}
                    >
                        <div className="feature_icon">
                            <img
                                src="/landing/images/icon_briefcase.png"
                                alt=""
                                style={{ height: "50px" }}
                            />
                        </div>
                        <h3 className="feature_title mt-3">{career.title}</h3>
                        <div className="d-flex flex-row row bd-highlight m-2">
                            <div className="p-1 bd-highlight">
                                <span className="p-2 badge badge-secondary font-weight-bold">
                                    {career.level == "fresh_graduate"
                                        ? "Fresh Graduate"
                                        : "Experienced"}
                                </span>
                            </div>
                            <div className="p-1 bd-highlight">
                                <span className="p-2 badge badge-secondary font-weight-bold">
                                    {career?.employment_type === "full_time"
                                        ? "Full Time"
                                        : career?.employment_type ===
                                            "part_time"
                                            ? "Part Time"
                                            : career?.employment_type === "contract"
                                                ? "Contract"
                                                : career?.employment_type ===
                                                    "freelance"
                                                    ? "Freelance"
                                                    : "Internship"}
                                </span>
                            </div>
                            <div className="p-1 bd-highlight">
                                <span className="p-2 badge badge-secondary font-weight-bold">
                                    {career.location}
                                </span>
                            </div>
                            <div className="p-1 bd-highlight">
                                <span className="p-2 badge badge-secondary font-weight-bold">
                                    {new Intl.NumberFormat("id-ID", {
                                        style: "currency",
                                        currency: "IDR",
                                        minimumFractionDigits: 0,
                                        maximumFractionDigits: 0,
                                    }).format(career.salary_min)}
                                    -
                                    {new Intl.NumberFormat("id-ID", {
                                        style: "currency",
                                        currency: "IDR",
                                        minimumFractionDigits: 0,
                                        maximumFractionDigits: 0,
                                    }).format(career.salary_max)}
                                </span>
                            </div>
                        </div>
                    </a>
                    <div className="card-footer text-right">
                        <button
                            type="button"
                            className="btn btn-sm btn-primary"
                            data-toggle="modal"
                            data-target={`#apply-${career.id}`}
                        >
                            Apply Job
                        </button>
                    </div>
                </div>
            </div>

            <div
                className="modal fade"
                id={`career-${career.id}`}
                tabIndex={-1}
                aria-labelledby={`career-${career.id}-label`}
                aria-hidden="true"
            >
                <div className="modal-dialog modal-lg modal-dialog-scrollable">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4
                                className="modal-title"
                                id={`career-${career.id}-label`}
                            >
                                Job Detail
                            </h4>
                            <button
                                type="button"
                                className="close"
                                data-dismiss="modal"
                                aria-label="Close"
                            >
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="pl-md-3">
                                <h3 className="text-primary mb-3 text-center">
                                    {career.title}
                                </h3>
                                <div className="d-flex flex-row row bd-highlight mb-2">
                                    <div className="p-1 bd-highlight">
                                        <span className="p-2 badge badge-secondary">
                                            <h5 className="text-light">
                                                {career.level ==
                                                    "fresh_graduate"
                                                    ? "Fresh Graduate"
                                                    : "Experienced"}
                                            </h5>
                                        </span>
                                    </div>
                                    <div className="p-1 bd-highlight">
                                        <span className="p-2 badge badge-secondary">
                                            <h5 className="text-light">
                                                {career?.employment_type ===
                                                    "full_time"
                                                    ? "Full Time"
                                                    : career?.employment_type ===
                                                        "part_time"
                                                        ? "Part Time"
                                                        : career?.employment_type ===
                                                            "contract"
                                                            ? "Contract"
                                                            : "Freelance"}
                                            </h5>
                                        </span>
                                    </div>
                                    <div className="p-1 bd-highlight">
                                        <span className="p-2 badge badge-secondary">
                                            <h5 className="text-light">
                                                {career.location}
                                            </h5>
                                        </span>
                                    </div>
                                    <div className="p-1 bd-highlight">
                                        <span className="p-2 badge badge-secondary">
                                            <h5 className="text-light">
                                                {new Intl.NumberFormat(
                                                    "id-ID",
                                                    {
                                                        style: "currency",
                                                        currency: "IDR",
                                                        minimumFractionDigits: 0,
                                                        maximumFractionDigits: 0,
                                                    }
                                                ).format(career.salary_min)}
                                                -
                                                {new Intl.NumberFormat(
                                                    "id-ID",
                                                    {
                                                        style: "currency",
                                                        currency: "IDR",
                                                        minimumFractionDigits: 0,
                                                        maximumFractionDigits: 0,
                                                    }
                                                ).format(career.salary_max)}
                                            </h5>
                                        </span>
                                    </div>
                                </div>
                                <div className="d-flex flex-row row bd-highlight mb-2">
                                    <div className="p-2 bd-highlight">
                                        <i className="fa fa-calendar"></i>
                                        <span className="text-muted ml-2">
                                            {new Date(
                                                career.start_date
                                            ).toLocaleDateString("en-GB", {
                                                day: "2-digit",
                                                month: "short",
                                                year: "numeric",
                                            })}{" "}
                                            -{" "}
                                            {new Date(
                                                career.end_date
                                            ).toLocaleDateString("en-GB", {
                                                day: "2-digit",
                                                month: "short",
                                                year: "numeric",
                                            })}
                                        </span>
                                    </div>
                                </div>
                                <h4 className="font-weight-bold mb-1">
                                    Description
                                </h4>
                                <p
                                    className="text-muted mb-3"
                                    style={{ lineHeight: "1.8" }}
                                    dangerouslySetInnerHTML={{
                                        __html: career.description,
                                    }}
                                />
                                <h4 className="font-weight-bold mb-1">
                                    Requirement
                                </h4>
                                <p
                                    className="text-muted mb-3"
                                    style={{ lineHeight: "1.8" }}
                                    dangerouslySetInnerHTML={{
                                        __html: career.requirement,
                                    }}
                                />
                            </div>
                        </div>
                        <div className="modal-footer text-right">
                            <button
                                type="button"
                                className="btn btn-sm btn-primary"
                                data-toggle="modal"
                                data-target={`#apply-${career.id}`}
                            >
                                Apply Job
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div
                className="modal fade"
                id={`apply-${career.id}`}
                tabIndex={-1}
                aria-labelledby={`apply-${career.id}-label`}
                aria-hidden="true"
            >
                <div className="modal-dialog modal-lg modal-dialog-scrollable">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h3
                                className="modal-title"
                                id={`apply-${career.id}-label`}
                            >
                                Apply for {career.title}
                            </h3>
                            <button
                                type="button"
                                className="close"
                                data-dismiss="modal"
                                aria-label="Close"
                            >
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <form
                            onSubmit={handleSubmit}
                            encType="multipart/form-data"
                        >
                            <div className="modal-body">
                                <div className="form-group">
                                    <label htmlFor="description">
                                        Tell us about yourself{" "}
                                        <span className="text-danger">*</span>
                                    </label>
                                    <textarea
                                        className={`form-control ${errors.description
                                                ? "is-invalid"
                                                : "text-secondary"
                                            }`}
                                        id="description"
                                        rows={3}
                                        value={data.description}
                                        onChange={(e) =>
                                            setData(
                                                "description",
                                                e.target.value
                                            )
                                        }
                                        required
                                    />
                                    {errors.description && (
                                        <div className="invalid-feedback">
                                            {errors.description}
                                        </div>
                                    )}
                                </div>

                                <div className="row">
                                    <div className="col-lg-6">
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
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="form-group">
                                            <label htmlFor="birth_date">
                                                Date of Birth{" "}
                                                <span className="text-danger">
                                                    *
                                                </span>
                                            </label>
                                            <input
                                                type="date"
                                                className={`form-control ${errors.birth_date
                                                        ? "is-invalid"
                                                        : "text-secondary"
                                                    }`}
                                                id="birth_date"
                                                value={data.birth_date}
                                                onChange={(e) =>
                                                    setData(
                                                        "birth_date",
                                                        e.target.value
                                                    )
                                                }
                                                required
                                            />
                                            {errors.birth_date && (
                                                <div className="invalid-feedback">
                                                    {errors.birth_date}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
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
                                                value={data.email}
                                                onChange={(e) =>
                                                    setData(
                                                        "email",
                                                        e.target.value
                                                    )
                                                }
                                                required
                                            />
                                            {errors.email && (
                                                <div className="invalid-feedback">
                                                    {errors.email}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="form-group">
                                            <label htmlFor="phone_number">
                                                Phone Number/Whatsapp{" "}
                                                <span className="text-danger">
                                                    *
                                                </span>
                                            </label>
                                            <input
                                                type="number"
                                                className={`form-control ${errors.phone_number
                                                        ? "is-invalid"
                                                        : "text-secondary"
                                                    }`}
                                                id="phone_number"
                                                value={data.phone_number}
                                                onChange={(e) =>
                                                    setData(
                                                        "phone_number",
                                                        e.target.value
                                                    )
                                                }
                                                required
                                            />
                                            {errors.phone_number && (
                                                <div className="invalid-feedback">
                                                    {errors.phone_number}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-lg-6">
                                        <div className="form-group">
                                            <label htmlFor="location">
                                                Current Location{" "}
                                                <span className="text-danger">
                                                    *
                                                </span>
                                            </label>
                                            <input
                                                type="text"
                                                className={`form-control ${errors.location
                                                        ? "is-invalid"
                                                        : "text-secondary"
                                                    }`}
                                                id="location"
                                                value={data.location}
                                                onChange={(e) =>
                                                    setData(
                                                        "location",
                                                        e.target.value
                                                    )
                                                }
                                                required
                                            />
                                            {errors.location && (
                                                <div className="invalid-feedback">
                                                    {errors.location}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="form-group">
                                            <label htmlFor="cv-upload">
                                                Upload Resume{" "}
                                                <span className="text-danger">
                                                    *
                                                </span>
                                            </label>
                                            <div className="file-upload-wrapper">
                                                <label
                                                    htmlFor="cv-upload"
                                                    className="file-upload-button btn-primary"
                                                >
                                                    Choose File
                                                </label>
                                                <span
                                                    className="file-upload-filename"
                                                    id="file-name"
                                                >
                                                    No file selected
                                                </span>
                                                <input
                                                    type="file"
                                                    id="cv-upload"
                                                    name="cv"
                                                    className="file-upload-input"
                                                    accept="application/pdf"
                                                    onChange={(e) => {
                                                        const file =
                                                            e.target.files?.[0];
                                                        const fileNameSpan =
                                                            document.getElementById(
                                                                "file-name"
                                                            );

                                                        if (!file) {
                                                            fileNameSpan.textContent =
                                                                "No file selected";
                                                            return;
                                                        }

                                                        if (
                                                            file.type !==
                                                            "application/pdf"
                                                        ) {
                                                            alert(
                                                                "Only PDF files are allowed."
                                                            );
                                                            e.target.value = "";
                                                            fileNameSpan.textContent =
                                                                "No file selected";
                                                            return;
                                                        }

                                                        fileNameSpan.textContent =
                                                            file.name;
                                                        setData("cv", file); // Simpan file sebagai File object
                                                    }}
                                                    required
                                                    hidden
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    data-dismiss="modal"
                                >
                                    Close
                                </button>
                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                    disabled={processing}
                                >
                                    {processing ? "Sending..." : "Submit"}
                                </button>
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
        </>
    );
};

export default CareerItem;
