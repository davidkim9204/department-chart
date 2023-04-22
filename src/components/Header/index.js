import styled from "styled-components";

const StyledHeader = styled.header`
  position: sticky;
  top: 0;
  left: 0;
  width: 100%;
  background-color: #212c48;
  color: #fff;
  display: flex;
  flex-direction: column;
`;

const StyledSpan = styled.span`
  margin: 8px;
  font-weight: 700;
`;

function Header() {
  return (
    <StyledHeader>
      <StyledSpan> 춘식 company의 조직도</StyledSpan>
    </StyledHeader>
  );
}

export default Header;
