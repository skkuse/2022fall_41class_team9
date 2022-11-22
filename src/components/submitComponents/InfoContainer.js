import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  max-width: 1024px;
  margin: 0 auto;
  background-color: bisque;
  height: 500px;
`;

function InfoContainer({ children }) {
  return <Container>{children}</Container>;
}

export default InfoContainer;
