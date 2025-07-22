import React, { useEffect } from "react";
import Layout from "../Components/Layout";
import { Link } from "@inertiajs/react";
import TeacherItem from "../Components/Pages/TeacherItem";
import useApi from "../Hooks/response";

const Teacher = () => {
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

    const {
        data: teachers,
        loading,
        error,
        get: getTeachers,
    } = useApi("teachers");

    const teacherDatas = teachers && teachers.teachers ? teachers.teachers : [];

    const groupedTeachers = teacherDatas.reduce((groups, teacher) => {
        const category = teacher.category || "Uncategorized";
        if (!groups[category]) {
            groups[category] = [];
        }
        groups[category].push(teacher);
        return groups;
    }, {});

    const sortedCategories = Object.keys(groupedTeachers).sort((a, b) => {
        const order = [];
        const indexA = order.indexOf(a);
        const indexB = order.indexOf(b);

        if (indexA === -1) return 1;
        if (indexB === -1) return -1;
        return indexA - indexB;
    });

    const handleRefresh = () => {
        getTeachers();
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
                                            <li>Teacher</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="team">
                    <div
                        className="team_background parallax-window"
                        data-parallax="scroll"
                        data-speed="0.8"
                        style={{
                            backgroundImage: `url('/landing/images/courses_background.jpg')`,
                            backgroundAttachment: "fixed",
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                        }}
                    />
                    <div className="container">
                        <div className="row">
                            <div className="col">
                                <div className="section_title_container text-center">
                                    <h2 className="section_title">
                                        Meet Our Exceptional Educators
                                    </h2>
                                    <div className="section_subtitle">
                                        <p>
                                            Meet our certified and experienced teachers, committed to fostering student growth through personalized instruction and innovative educational approaches.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="row mt-5">
                            {loading ? (
                                <div className="col-12 text-center py-5">
                                    <div
                                        className="spinner-border text-primary"
                                        role="status"
                                    >
                                        <span className="sr-only">
                                            Loading...
                                        </span>
                                    </div>
                                </div>
                            ) : error ? (
                                <div className="col-12 text-center py-5">
                                    <div className="alert alert-danger">
                                        {error}
                                    </div>
                                </div>
                            ) : teachers && teachers.teachers.length > 0 ? (
                                sortedCategories.map((category) => (
                                    <div key={category} className="col-12 mb-5">
                                        <h3 className="category-title">
                                            # {category}
                                        </h3>
                                        <div className="teacher-grid mt-3">
                                            {groupedTeachers[category]
                                                .sort((a, b) =>
                                                    a.order - b.order
                                                )
                                                .map((teacher) => (
                                                    <TeacherItem key={teacher.id}
                                                        teacher={teacher}
                                                    />
                                                ))}
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="col-12 text-center py-5">
                                    <div className="alert alert-info">
                                        No teachers data available
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    );
};

const TeamItem = ({ imgSrc, name }) => {
    return (
        <>
            <div className="col-lg-3 col-md-6 team_col">
                <div className="team_item">
                    <div className="team_image">
                        <img src={imgSrc} alt={name} />
                    </div>
                    <div className="team_body">
                        <div className="team_title">
                            <a
                                href={imgSrc}
                                className="text-capitalize"
                                target="_blank"
                            >
                                {name}
                            </a>
                        </div>
                        {/* <div className="team_subtitle">
                            Marketing &amp; Management
                        </div>
                        <div className="social_list">
                            <ul>
                                <li>
                                    <a href="#">
                                        <i
                                            className="fa fa-facebook"
                                            aria-hidden="true"
                                        />
                                    </a>
                                </li>
                                <li>
                                    <a href="#">
                                        <i
                                            className="fa fa-twitter"
                                            aria-hidden="true"
                                        />
                                    </a>
                                </li>
                                <li>
                                    <a href="#">
                                        <i
                                            className="fa fa-google-plus"
                                            aria-hidden="true"
                                        />
                                    </a>
                                </li>
                            </ul>
                        </div> */}
                    </div>
                </div>
            </div>
        </>
    );
};

// const TeacherItem = ({ imgSrc, name, position, bio }) => {
//     return (
//         <>
//             <a
//                 type="button"
//                 data-toggle="modal"
//                 data-target={`#${name.replace(/\s+/g, "-").toLowerCase()}`}
//             >
//                 <div className="teacher-card">
//                     <div className="teacher-photo-container">
//                         <img src={imgSrc} alt="Ari" className="teacher-photo" />
//                         <img
//                             src={imgSrc}
//                             alt="Mascot"
//                             className="teacher-mascot"
//                         />
//                     </div>
//                     <div className="teacher-info">
//                         <h3 className="teacher-name text-capitalize">{name}</h3>
//                         <p className="teacher-position">{position}</p>
//                     </div>
//                 </div>
//             </a>

//             <div
//                 className="modal fade"
//                 id={`${name.replace(/\s+/g, "-").toLowerCase()}`}
//                 tabIndex={-1}
//                 aria-labelledby={`${name
//                     .replace(/\s+/g, "-")
//                     .toLowerCase()}-label`}
//                 aria-hidden="true"
//             >
//                 <div className="modal-dialog">
//                     <div className="modal-content">
//                         <div className="modal-header">
//                             <h5
//                                 className="modal-title"
//                                 id={`${name
//                                     .replace(/\s+/g, "-")
//                                     .toLowerCase()}-label`}
//                             >
//                                 Teacher Detail
//                             </h5>
//                             <button
//                                 type="button"
//                                 className="close"
//                                 data-dismiss="modal"
//                                 aria-label="Close"
//                             >
//                                 <span aria-hidden="true">&times;</span>
//                             </button>
//                         </div>
//                         <div className="modal-body">
//                             <div className="row no-gutters">
//                                 <div className="col-md-5 mb-4 mb-md-0">
//                                     <div className="position-relative">
//                                         <img
//                                             src={imgSrc}
//                                             alt={name}
//                                             className="img-fluid rounded-lg shadow-sm"
//                                             style={{
//                                                 width: "100%",
//                                                 height: "300px",
//                                                 objectFit: "cover",
//                                                 objectPosition: "top",
//                                             }}
//                                         />
//                                     </div>
//                                     <div className="mt-3 text-center">
//                                         <h4 className="mb-1">{name}</h4>
//                                         <span className="badge badge-pill badge-primary px-3 py-2">
//                                             {position}
//                                         </span>
//                                     </div>
//                                 </div>
//                                 <div className="col-md-7">
//                                     <div className="pl-md-3">
//                                         <h5 className="text-primary mb-3">
//                                             About Me
//                                         </h5>
//                                         <p
//                                             className="text-muted mb-4"
//                                             style={{ lineHeight: "1.8" }}
//                                         >
//                                             {bio ||
//                                                 "No biography available yet."}
//                                         </p>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// };

export default Teacher;
