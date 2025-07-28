import React, { useEffect } from "react";

const Modal = ({ show, onClose, facility }) => {
    // Hook untuk mengunci scroll di body saat modal terbuka
    useEffect(() => {
        if (show) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
        // Cleanup function
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [show]);

    // Jangan render apa-apa jika 'show' adalah false
    if (!show) {
        return null;
    }

    return (
        <>
            <div
                className="modal fade show"
                style={{ display: "block" }}
                tabIndex={-1}
                onClick={onClose} // Menutup modal saat klik area gelap
            >
                <div
                    className="modal-dialog modal-lg modal-dialog-scrollable"
                    onClick={(e) => e.stopPropagation()} // Mencegah modal tertutup saat klik di dalam konten
                >
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">{facility?.title}</h4>
                            <button
                                type="button"
                                className="close"
                                aria-label="Close"
                                onClick={onClose}
                            >
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body text-center">
                            <img
                                src={
                                    facility?.image
                                        ? `storage/${facility.image}`
                                        : "/landing/images/facilities/icon_classroom.png"
                                }
                                alt={facility?.title}
                                className="img-fluid mb-4"
                                style={{ borderRadius: "8px" }}
                            />
                            <p
                                className="text-muted mb-3 text-justify"
                                style={{ lineHeight: "1.8" }}
                            >
                                {facility?.description}
                            </p>
                        </div>
                        <div className="modal-footer text-right">
                            <button
                                type="button"
                                className="btn btn-sm btn-secondary"
                                onClick={onClose}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal-backdrop fade show"></div>
        </>
    );
};

export default Modal;
