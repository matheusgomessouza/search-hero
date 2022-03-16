import styled from 'styled-components';

export const Card = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 12px;
  background: var(--main-background);
  border-radius: 0px 0 20px 20px;
  width: 45vw;
  margin: 0 auto;
  padding: 1% 0 1% 1%;

  @media(max-width: 768px) {
    width: 85vw;
    padding: 2% 0 2% 5%;
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