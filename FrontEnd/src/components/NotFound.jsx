import "../css/NotFound.css";
import {useNavigate} from 'react-router-dom'
export default function NotFound() {
const navigate = useNavigate()
const onClick = () => {
    navigate('/')
}
  return (
    <section className="notfound">
      <h1 className="notfound__title">Not Found</h1>
      <p className="notfound__p">
        This page was not found{" "}
        <span className="notfound__span" onClick={onClick}>please click here</span>
      </p>
    </section>
  );
}
