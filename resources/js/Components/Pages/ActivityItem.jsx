import React, { useState } from "react";

const ActivityItem = ({ activity }) => {
    const [showModal, setShowModal] = useState(false);
    const isVideo = activity.file?.match(/\.(mp4|webm|ogg)$/i);

    const handlePreview = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <>
            <div className="col-lg-4 course_col" key={activity.id}>
                <div
                    className="course feature trans_400"
                    onClick={handlePreview}
                    style={{ cursor: "pointer" }}
                >
                    <div className="course_image">
                        {isVideo ? (
                            <video
                                src={`/storage/${activity.file}`}
                                alt={activity.title}
                                style={{ width: "auto", height: "250px", objectFit: "cover" }}
                                muted
                            />
                        ) : (
                            <img
                                src={
                                    activity.file
                                        ? `/storage/${activity.file}`
                                        : "/img/logo.png"
                                }
                                alt={activity.title}
                                loading="lazy"
                                style={{ width: "auto", height: "250px", objectFit: "cover" }}
                            />
                        )}
                    </div>
                    <div className="course_body">
                        <h3 className="course_title text-center">
                            <a href="#">{activity.title}</a>
                        </h3>
                    </div>
                </div>
            </div>

            {showModal && (
                <div
                    style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: "rgba(0,0,0,0.8)",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        zIndex: 1000,
                    }}
                    onClick={handleCloseModal}
                >
                    <div
                        style={{
                            maxWidth: "90%",
                            maxHeight: "90%",
                            position: "relative",
                        }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={handleCloseModal}
                            style={{
                                position: "absolute",
                                top: "-40px",
                                right: "0",
                                background: "red",
                                color: "white",
                                border: "none",
                                borderRadius: "50%",
                                width: "30px",
                                height: "30px",
                                cursor: "pointer",
                            }}
                        >
                            X
                        </button>

                        {isVideo ? (
                            <video
                                src={`/storage/${activity.file}`}
                                controls
                                autoPlay
                                style={{ maxWidth: "100%", maxHeight: "80vh" }}
                            />
                        ) : (
                            <img
                                src={`/storage/${activity.file}`}
                                alt={activity.title}
                                style={{ maxWidth: "100%", maxHeight: "80vh" }}
                            />
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

export default ActivityItem;
