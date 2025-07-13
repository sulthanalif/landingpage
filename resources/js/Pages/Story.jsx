import { Link } from "@inertiajs/react";
import React, { useEffect, useState } from "react";
import Layout from "../Components/Layout";
import useApi from "../Hooks/response";

const Story = () => {
    useEffect(() => {
        const addCacheBuster = (url) => {
            return `${url}?v=${Date.now()}`;
        };

        const link1 = document.createElement("link");
        link1.rel = "stylesheet";
        link1.type = "text/css";
        link1.href = addCacheBuster("/landing/styles/blog.css");

        const link2 = document.createElement("link");
        link2.rel = "stylesheet";
        link2.type = "text/css";
        link2.href = addCacheBuster("/landing/styles/blog_responsive.css");

        const link3 = document.createElement("link");
        link3.rel = "stylesheet";
        link3.type = "text/css";
        link3.href = addCacheBuster("/landing/plugins/video-js/video-js.css");

        document.head.appendChild(link1);
        document.head.appendChild(link2);
        document.head.appendChild(link3);

        Promise.all([
            new Promise((resolve) => (link1.onload = resolve)),
            new Promise((resolve) => (link2.onload = resolve)),
            new Promise((resolve) => (link3.onload = resolve)),
        ]).then(() => {
            setIsLoaded(true);

            const script1 = document.createElement("script");
            script1.src = addCacheBuster("/landing/js/blog.js");
            script1.async = true;

            const script2 = document.createElement("script");
            script2.src = addCacheBuster(
                "/landing/plugins/video-js/video.min.js"
            );
            script2.async = true;

            const script3 = document.createElement("script");
            script3.src = addCacheBuster("/landing/plugins/masonry/masonry.js");
            script3.async = true;

            document.body.appendChild(script1);
            document.body.appendChild(script2);
            document.body.appendChild(script3);

            return () => {
                [script1, script2, script3].forEach((script) => {
                    if (document.body.contains(script)) {
                        document.body.removeChild(script);
                    }
                });
            };
        });

        return () => {
            [link1, link2, link3].forEach((link) => {
                if (document.head.contains(link)) {
                    document.head.removeChild(link);
                }
            });
        };
    }, []);

    const limitText = (html, limit = 150) => {
        if (!html) return "";

        const sanitizedHtml = html.replace(/<img[^>]*>/g, "");

        const tempElement = document.createElement("div");
        tempElement.innerHTML = sanitizedHtml;
        const textContent =
            tempElement.textContent || tempElement.innerText || "";

        return textContent.length > limit
            ? textContent.substring(0, limit) + "..."
            : textContent;
    };

    const { data: activities, loading, error, get: getActivities } = useApi("activities");

    const [isLoaded, setIsLoaded] = useState(false);
    const [selectedActivity, setSelectedActivity] = useState("");
    const [displayedPosts, setDisplayedPosts] = useState([]);

    useEffect(() => {
        getActivities();
    }, []);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const activityId = params.get("activityId");

        if (activityId) {
            setSelectedActivity(activityId);
        }
    }, []);

    useEffect(() => {
        if (!selectedActivity) {
            setDisplayedPosts(activities?.activities || []);
        } else {
            const selected = activities?.activities?.find(
                (activity) => String(activity.id) === String(selectedActivity)
            );
            setDisplayedPosts(selected?.sub_activities || []);
        }
    }, [selectedActivity, activities]);

    const handleActivityChange = (e) => {
        setSelectedActivity(e.target.value);
    };

    const handleActivityClick = (activityId) => {
        setSelectedActivity(String(activityId));
    };

    return (
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
                                        <li>Story</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="courses">
                <div
                    className="section_background parallax-window"
                    loading="lazy"
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
                                    Our Activities
                                </h2>
                                <div className="section_subtitle">
                                    <p>
                                        The following are activities at our
                                        school
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row mt-5">
                        <div className="col-lg-3 text-secondary">
                            <select
                                name="category"
                                className="form-control text-secondary"
                                value={selectedActivity}
                                onChange={handleActivityChange}
                            >
                                <option value="">All</option>
                                {activities?.activities?.map((activity) => (
                                    <option key={activity.id} value={activity.id}>
                                        {activity.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {loading ? (
                        <div className="col-lg-12 text-center py-5">
                            <div
                                className="spinner-border text-secondary"
                                role="status"
                            >
                                <span className="sr-only">Loading...</span>
                            </div>
                        </div>
                    ) : error ? (
                        <div className="col-lg-12 text-center py-5">
                            <div className="alert alert-danger">{error}</div>
                        </div>
                    ) : displayedPosts.length > 0 ? (
                        <>
                            <div className="row courses_row">
                                {displayedPosts.map((post) => (
                                    <div key={post.id} className="blog_post trans_200 col-lg-4 col-md-6 mb-4">
                                        <div className="blog_post_image">
                                            <img
                                                src={
                                                    post.image
                                                        ? `/storage/${post.image}`
                                                        : "/img/logo.png"
                                                }
                                                alt={post.title || post.label}
                                                className="img-fluid"
                                                style={{ width: "100%", height: "250px", objectFit: "cover" }}
                                            />
                                        </div>
                                        <div className="blog_post_body">
                                            <div className="blog_post_title">
                                                {post.label && (
                                                    <a
                                                        href="/story"
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            handleActivityClick(
                                                                post.id
                                                            );
                                                        }}
                                                        style={{
                                                            cursor: "pointer",
                                                        }}
                                                    >
                                                        {post.label}
                                                    </a>
                                                )}

                                                {post.title && (
                                                    <Link href={`/story/${post.id}`}>
                                                        {post.title}
                                                    </Link>
                                                )}
                                            </div>
                                            {post.title && (
                                                <div className="blog_post_meta">
                                                    <ul>
                                                        <li>
                                                            <a href="#">
                                                                {new Date(
                                                                    post.date
                                                                ).toLocaleDateString(
                                                                    "en-US",
                                                                    {
                                                                        month: "long",
                                                                        day: "numeric",
                                                                        year: "numeric",
                                                                    }
                                                                )}
                                                            </a>
                                                        </li>
                                                    </ul>
                                                </div>
                                            )}
                                            <div className="blog_post_text">
                                                <p
                                                    dangerouslySetInnerHTML={{
                                                        __html: limitText(post.description),
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {selectedActivity && (
                                <div className="text-center mt-3">
                                    <button className="btn btn-outline-secondary" onClick={() => setSelectedActivity("")}>
                                        Back to All Activities
                                    </button>
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="col-lg-12 course_col mt-4">
                            <div className="course">
                                <div className="course_body">
                                    <h3 className="course_title text-center">
                                        No activities or sub-activities found.
                                    </h3>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div >
        </Layout >
    );
};

export default Story;
