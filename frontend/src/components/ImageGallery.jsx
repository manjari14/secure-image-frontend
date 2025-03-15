import { useEffect, useState } from "react";
import { fetchImages, deleteImage } from "../api/images";

const ImageGallery = () => {
  const [images, setImages] = useState([]);

  const loadImages = async () => {
    try {
      const data = await fetchImages();
      setImages(data.images);
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    loadImages();
  }, []);

  const handleDelete = async (filename) => {
    if (!window.confirm("Are you sure?")) return;

    try {
      await deleteImage(filename);
      loadImages();
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div>
      {images.map((img, index) => (
        <div key={index}>
          <img src={img.url} alt="Uploaded" width="100" />
          <button onClick={() => handleDelete(img.filename)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default ImageGallery;
