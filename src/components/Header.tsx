import styled from "styled-components";

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  position: fixed;
  width: 100%;
  padding: 20px 50px;
  background-color: ${(props) => props.theme.bgColor};
`;

export const NavigationIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 45px;
  height: 45px;
  border-radius: 30%;
  background-color: ${(props) => props.theme.textColor};
  &:hover {
    cursor: pointer;
  }
  svg {
    font-size: 28px;
    color: ${(props) => props.theme.bgColor};
  }
`;

export const Title = styled.h1`
  text-align: center;
  width: 70%;
  margin-top: 5px;
  font-size: 35px;
  color: ${(props) => props.theme.accentColor};
`;
