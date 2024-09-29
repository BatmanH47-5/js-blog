// BlogPage.jsx
import React, { useEffect, useState } from 'react';
import './styles/BlogPage.css'
import './styles/EditorPage.css'
import './styles/HomePage.css'

const BlogPage = () => {
  const [blogData, setBlogData] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Extract the blog ID from the URL
    const blogId = decodeURI(window.location.pathname.split("/").pop());
    
    const fetchBlogData = async () => {
      const docRef = db.collection("blogs").doc(blogId);
      const doc = await docRef.get();

      if (doc.exists) {
        setBlogData(doc.data());
      } else {
        window.location.replace("/");
      }
      setLoading(false);
    };

    fetchBlogData();
  }, []);

  const renderArticleContent = (data) => {
    return data.split("\n").filter(item => item.length).map((item, index) => {
      if (item[0] === '#') {
        // Determine heading level
        let hCount = 0;
        let i = 0;
        while (item[i] === '#') {
          hCount++;
          i++;
        }
        const Tag = `h${hCount}`;
        return <Tag key={index}>{item.slice(hCount).trim()}</Tag>;
      } else if (item.startsWith('![')) {
        // Check for image format
        const separator = item.indexOf("](");
        const alt = item.slice(2, separator).trim();
        const src = item.slice(separator + 2, -1).trim();
        return <img key={index} src={src} alt={alt} className="article-image" />;
      } else {
        return <p key={index}>{item}</p>;
      }
    });
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <nav className="navbar">
        <img src="img/logo.png" className="logo" alt="" />
        <ul className="links-container">
          <li className="link-item"><a href="/" className="link">home</a></li>
          <li className="link-item"><a href="/editor" className="link">editor</a></li>
        </ul>
      </nav>
      
      {blogData && (
        <>
          <div className="banner" style={{ backgroundImage: `url(${blogData.bannerImage})` }}></div>
          <div className="blog">
            <h1 className="title">{blogData.title}</h1>
            <p className="published"><span>published at - </span>{blogData.publishedAt}</p>
            <div className="article">
              {renderArticleContent(blogData.article)}
            </div>
          </div>
        </>
      )}

      <h1 className="sub-heading">Read more</h1>

      <section className="blogs-section">
        {/* Additional blog cards can go here */}
      </section>
    </div>
  );
};

export default BlogPage;
