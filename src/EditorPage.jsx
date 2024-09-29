// EditorPage.jsx
import React, { useState } from 'react';
import './styles/EditorPage.css'; // Adjust the path according to your project structure

const EditorPage = () => {
  const [blogTitle, setBlogTitle] = useState('');
  const [article, setArticle] = useState('');
  const [bannerPath, setBannerPath] = useState('');
  const [imagePath, setImagePath] = useState('');

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const handleBannerUpload = (event) => {
    uploadImage(event.target.files[0], 'banner');
  };

  const handleImageUpload = (event) => {
    uploadImage(event.target.files[0], 'image');
  };

  const uploadImage = async (file, uploadType) => {
    if (file && file.type.includes("image")) {
      const formdata = new FormData();
      formdata.append('image', file);

      try {
        const response = await fetch('/upload', {
          method: 'POST',
          body: formdata
        });
        const data = await response.json();
        
        if (uploadType === 'image') {
          addImage(data, file.name);
        } else {
          setBannerPath(`${window.location.origin}/${data}`);
        }
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    } else {
      alert("Please upload an image only");
    }
  };

  const addImage = (imagepath, alt) => {
    const curPos = document.querySelector('.article').selectionStart;
    const textToInsert = `\r![${alt}](${imagepath})\r`;
    setArticle((prev) => prev.slice(0, curPos) + textToInsert + prev.slice(curPos));
  };

  const handlePublish = async () => {
    if (article.length && blogTitle.length) {
      // generating id
      const letters = 'abcdefghijklmnopqrstuvwxyz';
      const formattedTitle = blogTitle.split(" ").join("-");
      let id = '';
      for (let i = 0; i < 4; i++) {
        id += letters[Math.floor(Math.random() * letters.length)];
      }

      // setting up docName
      const docName = `${formattedTitle}-${id}`;
      const date = new Date();

      try {
        await db.collection("blogs").doc(docName).set({
          title: blogTitle,
          article: article,
          bannerImage: bannerPath,
          publishedAt: `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`
        });
        window.location.href = `/${docName}`;
      } catch (error) {
        console.error("Error publishing blog:", error);
      }
    }
  };

  return (
    <div>
      {/* Banner Section */}
      <div className="banner" style={{ backgroundImage: `url("${bannerPath}")` }}>
        <input
          type="file"
          accept="image/*"
          id="banner-upload"
          hidden
          onChange={handleBannerUpload}
        />
        <label htmlFor="banner-upload" className="banner-upload-btn">
          <img src="img/upload.png" alt="upload banner" />
        </label>
      </div>

      {/* Blog Section */}
      <div className="blog">
        <textarea
          className="title"
          placeholder="Blog title..."
          value={blogTitle}
          onChange={(e) => setBlogTitle(e.target.value)}
        ></textarea>
        <textarea
          className="article"
          placeholder="Start writing here..."
          value={article}
          onChange={(e) => setArticle(e.target.value)}
        ></textarea>
      </div>

      {/* Blog Options */}
      <div className="blog-options">
        <button className="btn dark publish-btn" onClick={handlePublish}>
          Publish
        </button>
        <input
          type="file"
          accept="image/*"
          id="image-upload"
          hidden
          onChange={handleImageUpload}
        />
        <label htmlFor="image-upload" className="btn grey upload-btn">Upload Image</label>
      </div>
    </div>
  );
};

export default EditorPage;
