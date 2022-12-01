import { Grid } from "@mui/material";
import { useQuery } from "react-query";
import { useRecoilValue } from "recoil";
import { currentProblemInfoState, submitResultState } from "../../atoms";
import { searchRelated } from "../../fetch";
import { Item } from "./Item";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Sunkyun from "../../assets/images/sunkyun.png";

function RelatedDashboard() {
  const currentProblemInfo = useRecoilValue(currentProblemInfoState);
  // console.log(currentProblemInfo);
  const relatedData = [];
  // const { data: relatedData } = useQuery(
  //   "searchRelated",
  //   () =>
  //     searchRelated(
  //       currentProblemInfo && currentProblemInfo.tag
  //         ? currentProblemInfo.tag
  //         : "binarysearch"
  //     ),
  //   {
  //     onSuccess: (data) => console.log(data),
  //     onError: (error) => console.log(error),
  //   }
  // );
  return (
    <Grid container spacing={3}>
      {relatedData && relatedData.length > 0
        ? relatedData.map((relatedItem) => (
            <Grid key={relatedItem.title} item xs={12} md={12}>
              <Card sx={{ height: "200px", display: "flex" }}>
                <CardMedia
                  component="img"
                  alt="green iguana"
                  // height="140"
                  sx={{ objectFit: "contain", width: "30%" }}
                  image={
                    relatedItem.thumbnail
                      ? relatedItem.thumbnail[0].src
                      : Sunkyun
                  }
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {relatedItem.title}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {relatedItem.snippet}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small">더 알아보기</Button>
                </CardActions>
              </Card>
            </Grid>
          ))
        : null}
    </Grid>
  );
}

export default RelatedDashboard;
