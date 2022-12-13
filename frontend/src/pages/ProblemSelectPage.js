import { useEffect } from "react";
import { useQuery } from "react-query";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { getCourseQuestions } from "../fetch";
import { IoHomeSharp } from "react-icons/io5";
import { motion } from "framer-motion";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";

const PageContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #e1e3e2;
`;

const NavBar = styled.div`
  width: 100%;
  height: 50px;
  height: 50px;
  background-color: ${({ theme }) => theme.primary};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const HomeBtn = styled.button`
  width: 50px;
  height: 100%;
  background-color: transparent;
  border: none;
  margin-left: 18px;
  color: #bcbcbb;
  cursor: pointer;
`;

const WelcomeLabel = styled.div`
  color: gold;
  font-size: 20px;
  font-weight: 600;
  margin-right: 40px;
`;

const ProblemsContainer = styled.div`
  width: 100%;
  max-width: 1024px;
  background-color: white;
  margin: 0 auto;
  min-height: 100vh;
`;

const CourseName = styled.div`
  width: 100%;
  margin-top: 100px;
  margin-bottom: 200px;
  font-size: 100px;
  font-weight: 900;
  color: black;
  margin-left: 60px;
`;

const Problems = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 40px;
`;

const ProblemsIntro = styled.div`
  width: 90%;
  float: left;
  font-size: 35px;
  font-weight: 600;
`;

const Problem = styled(motion.div)`
  position: relative;
  width: 90%;
  height: 80px;
  font-size: 20px;
  border-radius: 10px;

  display: flex;
  align-items: center;
  box-sizing: border-box;
  background-color: whitesmoke;
  box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.4);
  display: flex;
`;

const ProblemIndex = styled.div`
  position: relative;
  width: 100px;
  height: 100%;
  border-radius: 10px 0px 0px 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const ProblemTitle = styled.div`
  padding-left: 20px;
  flex: 1;
  font-size: 24px;
  font-weight: 600;
`;

const Divider = styled.div`
  border-right: 2px solid black;
  position: absolute;
  top: 10%;
  bottom: 10%;
  right: 0;
`;

const ArrowContainer = styled.div`
  position: absolute;
  right: 20px;
  font-size: 28px;
`;

function ProblemSelectPage() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const { courseName, courseId } = useParams();

  const { data } = useQuery(
    "getCourseQuestions",
    () => getCourseQuestions(courseId),
    {
      onSuccess: (data) => {
        // console.log(data);
      },
      onError: (error) => console.log(error),
    }
  );

  // window.location.reload();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const handleProblemClick = (probId) => {
    navigate(`/editor/${courseName}/${probId}`);
  };
  const handleHomeBtnClick = () => {
    navigate("/");
  };
  return (
    <PageContainer>
      <NavBar>
        <HomeBtn onClick={handleHomeBtnClick}>
          <IoHomeSharp size="1.8rem" />
        </HomeBtn>
        <WelcomeLabel>Hello, Nickel</WelcomeLabel>
      </NavBar>
      <ProblemsContainer>
        <CourseName>{`" ${courseName} "`}</CourseName>
        <Problems>
          <ProblemsIntro>Problems</ProblemsIntro>
          {data &&
            data.map((question, idx) => (
              <Problem
                key={question.prob_id}
                onClick={() => handleProblemClick(question.prob_id)}
                whileHover={{ scale: 1.02 }}
              >
                {
                  <>
                    <ProblemIndex>
                      {`문제 ${idx + 1}번`} <Divider />
                    </ProblemIndex>{" "}
                    <ProblemTitle>{`${question.title}`}</ProblemTitle>
                    <ArrowContainer>
                      <HiOutlineArrowNarrowRight />
                    </ArrowContainer>
                  </>
                }
              </Problem>
            ))}
        </Problems>
      </ProblemsContainer>
    </PageContainer>
  );
}

export default ProblemSelectPage;
