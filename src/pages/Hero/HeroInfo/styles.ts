import styled from 'styled-components';

interface IComponents {
  width?: string;
  height?: string;
}

export const Container = styled.div`
  background-color: var(--main-background);
  padding-top: 20px;
  height: auto;
  width: 100vw;

  .swiper {
    margin-block: 4%;
  }

  .purchase-button {
    background-color: #fff;
    width: 50vw;
    margin: 0 auto;
    border-radius: 4px;
    height: 55px;
    align-items: center;
    justify-content: center;
    text-align: center;
    margin-top: 20px;
    display: flex; 

      a { 
        text-decoration: none;
        color: #000 !important;
        font-weight: bold;
        font-size: 24px;
        font-family: fantasy
      }
  }
`;

export const Button = styled.button`
  padding: 1.5%;
  margin: 40px auto;
  border-radius: 10px;
  background-color: #fff;
  border: 0;
  margin-top: 0;
  display: block;
  font-size: 1.6rem;
  font-family: fantasy;
  font-weight: bold;
  cursor: pointer;

  @media(max-width: 768px) {
    padding: 4.5%;
  }
`;

export const Image = styled.img<IComponents>`
  border-radius: 7px;
  width: ${(props) => props.width ? props.width : '180px'};
  height: ${(props) => props.height ? props.height : '180px'};
  margin: 20px auto;
  margin-bottom: 5px;
  display: block;
`;

export const Name = styled.h3`
  color: var(--main-font-color);
  margin: 12px auto;
  margin-bottom: 45px;
  text-align: center;
`;

export const Title = styled.h4`
  color: var(--main-font-color);
  text-align: center;
  width: 80vw;
  margin: 0 auto;
`;

export const Description = styled.p`
  color: var(--main-font-color);
  font-size: 1.4rem;
  font-family: fantasy;
  text-align: center;
  margin-inline: 50px;
`;

export const PurchaseButton = styled.div`
  
`;