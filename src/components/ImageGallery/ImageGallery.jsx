import ImageCard from "../ImageCard/ImageCard";
import css from "./ImageGallery.module.css";

const ImageGallery = ({ items, onImageClick }) => {
  const uniqueItems = Array.from(
    new Map(items.map((item) => [item.id, item])).values()
  );

  return (
    <ul className={css.galleryList}>
      {uniqueItems.map(({ id, title, poster_path }) => (
        <ImageCard
          key={id}
          id={id}
          alt_description={title}
          urlRegular={poster_path}
          onImageClick={() => onImageClick(poster_path)}
        />
      ))}
    </ul>
  );
};

export default ImageGallery;
