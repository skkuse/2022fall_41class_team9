import styled from "styled-components";

const Container = styled.div`
  /* background-color: bisque; */
  height: 450px;
  width: 450px;
  margin: 0 auto;
  margin-bottom: 40px;
`;

function GraphContainer({ children }) {
  return <Container>{children}</Container>;
}

export default GraphContainer;
