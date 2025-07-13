import React, { useEffect, useRef, useState } from "react";
import Layout from "../Components/Layout";
import { Link, usePage } from "@inertiajs/react";
import useApi from "../Hooks/response";
import ActivityItem from "../Components/Pages/ActivityItem";

const DetailStory = ({ id }) => {
    const styleRefs = useRef([]);
    const scriptRefs = useRef([]);
    const videoRef = useRef(null);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const addFile = (type, attributes, target) => {
            const file = document.createElement(type);
            Object.entries(attributes).forEach(([key, value]) => {
                file[key] = value;
            });
            target.appendChild(file);
            return file;
        };

        styleRefs.current = [
            addFile(
                "link",
                { rel: "stylesheet", href: "/landing/styles/blog_single.css" },
                document.head
            ),
            addFile(
                "link",
                {
                    rel: "stylesheet",
                    href: "/landing/styles/blog_single_responsive.css",
                },
                document.head
            ),
        ];

        scriptRefs.current = [
            addFile(
                "script",
                { src: "/landing/js/blog_single.js", async: true },
                document.body
            ),
            addFile(
                "script",
                {
                    src: "/landing/plugins/colorbox/jquery.colorbox-min.js",
                    async: true,
                },
                document.body
            ),
        ];

        setIsLoaded(true);

        return () => {
            styleRefs.current.forEach(
                (file) => file && file.parentNode.removeChild(file)
            );
            scriptRefs.current.forEach(
                (file) => file && file.parentNode.removeChild(file)
            );
        };
    }, []);

    const { data, loading, error, get: getData } = useApi(`/activity/${id}`);

    const activity = data?.activity;

    const handleRefresh = () => {
        getData();
    };

    const convertToEmbedUrl = (url) => {
        try {
            const ytMatch = url.match(
                /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]{11})/
            );

            if (ytMatch && ytMatch[1]) {
                return `https://www.youtube.com/embed/${ytMatch[1]}`;
            }

            // Fallback to original if not YouTube
            return url;
        } catch (e) {
            return url;
        }
    };

    if (!isLoaded || loading) {
        return (
            <Layout>
                <div className="preloader">
                    <div className="spinner-border text-primary" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
            </Layout>
        );
    }

    if (error) {
        return (
            <Layout>
                <div className="alert alert-danger">
                    Failed to load news data.
                    <button onClick={handleRefresh}>Try again</button>
                </div>
            </Layout>
        );
    }

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
                                        <li>
                                            <Link href="/story">Story</Link>
                                        </li>
                                        <li>{activity?.title || "Detail Story"}</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="blog">
                <div className="container">
                    <div className="row">
                        {/* Blog Content */}
                        <div className="col-lg-12">
                            {activity ? (
                                <div className="blog_content">
                                    <div className="blog_title">
                                        {activity.title}
                                    </div>
                                    <div className="blog_meta">
                                        <ul>
                                            <li>
                                                Post on{" "}
                                                <a href="#">
                                                    {new Date(
                                                        activity.date
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
                                    <div className="blog_image">
                                        <img
                                            src={
                                                activity.image
                                                    ? `/storage/${activity.image}`
                                                    : "/landing/images/event_1.jpg"
                                            }
                                            alt={activity.title}
                                            loading="lazy"
                                        />
                                    </div>
                                    <div
                                        className="blog_text mt-3"
                                        dangerouslySetInnerHTML={{
                                            __html: activity.description,
                                        }}
                                    />
                                    <div className="blog_text mt-3">
                                        Below is a gallery of activities {activity.title} :
                                    </div>
                                    <div className="blog_image row">
                                        {activity.library.length > 0 ? (
                                            activity.library.map(
                                                (item, index) => (
                                                    <ActivityItem key={index} activity={item} />
                                                )
                                            )
                                        ) : (
                                            <div className="alert alert-warning">
                                                No image found
                                            </div>
                                        )}
                                    </div>
                                    <div className="blog_image row">
                                        {activity.videos && (
                                            activity.videos.map(
                                                (item, index) => {
                                                    const embedUrl = convertToEmbedUrl(item.url);

                                                    return (
                                                        <div className="col-lg-4 course_col" key={index}>
                                                            <iframe
                                                                src={embedUrl}
                                                                title={item.label}
                                                                width="100%"
                                                                height="350"
                                                                frameBorder="0"
                                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                                allowFullScreen
                                                            ></iframe>
                                                        </div>
                                                    );
                                                }
                                            )
                                        )}
                                    </div>
                                </div>
                            ) : (
                                <div className="alert alert-warning">
                                    Activity not found
                                </div>
                            )}

                            <div className="blog_extra d-flex flex-lg-row flex-column align-items-lg-center align-items-start justify-content-start">
                                <div className="blog_social ml-lg-auto">
                                    <span>Follow Us: </span>
                                    <ul>
                                        <li>
                                            <a
                                                href="https://www.facebook.com/pages/category/Community/Lia-Stephanie-School-115071265257740/"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                <i
                                                    className="fa fa-facebook"
                                                    aria-hidden="true"
                                                />
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href="https://www.instagram.com/liastephanieschool/"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                <i
                                                    className="fa fa-instagram"
                                                    aria-hidden="true"
                                                />
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href="https://wa.me/+6281310602139"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                <i
                                                    className="fa fa-whatsapp"
                                                    aria-hidden="true"
                                                />
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href="https://lsgs.quintal.id/"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                <i
                                                    className="fa fa-leanpub"
                                                    aria-hidden="true"
                                                />
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default DetailStory;
