import React from "react";
import styled, { css } from "styled-components";
import { useTransition, animated } from "react-spring";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

import { getMonthName } from "./../../../utils/date";
import { useCalendar } from "./../../../state/calendar";
import { useGetRequest } from "./../../../utils/api/hooks";
import BeerItem from "./../../BeerItem";
import BeerItemPlaceholder from "./../../BeerItem/BeerItemPlaceholder";

const AddBeer = ({ day }) => {
  const [, dispatch] = useCalendar();

  const handleClose = () => {
    dispatch({ type: "UNSELECT_DAY" });
  };

  const [drinks, loading] = useGetRequest(
    `/api/user/drinks/day?date=${day.date}`
  );

  return (
    <>
      <div className="header">
        <p>
          {day.date.getDate()} {getMonthName(day.date)}
          <small> {day.date.getFullYear()}</small>
        </p>
        <button className="close" onClick={handleClose}>
          <FontAwesomeIcon icon={faTimes} />
        </button>
      </div>
      {loading && day.count > 0 && (
        <div className="drinks">
          {[...Array(day.count).keys()].map((el, key) => (
            <BeerItemPlaceholder key={key} />
          ))}
        </div>
      )}
      {!loading && drinks.length > 0 && (
        <div className="drinks">
          {drinks.map((drink, key) => (
            <BeerItem key={key} beer={drink.beer} quantity={drink.quantity} />
          ))}
        </div>
      )}
      <Link
        className="cta"
        to={{ pathname: "/add-drink", state: { selectedDay: day } }}
      >
        Ajouter une bière
      </Link>
    </>
  );
};

const AnimationWrapper = ({ className, day }) => {
  const transitions = useTransition(day, day => day !== false, {
    from: { transform: "translate3d(0,100%,0)" },
    enter: { transform: "translate3d(0,0,0)" },
    leave: { transform: "translate3d(0,100%,0)" },
    config: { duration: 300 }
  });

  return transitions.map(
    ({ item, key, props }) =>
      item && (
        <animated.div className={className} key={key} style={props}>
          <AddBeer day={item} />
        </animated.div>
      )
  );
};

export default styled(AnimationWrapper)(
  ({ theme: { colors, fw } }) => css`
    position: sticky;
    z-index: 2;
    bottom: 0;

    box-shadow: 0 0 1rem rgba(0, 0, 0, 0.15);
    background-color: ${colors.white};
    border-radius: 1.4rem 1.4rem 0 0;
    padding: 3rem;
    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      margin-bottom: 2rem;
      .close {
        border: none;
        background-color: transparent;
        outline: none;
        cursor: pointer;
        font-size: 1.8rem;
      }
      p {
        margin: 0;
        display: block;
        font-size: 1.8rem;
        font-weight: ${fw.bold};
        color: ${colors.black};
        small {
          font-size: 1.8rem;
          font-weight: ${fw.semibold};
        }
      }
    }

    .drinks {
      margin-bottom: 2rem;
      margin-left: -1rem;
      margin-right: -1rem;
    }
  `
);
