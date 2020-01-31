import React, { useState, useEffect } from "react";
import { v4 } from "uuid";
import styled, { css } from "styled-components";
import Emitter from "./Emitter";
import Flash from "./Flash";

const Flashes = ({ className }) => {
  const [flashes, setFlashes] = useState([]);

  const removeFlash = index => {
    setFlashes(flashes => [...flashes].filter(flash => flash.index !== index));
  };

  useEffect(() => {
    const onFlash = ({ message = "", type = "success", timeout = 2000 }) => {
      if (message)
        setFlashes(flashes => {
          const index = flashes.findIndex(el => el.message === message);
          if (index === -1)
            return [
              { message, type, timeout, calls: 0, index: v4() },
              ...flashes
            ];
          let flashesState = [...flashes];
          flashesState[index] = {
            ...flashes[index],
            timeout,
            calls: flashes[index].calls + 1
          };
          return flashesState;
        });
    };
    Emitter.addListener("flash", onFlash);
    return () => Emitter.removeAllListeners();
  }, []);

  return (
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
    </div>
  );
};

export default styled(Flashes)(
  () => css`
    padding: 2rem;
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  `
);
