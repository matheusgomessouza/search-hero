import React from 'react';
import { Background, Form, Heading, Search } from './styles';


export default function Home() {
  return (
    <Background>
      <Form>
        <Heading>Quer saber mais sobre seu herói favorito?</Heading>
        <Search type="text" placeholder="Comece por aqui..." />
      </Form>
    </Background>
  );
}
