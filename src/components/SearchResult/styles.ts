import styled from 'styled-components';

export const Card = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 12px;
  background: var(--main-background);
  border-radius: 0px 0 20px 20px;
  width: 75vw;
  margin: 0 auto;
  padding: 2%;

  @media (max-width: 1024px) {
    width: 85vw;
    padding: 2% 5% 2% 5%;
  }

  @media (min-width: 1366px) {
    width: 40vw;
    padding: 1%;
  }

  a {
    font-family: fantasy;
    text-decoration: none;
    color: var(--main-font-color);
    margin-left: auto
  }

`;

export const Image = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 5px;
`;

export const Title = styled.h3`
  font-weight: bold;
  color: var(--main-font-color);
`;