import React, { useState } from "react";
import styled, { css } from "styled-components";

import BeerIcon from "@/components/Global/BeerIcon";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";

const types = [
  {
    label: "Blanche",
    value: "blanche",
    color: "#FFEBBC",
  },
  {
    label: "Lager",
    value: "lager",
    color: "#FFCF40",
  },
  {
    label: "IPA",
    value: "ipa",
    color: "#F2A954",
  },
  {
    label: "Stout",
    value: "stout",
    color: "#392813",
  },
  {
    label: "Aromatisée",
    value: "atomate",
    color: "#FFEBBC",
  },
];

const Type = ({ className, field, onChange, showError }) => {
  const handleChange = (e) => {
    onChange(e.target.value);
  };

  return (
    <div className={className}>
      <span className="title">Type de bière</span>
      <div className="slider">
        <div className="slides">
          {types.map((type, index) => {
            const id = `beer-type-${type.value}`;
            const isActive = field.value === type.value;
            return (
              <div
                className={`slide ${isActive ? "active" : ""}`}
                key={type.value}
              >
                <input
                  type="radio"
                  name="beer-type"
                  required
                  id={id}
                  value={type.value}
                  checked={isActive}
                  onChange={handleChange}
                />
                <label
                  htmlFor={id}
                  className={`${isActive ? "active" : ""} ${
                    field.error && showError ? "error" : ""
                  }`}
                >
                  <FontAwesomeIcon className="check" icon={faCheckCircle} />
                  <BeerIcon color={type.color} />
                  <span>{type.label}</span>
                </label>
              </div>
            );
          })}
        </div>
      </div>
      {field.error && showError && (
        <div>
          <p className="error-message">{field.error}</p>
        </div>
      )}
    </div>
  );
};

export default styled(Type)(
  ({ theme: { colors, device, fw } }) => css`
    margin-top: 2rem;
    .title {
      color: ${colors.formLabel};
      font-weight: 700;
      font-size: 1.6rem;
      display: block;
    }
    .error-message {
      font-size: 1.1rem;
      font-weight: ${fw.semibold};
      color: ${colors.formError};
      margin: 0;
      margin-top: 0.5rem;
      line-height: 1.5;
    }
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

      &.active {
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
        width: 10.5rem;
        height: 10.5rem;
        min-width: 10.5rem;
        min-height: 10.5rem;
      }
    }

    .beer-icon {
      margin-top: -0.5rem;
      height: 4.5rem;
      width: auto;
      @media ${device.gtMobile} {
        margin-top: -1rem;
        height: 7rem;
        width: auto;
      }
    }
    input {
      opacity: 0;
      width: 0;
      max-width: 0;
      height: 0;
      max-height: 0;
    }
  `
);
