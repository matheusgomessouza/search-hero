import styled from "styled-components";

export const Background = styled.main`
  background-image: url("https://cdn.registerdisney.go.com/v4/asset/bundler/MARVEL/v4/images/v1/marvel-background-web.webp");
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
  background: var(--main-background-faded);
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

export const Heading = styled.h1`
  text-align: center;
  font-size: 2rem;
  font-family: "Limelight", cursive;
  color: var(--main-font-color);
  text-shadow: 4px 2px var(--main-text-shadow-faded);
  margin-bottom: 0.7rem;
`;

export const Search = styled.input`
  padding: 1.5%;
  margin: 0 auto;
  width: 75vw;
  outline: none;
  display: block;
  margin: 0 auto;
  border: none;
  font-family: "Limelight", cursive;
  font-size: 1.1rem;
  border-radius: 0.5rem;

  @media (max-width: 1024px) {
    padding: 3%;
    width: 85vw;
    font-size: 1.2rem;
  }

  @media (min-width: 1366px) {
    padding: 0.6%;
    width: 25vw;
  }
`;
