import React, { useState, useEffect } from "react";
import { v4 } from "uuid";
import styled, { css } from "styled-components";
import Emitter from "./Emitter";
import Flash from "./Flash";
import { createPortal } from "react-dom";

const Flashes = ({ className }) => {
  const [flashes, setFlashes] = useState([]);

  const removeFlash = (index) => {
    setFlashes((flashes) =>
      [...flashes].filter((flash) => flash.index !== index)
    );
  };

  useEffect(() => {
    const onFlash = (flash) => {
      if (flash.message)
        setFlashes((flashes) => {
          const index = flashes.findIndex((el) => el.message === flash.message);
          if (index === -1)
            return [{ ...flash, calls: 0, index: v4() }, ...flashes];
          let flashesState = [...flashes];
          flashesState[index] = {
            ...flashes[index],
            timeout: flash.timeout,
            calls: flashes[index].calls + 1,
          };
          return flashesState;
        });
    };
    Emitter.addListener("flash", onFlash);
    return () => Emitter.removeAllListeners();
  }, []);

  return createPortal(
    <div className={className}>
      {flashes.map((el, key) => {
        return (
          <Flash
            key={el.index}
            message={el.message}
            type={el.type}
            timeout={el.timeout}
            calls={el.calls}
            onRemove={() => removeFlash(el.index)}
          />
        );
      })}
    </div>,
    document.body
  );
};

export default styled(Flashes)(
  () => css`
    padding: 2rem;
    position: fixed;
    z-index: 2;
    top: 0;
    right: 0;
    left: 0;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    pointer-events: none;
  `
);
