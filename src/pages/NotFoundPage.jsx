import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <>
      <Link to={`/`}>
        <button>To Home Page</button>
      </Link>
      <h1>Page NotFound</h1>
    </>
  );
}

/*Якщо користувач зайшов за неіснуючим маршрутом, потрібно показувати компонент NotFoundPage, в якому є посилання Link на домашню сторінку.*/
