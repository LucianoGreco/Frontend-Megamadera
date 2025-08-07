import React from "react";
import styled from "styled-components";
import { breakpoints } from "@/styles/breakpoints";
import { Link } from "react-router-dom";


const CardHome = ({ name, image, page, children }) => {
  return (
    <CardWrapper>
      <CardContainer>
        <CardImage src={image} alt={name} />
        <SliderOverlay>{children}</SliderOverlay>
        <CardOverlay />
        <TitleButton to={page}>{name}</TitleButton>
      </CardContainer>
    </CardWrapper>
  );
};

export default CardHome;

const CardWrapper = styled.div`
  width: 100%;
  height: 85vh;
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid #ddd;
  background: #fff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
`;

const CardContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

const CardImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: brightness(0.9);
`;

const SliderOverlay = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  height: 30%;
  padding: 1rem;
  background: transparent;
  z-index: 2;
  pointer-events: auto;
`;

const CardOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.1) 30%, rgba(0, 0, 0, 0.6) 100%);
  z-index: 1;
`;

const TitleButton = styled(Link)`
  position: absolute;
  bottom: 10%;
  left: 50%;
  transform: translateX(-50%);
  z-index: 3;
  font-size: 1.3rem;
  font-weight: 700;
  color: #fff;
  background: rgba(0, 0, 0, 0.4);
  padding: 0.4rem 1rem;
  border-radius: 4px;
  text-shadow: 0 2px 6px rgba(0, 0, 0, 0.5);
  text-align: center;
  text-decoration: none;
  transition: background 0.3s;

  &:hover {
    background: rgba(0, 0, 0, 0.6);
  }

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 1.1rem;
  }
`;
