import React from "react";

const TeacherItem = ({ teacher }) => {
    return (
        <>
            <a
                type="button"
                data-toggle="modal"
                data-target={`#teacher-${teacher.id}`}
                aria-label={`View details about ${teacher.name}`}
            >
                <div className="teacher-card">
                    <div className="teacher-photo-container">
                        <img
                            src={`/storage/${teacher.image}`}
                            alt={teacher.name}
                            className="teacher-photo"
                        />
                        <img
                            src={`/storage/${teacher.logo}`}
                            alt={teacher.name}
                            className="teacher-mascot rounded"
                        />
                    </div>
                    <div className="teacher-info">
                        <h3 className="teacher-name text-capitalize">
                            {teacher.name}
                        </h3>
                        <p className="teacher-position text-secondary">{teacher.email}</p>
                    </div>
                </div>
            </a>

            <div
                className="modal fade"
                id={`teacher-${teacher.id}`}
                tabIndex={-1}
                aria-labelledby={`teacher-${teacher.id}-label`}
                aria-hidden="true"
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5
                                className="modal-title"
                                id={`teacher-${teacher.id}-label`}
                            >
                                Teacher Detail
                            </h5>
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
                            <div className="row no-gutters">
                                <div className="col-md-5 mb-4 mb-md-0">
                                    <div className="position-relative">
                                        <img
                                            src={`/storage/${teacher.image}`}
                                            alt={teacher.name}
                                            className="img-fluid rounded-lg shadow-sm"
                                            style={{
                                                width: "100%",
                                                height: "300px",
                                                objectFit: "cover",
                                                objectPosition: "top",
                                            }}
                                        />
                                    </div>
                                    <div className="mt-3 text-center">
                                        <h4 className="mb-1">{teacher.name}</h4>
                                        <span className="badge badge-pill badge-primary px-3 py-2">
                                            {teacher.code_id}
                                        </span>
                                    </div>
                                </div>
                                <div className="col-md-7">
                                    <div className="pl-md-3">
                                        <h5 className="text-primary mb-3">
                                            About Me
                                        </h5>
                                        <p
                                            className="text-muted mb-4"
                                            style={{ lineHeight: "1.8" }}
                                        >
                                            {teacher.bio ||
                                                "No biography available yet."}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default TeacherItem;
