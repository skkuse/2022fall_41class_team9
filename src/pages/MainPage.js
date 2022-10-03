import styled from "styled-components";
import Body from "../components/Body";
import NavBar from "../components/navBarComponents/NavBar";

const PageContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
`;
function MainPage() {
  return (
    <PageContainer>
      <NavBar />
      <Body />
    </PageContainer>
  );
}

export default MainPage;
