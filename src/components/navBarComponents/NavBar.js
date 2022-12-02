import { useEffect } from "react";
import { useMutation, useQuery } from "react-query";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { themeState, userState } from "../../atoms";

import { getUserInfo } from "../../fetch";
import NavBarCenter from "./NavBarCenter";
import NavBarLeft from "./NavBarLeft";
import NavBarRight from "./NavBarRight";

const NavBarContainer = styled.header`
  width: 100%;
  height: 50px;
  background-color: ${({ theme }) => theme.primary};
  display: flex;
`;

function NavBar() {
  const setUser = useSetRecoilState(userState);
  const setTheme = useSetRecoilState(themeState);

  const { data: userInfoData } = useQuery(
    "getUserInfo",
    () => getUserInfo("nickel"),
    {
      onSuccess: (data) => {
        setUser(data);
        setTheme(data.setting_theme === "Dark" ? true : false);
      },
      onError: (error) => console.log(error),
      refetchOnWindowFocus: false,
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
