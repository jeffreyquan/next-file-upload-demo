import { gql, useMutation } from "@apollo/client";
import * as React from "react";

export const CREATE_USER_MUTATION = gql`
  mutation CREATE_USER_MUTATION($name: String!, $profilePic: Upload) {
    createUser(name: $name, profilePic: $profilePic) {
      name
    }
  }
`;

export default function UserForm() {
  const [inputs, setInputs] = React.useState({
    name: "",
    profilePic: null,
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    let value: string | File;
    const { name, type } = e.target;
    value = e.target.value;

    if (type === "file") {
      const { files } = e.target;

      if (files !== null) {
        value = files[0];
      }
    }
    console.log(inputs);
    setInputs((prevInputs) => ({
      ...prevInputs,
      [name]: value,
    }));
  }

  async function handleSubmit(e: any) {
    e.preventDefault();
    try {
      await createUser();
    } catch (err) {
      console.log(err);
    }
  }

  const [createUser, { loading }] = useMutation(CREATE_USER_MUTATION, {
    variables: inputs,
  });

  return (
    <form onSubmit={handleSubmit}>
      <input id="name" type="text" name="name" onChange={handleChange} />
      <input
        id="profilePic"
        type="file"
        name="profilePic"
        onChange={handleChange}
      />
      <button type="submit">Submit</button>
    </form>
  );
}
