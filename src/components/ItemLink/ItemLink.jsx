import css from "./ItemLink.module.css";
import { Link, useLocation } from "react-router-dom";

const ItemLink = ({ id, title }) => {
  const location = useLocation();
  console.log(location.state);

  return (
    <li className={css.ItemLink} key={id}>
      <Link to={`/movies/${id}`} state={location}>
        {title}
      </Link>
    </li>
  );
};

export default ItemLink;
