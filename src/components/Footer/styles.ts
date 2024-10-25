import styled from "styled-components";

interface IFooterProps {
  width?: string;
}

export const Container = styled.footer<IFooterProps>`
  width: 100vw;
  width: ${(props) => (props.width ? props.width : "100%")};;
  background: var(--variant-background);
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  bottom: 0;
  z-index: 1
  margin-top: 1rem
`;

export const Text = styled.span`
  font-size: 0.9em;
  font-family: "Bangers", system-ui;
  font-weight: 400;
  font-style: normal;
  color: ${props => props.theme.textColorThree};
  text-align: center;
  padding-block: 0.5%;

  @media (max-width: 768px) {
    padding-block: 2%;
  }
`;
