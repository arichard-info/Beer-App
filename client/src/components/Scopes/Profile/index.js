import React from "react";
import styled, { css } from "styled-components";

import Form from "@/components/Global/NewForm";
import TextInput from "@/components/Global/NewForm/TextInput";

const ProfilePage = ({ className }) => {
  return (
    <div className={className}>
      <h1>Profile page</h1>
      <Form>
        <TextInput
          id="firstname"
          name="firstname"
          placeholder="First Name"
          rules={{ required: true }}
          required
        />
      </Form>
    </div>
  );
};

export default styled(ProfilePage)(() => css``);
