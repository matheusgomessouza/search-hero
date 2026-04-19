import styled from 'styled-components';

export const Card = styled.article`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 20px;
  background: var(--surface-background);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  width: 100%;
  padding: 1rem 1.5rem;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;

  &:hover, &:focus-visible {
    transform: translateY(-4px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.4);
    border-color: var(--marvel-red);
    outline: none;
  }
  
  &:focus-visible {
     box-shadow: 0 0 0 3px rgba(230, 36, 41, 0.5);
  }
`;

export const Image = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
  background: var(--skeleton-base);
  border: 2px solid transparent;
  transition: border-color 0.3s ease;
  
  ${Card}:hover & {
    border-color: var(--marvel-red);
  }
`;

export const Title = styled.h3`
  font-family: var(--font-heading);
  font-weight: 500;
  font-size: 1.5rem;
  color: var(--main-font-color);
  flex-grow: 1;
  letter-spacing: 1px;
`;

export const ActionLink = styled.span`
  font-family: var(--font-heading);
  font-size: 1rem;
  color: var(--marvel-red);
  letter-spacing: 1px;
  opacity: 0;
  transform: translateX(-10px);
  transition: opacity 0.3s ease, transform 0.3s ease;

  ${Card}:hover &, ${Card}:focus-visible & {
    opacity: 1;
    transform: translateX(0);
  }

  @media (max-width: 768px) {
    opacity: 1;
    transform: translateX(0);
    font-size: 0.9rem;
  }
`;
