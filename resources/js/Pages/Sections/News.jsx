import React from "react";

const News = ({ posts }) => {
    const limitText = (html, limit = 50) => {
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

    return (
        <div className="news">
            <div className="container">
                <div className="row">
                    <div className="col">
                        <div className="section_title_container text-center">
                            <h2 className="section_title">Latest News</h2>
                            <div className="section_subtitle">
                                <p>
                                    Stay updated with our latest articles and
                                    insights.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {posts && Array.isArray(posts.data) && posts.data.length > 0 ? ( // Simplified condition
                    <div className="row news_row">
                        <div className="col-lg-7 news_col">
                            <div className="news_post_large_container">
                                <div className="news_post_large">
                                    <div className="news_post_image">
                                        <img
                                            src={
                                                posts.data[0]?.image ||
                                                "/landing/images/news_1.jpg"
                                            }
                                            alt={posts.data[0]?.title}
                                            loading="lazy"
                                        />
                                    </div>
                                    <div className="news_post_large_title">
                                        <a href={`/posts/${posts.data[0]?.id}`}>
                                            {posts.data[0]?.title}
                                        </a>
                                    </div>
                                    <div className="news_post_meta">
                                        <ul>
                                            <li>
                                                <a href="#">Admin</a>
                                            </li>
                                            <li>
                                                <a href="#">
                                                    {new Date(
                                                        posts.data[0]?.created_at
                                                    ).toLocaleDateString()}
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="news_post_text">
                                        <p
                                            dangerouslySetInnerHTML={{
                                                __html: limitText(
                                                    posts.data[0]?.body
                                                ),
                                            }}
                                        />
                                    </div>
                                    <div className="news_post_link">
                                        <a href={`/posts/${posts.data[0]?.id}`}>
                                            Read More
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-5 news_col">
                            <div className="news_posts_small">
                                {posts.data.slice(1).map((post) => (
                                    <div
                                        key={post.id}
                                        className="news_post_small"
                                    >
                                        <div className="news_post_small_title">
                                            <a href={`/posts/${post.id}`}>
                                                {post.title}
                                            </a>
                                        </div>
                                        <div className="news_post_meta">
                                            <ul>
                                                <li>
                                                    <a href="#">Admin</a>
                                                </li>
                                                <li>
                                                    <a href="#">
                                                        {new Date(
                                                            post.created_at
                                                        ).toLocaleDateString()}
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="row news_row">
                        <div className="col-lg-12 news_col">
                            <div className="text-center">
                                <h4 className="text-gray-500">
                                    No news available.
                                </h4>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default News;
