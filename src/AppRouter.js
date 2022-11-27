import { useRecoilValue } from "recoil";
import MainPage from "./pages/MainPage";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";
import { themeState } from "./atoms";
import { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme } from "./theme";

function AppRouter() {
  const theme = useRecoilValue(themeState);
  return (
    <ThemeProvider theme={theme ? darkTheme : lightTheme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default AppRouter;
