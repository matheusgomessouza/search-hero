import React from 'react';

import { Background, Heading, Search } from './styles';


function App() {

  return (
    <Background>
      <Heading>Quer saber mais sobre seu herói favorito?</Heading>
      
      <Search type="text" placeholder="Comece por aqui..." />
    </Background>
  );
}

export default App;
