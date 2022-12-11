import { useQuery } from "react-query";
import { useSetRecoilState } from "recoil";
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

  const { data } = useQuery("getUserInfo", () => getUserInfo("nickel"), {
    onSuccess: (data) => {
      setUser(data);
      setTheme(data.setting_theme === "Dark" ? true : false);
    },
    onError: (error) => {
      alert(
        "데이터를 읽어오는 과정에서 문제가 생겼습니다. 프로그램을 다시 실행해주세요."
      );
    },
    refetchOnWindowFocus: false,
  });

  return (
    <NavBarContainer>
      <NavBarLeft />
      <NavBarCenter />
      <NavBarRight />
    </NavBarContainer>
  );
}

export default NavBar;
