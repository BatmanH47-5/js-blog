// HomePage.jsx
import React, { useEffect, useState } from 'react';
import './styles/HomePage.css'; // Adjust the path according to your project structure

const HomePage = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const querySnapshot = await db.collection("blogs").get();
        const blogsArray = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setBlogs(blogsArray);
      } catch (error) {
        console.error("Error fetching blogs: ", error);
      }
    };

    fetchBlogs();
  }, []);

  const createBlog = (blog) => {
    return (
      <div className="blog-card" key={blog.id}>
        <img src={blog.bannerImage} className="blog-image" alt="" />
        <h1 className="blog-title">{blog.title.substring(0, 100) + '...'}</h1>
        <p className="blog-overview">{blog.article.substring(0, 200) + '...'}</p>
        <a href={`/${blog.id}`} className="btn dark">read</a>
      </div>
    );
  };

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar">
        <img src="img/logo.png" className="logo" alt="" />
        <ul className="links-container">
          <li className="link-item"><a href="/" className="link">home</a></li>
          <li className="link-item"><a href="/editor" className="link">editor</a></li>
        </ul>
      </nav>

      {/* Header Section */}
      <header className="header">
        <div className="content">
          <h1 className="heading">
            <span className="small">welcome in the world of</span>
            blog
            <span className="no-fill">writing</span>
          </h1>
          <a href="/editor" className="btn">write a blog</a>
        </div>
      </header>

      {/* Blog Section */}
      <section className="blogs-section">
        {blogs.map(blog => createBlog(blog))}
      </section>
    </div>
  );
};

export default HomePage;
