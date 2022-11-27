import { useQuery } from "react-query";
import styled from "styled-components";
import { getUserInfo } from "../../fetch";
import NavBarCenter from "./NavBarCenter";
import NavBarLeft from "./NavBarLeft";
import NavBarRight from "./NavBarRight";

const NavBarContainer = styled.header`
  width: 100%;
  height: 50px;
  background-color: ${({ theme }) => theme.primary};
  display: flex;
  border-bottom: 1px solid ${({ theme }) => theme.borderColor};
`;

function NavBar() {
  const { data: userInfoData } = useQuery(
    "getUserInfo",
    () => getUserInfo("nickel"),
    {
      onSuccess: (data) => console.log(data),
      onError: (error) => console.log(error),
    }
  );
  return (
    <NavBarContainer>
      <NavBarLeft />
      <NavBarCenter />
      <NavBarRight />
    </NavBarContainer>
  );
}

export default NavBar;
