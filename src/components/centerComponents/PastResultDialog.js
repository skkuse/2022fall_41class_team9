import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useQuery } from "react-query";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  actionState,
  currentProblemInfoState,
  dialogOpenState,
  doneSubmitState,
  submitResultState,
  testState,
  userState,
} from "../../atoms";
import { ERROR_CODE_RESULT } from "../../constants/DummyData";
import { getPastSubmitResult } from "../../fetch";

function PastResultDialog({ open, setOpen }) {
  const [submitId, setSubmitId] = useState(0);
  const [loaderOpen, setLoaderOpen] = useState(false);
  const [isDataLoading, setIsDataLoading] = useState(true);
  const userInfo = useRecoilValue(userState);
  const problemInfo = useRecoilValue(currentProblemInfoState);
  const setSubmitResult = useSetRecoilState(submitResultState);
  const setAction = useSetRecoilState(actionState);
  const setDialogOpen = useSetRecoilState(dialogOpenState);
  const setUserCode = useSetRecoilState(testState);
  const setDoneSubmit = useSetRecoilState(doneSubmitState);

  const { isLoading: pastDataLoading, data: pastSubmitData } = useQuery(
    "getPastSubmitResult",
    () => getPastSubmitResult(userInfo.user_id, problemInfo.prob_id),
    {
      // enabled: open,
      onSuccess: (data) => {
        console.log(data);
      },
      onError: (error) => console.log(error),
    }
  );

  const getSubmissionResult = async (submitId) => {
    try {
      const response = await axios.get(`/onlinejudge/analysis2/${submitId}`);
      setIsDataLoading(false);
      setSubmitResult(response.data);
      const result = pastSubmitData.find((item) => item.submit_id === submitId);
      if (result) {
        setUserCode(result.user_code);
      }
      setDoneSubmit(true);
      setAction("submit");
    } catch (error) {
      console.log(error);
      setIsDataLoading(false);
      setSubmitResult(ERROR_CODE_RESULT);
      setDoneSubmit(true);
      setAction("submit");
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handelSelectChange = (event) => {
    setSubmitId(event.target.value);
  };

  const handleRecallBtnClick = () => {
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
    <>
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
          <Button onClick={handleRecallBtnClick} autoFocus>
            불러오기
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={loaderOpen}
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
    </>
  );
}

export default PastResultDialog;
