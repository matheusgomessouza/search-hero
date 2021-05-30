import React from 'react';
import { api } from '../../services/api';
import MD5 from 'crypto-js/md5';

import { Background, Form, Heading, Search } from './styles';
import Footer from '../../components/Footer';

export default function Home() {

  //Lógica para puxar dados da API Marvel
  var ts = new Date().getTime();
  var privateKey = "";
  var publicKey = "42341e55d54325c55147ee06f844496a"
  var mixed = ts + privateKey + publicKey;
  const hash = MD5(mixed).toString()


  api.get(`http://gateway.marvel.com/v1/public/characters?ts=${ts}&apikey=${publicKey}&hash=${hash}`)
      .then(function (response) {
        // handle success
        console.log(response);
      })
      .catch(function (error) {
        // handle error
        console.log("Nothing could be found");
      })
  /////////////////////////////////////////

  return (
    <>
      <Background>
        <Form>
          <Heading>Quer saber mais sobre seu herói favorito?</Heading>
          <Search type="text" placeholder="Comece por aqui..."/>
        </Form>
        <Footer/>
      </Background>
    </>
  );
}
