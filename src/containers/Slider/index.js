import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);
  const sortedEvent = data?.focus.sort(
    (evtA, evtB) => new Date(evtA.date) - new Date(evtB.date)
  );
  useEffect(() => {
    const timer = setTimeout(() => {
      setIndex((currentSlide) =>
        currentSlide === sortedEvent.length - 1 ? 0 : currentSlide + 1
      );
    }, 5000);

    return () => {
      clearTimeout(timer);

    };
  }, [sortedEvent, index]);
  return (
    <div className="SlideCardList">
      {sortedEvent?.map((event, idx) => (
        <div
          key={event.title}
          className={`SlideCard SlideCard--${
            index === idx ? "display" : "hide"
          }`}
        >
          <img src={event.cover} alt={event.title} />
          <div className="SlideCard__descriptionContainer">
            <div className="SlideCard__description">
              <h3>{event.title}</h3>
              <p>{event.description}</p>
              <div>{getMonth(new Date(event.date))}</div>
            </div>
          </div>
        </div>
      ))}
      <div className="SlideCard__paginationContainer">
        <div className="SlideCard__pagination">
          {sortedEvent?.map((event, radioIdx) => (
            <input
              key={event.title}
              type="radio"
              name="radio-button"
              checked={index === radioIdx}
              onChange={() => setIndex(radioIdx)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slider;
