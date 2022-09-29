import React from "react";
import {
  TextInputField,
  Pane,
  Heading,
  Button
} from "evergreen-ui";

type IForm = {
  callback: (response: any) => void
}

const Form = ({ callback }: IForm) => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [name, setName] = React.useState<string>('');
  const [address, setAddress] = React.useState<string>('');

  const onSubmit = React.useCallback(({ name, address }) => {
    try {
      setIsLoading(true)
      fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify({
          name,
          address
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
        .then((response) => response.json())
        .then((json) => {
          callback(json);
          setIsLoading(false);
        });
    } catch (error) {
      alert('error')
    }
  }, [callback])

  return (
    <Pane justifyContent="center">
      <Pane>
        <Pane
          background="tint2"
          display="flex"
          flexWrap="wrap"
          justifyContent="center"
          flexDirection="column"
          padding={20}
        >
        <Heading size={700} textAlign="center" paddingBottom="2rem">
          Add User
        </Heading>
        <TextInputField
          value={name}
          label="Name"
          onChange={(e) => setName(e.target.value)}
          required
        />
        <TextInputField
          value={address}
          label="Address"
          onChange={(e) => setAddress(e.target.value)}
          required
        />
        <Button
          appearance="primary"
          justifyContent="center"
          onClick={() => onSubmit({ name, address })}
          isLoading={isLoading}
          disabled={isLoading || !name || !address}
        >
          Create
        </Button>
        </Pane>
      </Pane>
    </Pane>
  );
}

export default Form;
