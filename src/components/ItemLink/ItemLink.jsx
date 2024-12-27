import css from "./ItemLink.module.css";
import { Link } from "react-router-dom";

const ItemLink = ({ id, title }) => (
  <li className={css.ItemLink} key={id}>
    <Link to={`/movies/${id}`}>{title}</Link>
  </li>
);

export default ItemLink;
