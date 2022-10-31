import { RecoilRoot } from "recoil";
import MainPage from "./pages/MainPage";
import {
  BrowserRouter as router,
  Routes,
  Route,
  BrowserRouter,
} from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";

function App() {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  );
}

export default App;
