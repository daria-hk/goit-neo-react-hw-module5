import ItemCard from "../ItemCard/ItemCard";
import css from "./MovieList.module.css";

const MovieList = ({ items, onImageClick }) => {
  const uniqueItems = Array.from(
    new Map(items.map((item) => [item.id, item])).values()
  );

  return (
    <ul className={css.MovieList}>
      {uniqueItems.map(({ id, title, poster_path }) => (
        <ItemCard key={id} id={id} title={title} poster_path={poster_path} />
      ))}
    </ul>
  );
};

export default MovieList;
