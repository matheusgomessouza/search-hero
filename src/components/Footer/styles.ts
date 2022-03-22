import styled  from 'styled-components';

export const Container = styled.footer`
  width: 100vw;
  background: var(--main-background);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Text = styled.span`
  font-size: 0.9em;
  font-family: 'Limelight', cursive;
  color: var(--main-font-color);
  text-align: center;
  padding-block: 1.5%;

  @media(max-width: 768px) {
    padding-block: 5%;
  }
`;