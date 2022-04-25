import { gql, useMutation } from "@apollo/client";
import { ChangeEvent, useState } from 'react';


export const CREATE_USER_MUTATION = gql`
  mutation CREATE_USER_MUTATION($name: String!, $profilePic: Upload) {
    createUser(name: $name, profilePic: $profilePic) {
      name
    }
  }
`;

export default function UserForm() {
  const [inputs, setInputs] = useState({
    name: "",
    profilePic: null,
  });

  // @ts-ignore
  function handleChange({ target: { name, type, files: [file] } }: ChangeEvent<HTMLInputElement>) {
    if (type !== "file") return;

    setInputs({ name, profilePic: file });
  }

  async function handleSubmit(e: any) {
    e.preventDefault();
    try {
      await createUser({ variables: { ...inputs } });
    } catch (err) {
      console.log(err);
    }
  }

  const [createUser, { data, error, loading }] = useMutation(
    CREATE_USER_MUTATION,
  );

  console.log({
    data,
    error,
    loading,
  });

  return (
    <div>
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
      {error && <div>Error...</div>}
      {loading && <div>Loading...</div>}
      {data && <div>{data.createUser.name}</div>}
    </div>
  );
}
