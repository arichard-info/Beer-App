import React, { useState, useEffect } from "react";
import { v4 } from "uuid";
import styled, { css } from "styled-components";
import Emitter from "./Emitter";
import Flash from "./Flash";

const Flashes = ({ className }) => {
  const [flashes, setFlashes] = useState([]);

  const removeFlash = flash => {
    setFlashes(flashes => flashes.filter(el => el.key !== flash.key));
  };

  useEffect(() => {
    const onFlash = ({ message = "", type = "success", timeout = 5000 }) => {
      if (message)
        setFlashes(flashes => [
          ...flashes,
          { message, type, timeout, key: v4() }
        ]);
    };
    Emitter.addListener("flash", onFlash);
  }, []);

  return (
    <div className={className}>
      {flashes.map(el => (
        <Flash
          key={el.key}
          message={el.message}
          type={el.type}
          timeout={el.timeout}
          onRemove={() => removeFlash(el)}
        />
      ))}
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
