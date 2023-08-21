import './NotFound.css';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';


function NotFound() {
  const navigate = useNavigate();

  function handleBack() {
    navigate(-1);
  }

  return (

    <section class="not-found">
      <div class="not-found__inner">
        <h2 class="not-found__title">404</h2>
        <p class="not-found__subtitle">Страница не найдена</p>
      </div>
      <Link onClick={handleBack} class="not-found__link">Назад</Link>
    </section>

  )

}

export default NotFound;