import styled from "styled-components";
import { useRecoilValue, useSetRecoilState, useRecoilState } from "recoil";
import {
  saveState,
  savePartState,
  testState,
  actionState,
  userState,
  currentProblemInfoState,
  submitResultState,
  dialogOpenState,
} from "../../atoms";
import { act } from "react-dom/test-utils";
import {
  Box,
  Button,
  FormControl,
  CircularProgress,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useMutation, useQuery } from "react-query";
import { getPastSubmitResult, submitCode } from "../../fetch";
import axios from "axios";

const CenterHeaderContainer = styled.div`
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  border-bottom: 1px solid ${({ theme }) => theme.borderColor};
`;
const CenterHeaderText = styled.h2`
  color: black;
  font-size: 1.5em;
`;
const CenterHeaderBtnContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-left: 16px;
  margin-right: 16px;
  height: 100%;
  /* gap: 20px; */
`;

const SaveBtnContainer = styled.div`
  display: flex;
  height: 100%;
  align-items: flex-end;
`;
const CenterHeaderBtn = styled.button`
  width: 90px;
  height: 30px;
  background-color: black;
  color: white;
  border: none;
  border-radius: 8px 8px 0px 0px;
  cursor: pointer;
`;

function CenterHeader(props) {
  const [savePart, setSavePart] = useRecoilState(savePartState);
  const [test, setTest] = useRecoilState(testState);
  const [action, setAction] = useRecoilState(actionState);

  const userInfo = useRecoilValue(userState);
  const problemInfo = useRecoilValue(currentProblemInfoState);
  const [open, setOpen] = useState(false);
  const [submitId, setSubmitId] = useState(0);
  const [loaderOpen, setLoaderOpen] = useState(false);
  const [isDataLoading, setIsDataLoading] = useState(true);
  const setDialogOpen = useSetRecoilState(dialogOpenState);
  const setSubmitResult = useSetRecoilState(submitResultState);

  const getSubmissionResult = async (submitId) => {
    try {
      const response = await axios.get(`/onlinejudge/analysis2/${submitId}`);
      // console.log(response.data);
      setIsDataLoading(false);
      setSubmitResult(response.data);
      setAction("submit");
    } catch (error) {
      console.log(error);
      setIsDataLoading(false);
      alert("제출코드에 에러가 있습니다");
      setLoaderOpen(false);
    }
  };

  const { isLoading: pastDataLoading, data: pastSubmitData } = useQuery(
    "getPastSubmitResult",
    () => getPastSubmitResult(userInfo.user_id, problemInfo.prob_id),
    {
      onSuccess: (data) => {
        // console.log(data);
      },
      onError: (error) => console.log(error),
    }
  );
  const handleClickOpen = () => {
    localStorage.setItem(savePart, test);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handelSelectChange = (event) => {
    setSubmitId(event.target.value);
  };

  const handleRecallBtnClcik = () => {
    setOpen(false);
    if (submitId > 0) {
      getSubmissionResult(submitId);
      setLoaderOpen(true);
    } else {
      alert("선택한 과거 기록이 없습니다");
    }
  };

  const handleMoveBtnClick = () => {
    setLoaderOpen(false);
    setDialogOpen(true);
  };

  return (
    <CenterHeaderContainer>
      <CenterHeaderBtnContainer>
        <SaveBtnContainer>
          <CenterHeaderBtn
            disabled={action === "submit"}
            style={{
              backgroundColor: savePart === 1 ? "#1a2736" : "#b5b3b4",
            }}
            onClick={() => {
              const tmp = savePart;
              localStorage.setItem(tmp, test);
              setSavePart(1);
              props.editor.current.setValue(localStorage.getItem(1));
            }}
          >
            1
          </CenterHeaderBtn>
          <CenterHeaderBtn
            disabled={action === "submit"}
            style={{
              backgroundColor: savePart === 2 ? "#1a2736" : "#b5b3b4",
            }}
            onClick={() => {
              const tmp = savePart;
              localStorage.setItem(tmp, test);
              setSavePart(2);
              props.editor.current.setValue(localStorage.getItem(2));
            }}
          >
            2
          </CenterHeaderBtn>
          <CenterHeaderBtn
            disabled={action === "submit"}
            style={{
              backgroundColor: savePart === 3 ? "#1a2736" : "#b5b3b4",
            }}
            onClick={() => {
              const tmp = savePart;
              localStorage.setItem(tmp, test);
              setSavePart(3);
              props.editor.current.setValue(localStorage.getItem(3));
            }}
          >
            3
          </CenterHeaderBtn>
        </SaveBtnContainer>
        <Button
          onClick={handleClickOpen}
          variant="contained"
          sx={{ height: "30px" }}
        >
          과거 제출 결과 불러오기
        </Button>
      </CenterHeaderBtnContainer>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle
          sx={{ width: "500px", marginBottom: "20px" }}
          id="alert-dialog-title"
        >
          {"불러올 제출 결과를 선택해주세요"}
        </DialogTitle>
        <DialogContent sx={{ paddingTop: "24px !important" }}>
          <Box sx={{ minWidth: 120 }}>
            {pastDataLoading ? (
              <div>과거 제출 이력을 불러오는 중입니다...</div>
            ) : (
              <FormControl sx={{}} fullWidth>
                <InputLabel id="demo-simple-select-label">
                  과거 제출 결과
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={submitId}
                  label="pastResult"
                  onChange={handelSelectChange}
                >
                  <MenuItem value={0}>{`기록을 선택해주세요`}</MenuItem>
                  {pastSubmitData && pastSubmitData.length > 0 ? (
                    pastSubmitData.map((item) => (
                      <MenuItem
                        key={item.submit_id}
                        value={item.submit_id}
                      >{`${item.counter}번째 제출 기록`}</MenuItem>
                    ))
                  ) : (
                    <MenuItem value={0} disabled>
                      제출 이력이 없습니다
                    </MenuItem>
                  )}
                </Select>
              </FormControl>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>취소</Button>
          <Button onClick={handleRecallBtnClcik} autoFocus>
            불러오기
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={loaderOpen}
        // onClose={() => setLoaderOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle sx={{ width: "500px" }} id="alert-dialog-title">
          {"과거 기록을 불러오는 중입니다..."}
        </DialogTitle>
        <DialogContent
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {isDataLoading ? (
            <CircularProgress color="inherit" />
          ) : (
            <div>결과를 보러 가시겠습니까?</div>
          )}
        </DialogContent>
        <DialogActions>
          {isDataLoading ? null : (
            <>
              <Button onClick={() => setLoaderOpen(false)}>아니요</Button>
              <Button onClick={handleMoveBtnClick} autoFocus>
                네
              </Button>
            </>
          )}
        </DialogActions>
      </Dialog>
    </CenterHeaderContainer>
  );
}

export default CenterHeader;
