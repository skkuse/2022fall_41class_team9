import { useQuery } from "react-query";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";

import { getUserCourses, getUserInfo } from "../fetch";
import CodingVideo from "../assets/videos/coding.mp4";
import { Box, style } from "@mui/system";
import { Grid, Paper } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect } from "react";

const PageContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  /* background-color: #b8b8b8; */
  background-color: #e1e3e2;
`;

const NavBar = styled.div`
  width: 100%;
  height: 50px;
  height: 50px;
  background-color: ${({ theme }) => theme.primary};
  display: flex;
  justify-content: end;
  align-items: center;
`;

const WelcomeLabel = styled.div`
  color: gold;
  font-size: 20px;
  font-weight: 600;
  margin-right: 40px;
`;
const Banner = styled.div`
  position: relative;
  height: 800px;
  background-color: aliceblue;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const BannerTitle = styled.div`
  position: absolute;
  color: white;
  font-weight: 900;
  font-size: 100px;
`;

const CoursesContainer = styled.div`
  width: 100%;
  max-width: 1024px;
  margin: 0 auto;
  flex: 1;
  margin-top: 100px;
  margin-bottom: 100px;
`;

const CourseEnterBtn = styled.button`
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.bgColor};
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 5px;
  font-size: 35px;
  font-weight: 800;
`;

function CourseSelectPage() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const { data: userCourses } = useQuery(
    "getUserCourses",
    () => getUserCourses("nickel"),
    {
      onSuccess: (data) => {
        // Object.entries(data).map(([key, value]) => console.log(key, value));
      },
      onError: (error) => {
        alert(
          "데이터를 읽어오는 과정에서 문제가 생겼습니다. 프로그램을 다시 실행해주세요."
        );
      },
      // enabled: user.courses.length > 0,
      refetchOnWindowFocus: false,
      retry: false,
    }
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  const handleCourseSelect = (courseId, courseName) => {
    navigate(`/problems/${courseName}/${courseId}`);
  };

  return (
    <PageContainer>
      <NavBar>
        <WelcomeLabel>Hello, Nickel</WelcomeLabel>
      </NavBar>
      <Banner>
        <video
          muted
          autoPlay
          loop
          style={{ height: "100%", width: "100%", objectFit: "fill" }}
        >
          <source src={CodingVideo} type="video/mp4" />
        </video>
        <BannerTitle>SOL-STUDIO</BannerTitle>
      </Banner>
      <CoursesContainer>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={5}>
            {userCourses ? (
              Object.entries(userCourses).map(([key, value], index) => (
                <Grid key={key} item xs={6} md={4}>
                  <Paper
                    sx={{ height: "300px" }}
                    component={motion.div}
                    whileHover={{ scale: 1.1 }}
                  >
                    <CourseEnterBtn
                      bgColor={index % 2 == 0 ? "#ebe9e6" : "#c6c9bf"}
                      onClick={() => handleCourseSelect(value.course_id, key)}
                    >
                      {key}
                    </CourseEnterBtn>
                  </Paper>
                </Grid>
              ))
            ) : (
              <div>nouser</div>
            )}
          </Grid>
        </Box>
      </CoursesContainer>
    </PageContainer>
  );
}

export default CourseSelectPage;
