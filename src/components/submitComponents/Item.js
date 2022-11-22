import styled from "@emotion/styled";
import { Paper } from "@mui/material";

export const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  height: "200px",
  // padding: "20px",
  textAlign: "center",
  color: "grey",
  marginBottom: "16px",
}));
