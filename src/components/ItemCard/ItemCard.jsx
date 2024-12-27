import css from "./ItemCard.module.css";
import { Link } from "react-router-dom";

const ItemCard = ({ id, title }) => (
  <li className={css.itemCard} key={id}>
    <Link to={`/movies/${id}`}>{title}</Link>
  </li>
);

export default ItemCard;
