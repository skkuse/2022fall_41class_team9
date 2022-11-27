import styled from "styled-components";

const TitleContainer = styled.div`
  margin-left: 40px;
  font-size: 40px;
  margin-bottom: 40px;
`;

function Title({ label }) {
  return <TitleContainer>{label}</TitleContainer>;
}

export default Title;
