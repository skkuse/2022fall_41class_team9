import { useRecoilValue } from "recoil";
import MainPage from "./pages/MainPage";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { themeState } from "./atoms";
import { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme } from "./theme";

import CourseSelectPage from "./pages/CourseSelectPage";
import ProblemSelectPage from "./pages/ProblemSelectPage";

function AppRouter() {
  const theme = useRecoilValue(themeState);
  return (
    <ThemeProvider theme={theme ? darkTheme : lightTheme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<CourseSelectPage />} />
          <Route
            path="/problems/:courseName/:courseId"
            element={<ProblemSelectPage />}
          />
          <Route path="/editor/:courseName/:probId" element={<MainPage />} />
        </Routes>
      </BrowserRouter>
      {/* <MainPage /> */}
    </ThemeProvider>
  );
}

export default AppRouter;
