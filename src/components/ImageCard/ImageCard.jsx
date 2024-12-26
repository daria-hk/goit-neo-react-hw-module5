import css from "./ImageCard.module.css";

const ImageCard = ({ id, alt_description, urlRegular, onImageClick }) => (
  <li className={css.galleryCard} key={id}>
    <img
      src={urlRegular}
      alt={alt_description || "Movie poster"} // Fallback, falls kein alt-Text vorhanden ist
      role="button" // Signalisiert, dass das Bild klickbar ist
      onClick={() => onImageClick(urlRegular)}
    />
  </li>
);

export default ImageCard;
