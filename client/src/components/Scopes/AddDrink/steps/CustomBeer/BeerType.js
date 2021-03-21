import React, { forwardRef } from "react";
import styled, { css } from "styled-components";

import BeerIcon from "@/components/Global/BeerIcon";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";

const Type = forwardRef(({ className, types, loading, error = false }, ref) => {
  if (loading) {
    return (
      <div className={className}>
        <div className="slider">
          <div className="slides">
            {new Array(4).fill("").map((_, key) => (
              <div key={key} className="slide">
                <label />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={className}>
      <div className="slider">
        <div className="slides">
          {types.map((type) => {
            const id = `family-${type.slug}`;
            return (
              <div className={`slide `} key={type.slug}>
                <input
                  type="radio"
                  name="family"
                  required
                  id={id}
                  value={type.slug}
                  ref={ref}
                />
                <label htmlFor={id} className={`${error ? "error" : ""}`}>
                  <FontAwesomeIcon className="check" icon={faCheckCircle} />
                  <BeerIcon color={type.color} />
                  <span>{type.name}</span>
                </label>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
});

export default styled(Type)(
  ({ theme: { colors, device, fw } }) => css`
    .slider {
      overflow-y: hidden;
      overflow-x: auto;
      /* Hide scrollbar for Chrome, Safari and Opera */
      &::-webkit-scrollbar {
        display: none;
      }
      /* Hide scrollbar for IE, Edge and Firefox */
      -ms-overflow-style: none; /* IE and Edge */
      scrollbar-width: none; /* Firefox */
    }
    .slides {
      display: flex;
      margin-left: -1rem;
    }
    .check {
      position: absolute;
      top: 0.25rem;
      left: 0.25rem;
      font-size: 1.9rem;
      color: white;
      opacity: 0;
    }
    label {
      position: relative;
      width: 8rem;
      height: 8rem;
      min-width: 8rem;
      min-height: 8rem;
      margin-right: 1rem;
      margin-left: 1rem;
      border: 0.2rem solid #e9e9e9;
      background-color: white;
      border-radius: 1.5rem;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      transition: all 0.2s ease;
      cursor: pointer;

      &.error {
        border-color: ${colors.formError};
      }

      &:hover {
        background-color: #ffebbc;
      }

      span {
        margin-bottom: 1rem;
        font-size: 1.3rem;
        color: #9b9b9b;
        font-weight: 700;
        transition: all 0.2 ease;
      }
    }

    .beer-icon {
      margin-top: -0.5rem;
      height: 4.5rem;
      width: auto;
    }
    input {
      opacity: 0;
      width: 0;
      max-width: 0;
      height: 0;
      max-height: 0;
    }

    input:checked + label {
      background-color: #ffcf40;
      border-color: #ffcf40;
      .check {
        opacity: 1;
      }
      span {
        color: white;
      }
    }

    @media ${device.gtMobile} {
      label {
        width: 10.5rem;
        height: 10.5rem;
        min-width: 10.5rem;
        min-height: 10.5rem;
      }
      .beer-icon {
        margin-top: -1rem;
        height: 7rem;
        width: auto;
      }
    }
  `
);
