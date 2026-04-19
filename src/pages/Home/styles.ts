import styled from 'styled-components';

export const Background = styled.div`
  background-image: linear-gradient(to bottom, rgba(18, 18, 18, 0.4), rgba(18, 18, 18, 1)), url("https://wallpapercave.com/wp/wp3221720.jpg");
  background-size: cover;
  background-position: center;
  min-height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  padding-top: 15vh;
  overflow-y: auto;

  @media (min-width: 768px) {
    background-attachment: fixed;
  }
`;

export const Form = styled.div`
  width: 100%;
  max-width: 700px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 20px;
  z-index: 10;
`; 

export const Heading = styled.h1`
  text-align: center;
  font-size: 3.5rem;
  font-family: var(--font-heading);
  color: var(--main-font-color);
  text-shadow: 2px 4px var(--main-text-shadow-faded);
  margin-bottom: 2rem;
  text-transform: uppercase;
  letter-spacing: 2px;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

export const Search = styled.input`
  width: 100%;
  padding: 1rem 1.5rem;
  border-radius: 50px;
  outline: none;
  border: 2px solid transparent;
  font-family: var(--font-body);
  font-size: 1.2rem;
  background: var(--surface-background);
  backdrop-filter: blur(10px);
  color: var(--main-font-color);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;

  &::placeholder {
    color: var(--variant-font-color);
  }

  &:focus, &:hover {
    border-color: var(--marvel-red);
    background: rgba(30, 30, 30, 0.9);
    box-shadow: 0 8px 32px rgba(230, 36, 41, 0.2);
  }
`;

export const ResultsContainer = styled.div`
  width: 100%;
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const Message = styled.p`
  text-align: center;
  font-family: var(--font-body);
  font-size: 1.2rem;
  color: var(--variant-font-color);
  background: var(--surface-background);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  padding: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.05);
`;
