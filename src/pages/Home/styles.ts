import styled from 'styled-components';

export const Background = styled.div`
  background-image: url("https://wallpapercave.com/wp/wp3221720.jpg");
  background-size: cover;
  margin: 0;
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export const Form = styled.div`
  background: rgba(0,0,0, 0.4);
  filter: opacity();
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  flex-direction: column;
`; 

export const Heading = styled.h1`
  text-align: center;
  font-size: 2rem;
  font-family: 'Limelight', cursive;
  color: #fff;
  text-shadow: 4px 2px rgba(0, 0, 0, 0.7);
  margin-bottom: 0.7rem;
`;

export const Search = styled.input`
  padding: 1%;
  margin: 0 auto;
  width: 45vw;
  outline: none;
  display: block;
  margin: 0 auto;
  border-radius: 15px;
  border: none;
  font-family: 'Limelight', cursive;
`;
