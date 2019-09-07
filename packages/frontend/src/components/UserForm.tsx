import React, { useState } from 'react';
import { FormGroup, InputGroup, FileInput, Button, IconName } from '@blueprintjs/core';
import { User, UserInput } from '../types';

interface UserFormProps {
  user?: User,
  buttonTitle: string,
  buttonIcon: IconName,
  onSubmit: (userInput: UserInput) => void
}

const UserForm = ({ user, buttonTitle, onSubmit, buttonIcon }: UserFormProps) => {
  const [ name, setName ] = useState(user ? user.name : '');
  const [ email, setEmail ] = useState(user ? user.email : '');
  const [ avatar ] = useState(user ? user.avatar : '');

  return (
    <div>
      <FormGroup
          helperText="First and Last name, please"
          label="User's name"
          labelFor="name"
          labelInfo="(required)"
      >
          <InputGroup 
            id="name" 
            placeholder="Jon Doe" 
            autoFocus 
            value={name} 
            onChange={(e: React.FormEvent<HTMLInputElement>) => setName(e.currentTarget.value)} 
          />
      </FormGroup>
      <FormGroup
          label="E-mail"
          labelFor="email"
          labelInfo="(required)"
      >
          <InputGroup 
            id="email" 
            placeholder="jon@doe.com" 
            type="email"
            value={email} 
            onChange={(e: React.FormEvent<HTMLInputElement>) => setEmail(e.currentTarget.value)} 
          />
      </FormGroup>
      <FormGroup
          label="Avatar"
          labelFor="avatar"
      >
          <FileInput disabled={true} text="Choose file..." />
      </FormGroup>

      <Button
        icon={buttonIcon}
        type="submit"
        intent="primary" 
        onClick={() => {
          onSubmit({ name, email, avatar });
        }}
      >
        {buttonTitle}
      </Button>
    </div>
  );
}

export default UserForm;
