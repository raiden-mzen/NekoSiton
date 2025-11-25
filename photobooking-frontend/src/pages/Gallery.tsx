import React, { useState } from "react";
import "../styles/gallery.css";

interface Photo {
  id: number;
  image: string;
  title: string;
  description: string;
  category: string;
}

const Gallery: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  const photos: Photo[] = [
    {
      id: 1,
      image: "/images/bg1.jpg",
      title: "Beach Wedding Ceremony",
      description: "A beautiful sunset wedding ceremony by the beach, capturing the couple's special moment.",
      category: "wedding",
    },
    {
      id: 2,
      image: "/images/bg2.jpg",
      title: "Reception Dance",
      description: "The first dance under twinkling lights, a memory to cherish forever.",
      category: "wedding",
    },
    {
      id: 3,
      image: "/images/bg3.jpg",
      title: "Wedding Details",
      description: "Intricate details of the wedding decorations and arrangements.",
      category: "wedding",
    },
    {
      id: 4,
      image: "/images/bg4.jpg",
      title: "Family Portrait",
      description: "A warm family portrait capturing genuine smiles and connections.",
      category: "portrait",
    },
    {
      id: 5,
      image: "/images/bg1.jpg",
      title: "Professional Headshots",
      description: "Clean, professional headshots perfect for corporate use.",
      category: "portrait",
    },
    {
      id: 6,
      image: "/images/bg2.jpg",
      title: "Couple's Session",
      description: "An intimate couple's portrait session in a natural setting.",
      category: "portrait",
    },
    {
      id: 7,
      image: "/images/bg3.jpg",
      title: "Birthday Celebration",
      description: "Joyful moments from a milestone birthday celebration.",
      category: "event",
    },
    {
      id: 8,
      image: "/images/bg4.jpg",
      title: "Corporate Event",
      description: "Professional coverage of a corporate gathering and networking event.",
      category: "event",
    },
    {
      id: 9,
      image: "/images/bg1.jpg",
      title: "Graduation Party",
      description: "Capturing the excitement and pride of a graduation celebration.",
      category: "event",
    },
  ];

  const categories = [
    { id: "all", label: "All Photos" },
    { id: "wedding", label: "Weddings" },
    { id: "portrait", label: "Portraits" },
    { id: "event", label: "Events" },
  ];

  const filteredPhotos =
    activeCategory === "all"
      ? photos
      : photos.filter((photo) => photo.category === activeCategory);

  const openModal = (photo: Photo) => {
    setSelectedPhoto(photo);
  };

  const closeModal = () => {
    setSelectedPhoto(null);
  };

  return (
    <div className="gallery-container">
      <h1 className="gallery-title">Our Gallery</h1>

      {/* Category Tabs */}
      <div className="category-tabs">
        {categories.map((category) => (
          <button
            key={category.id}
            className={`category-tab ${
              activeCategory === category.id ? "active" : ""
            }`}
            onClick={() => setActiveCategory(category.id)}
          >
            {category.label}
          </button>
        ))}
      </div>

      {/* Photo Grid */}
      <div className="photo-grid">
        {filteredPhotos.map((photo) => (
          <div
            key={photo.id}
            className="photo-card"
            onClick={() => openModal(photo)}
          >
            <img src={photo.image} alt={photo.title} className="photo-img" />
            <div className="photo-overlay">
              <h3>{photo.title}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedPhoto && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>
              ×
            </button>
            <img
              src={selectedPhoto.image}
              alt={selectedPhoto.title}
              className="modal-img"
            />
            <div className="modal-info">
              <h2>{selectedPhoto.title}</h2>
              <p>{selectedPhoto.description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;