import React from "react";

const CareerItem = ({ career }) => {
    return (
        <>
            <div className="col-lg-4 feature_col">
                <a
                    type="button"
                    data-toggle="modal"
                    data-target={`#career-${career.id}`}
                    aria-label={`View details about ${career.name}`}
                >
                    <div className="feature text-center trans_400 px-3 py-4">
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
                    </div>
                </a>
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
                    </div>
                </div>
            </div>
        </>
    );
};

export default CareerItem;
