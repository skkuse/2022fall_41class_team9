import { Grid } from "@mui/material";
import { useQuery } from "react-query";
import { useRecoilValue } from "recoil";
import { currentProblemInfoState, submitResultState } from "../../../atoms";
import { searchRelated } from "../../../fetch";
import { Item } from "../Item";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Sunkyun from "../../../assets/images/sunkyun.png";

function RelatedDashboard() {
  const currentProblemInfo = useRecoilValue(currentProblemInfoState);

  const relatedData = [
    {
      title: "Program for Fibonacci numbers - GeeksforGeeks",
      link: "https://www.geeksforgeeks.org/program-for-nth-fibonacci-number/",
      snippet:
        " numbers are the numbers in the following integer sequence. 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144,.",
      thumbnail: [
        {
          src: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQYl7zuT3cw_BBRAyhdQEbQuBgqdNHXKHIYKL8S8ly8x9L_XA9sdwSmiHs",
        },
      ],
    },
    {
      title: "Fibonacci Sequence Formula - GeeksforGeeks",
      link: "https://www.geeksforgeeks.org/fibonacci-sequence-formula/",
      snippet:
        " sequence is one of the most known formulas in number theory. In the ",
      thumbnail: [
        {
          src: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcRIsOoFtFY26x9m-T8ARuP1VGyo4x6dYslErEVO4lUZfPT7eQqL_57g1wA",
        },
      ],
    },
    {
      title: "Program to print first n Fibonacci Numbers | Set 1",
      link: "https://www.geeksforgeeks.org/program-to-print-first-n-fibonacci-numbers/",
      snippet:
        " Numbers using recursion: Below is the idea to solve the problem: Use recursion to find n",
      thumbnail: [
        {
          src: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQB1a8iR3FRU9MVh9ApDVNDSIepHLi0ulG05XEt6HqGPw5KtHYfgf6lJv4",
        },
      ],
    },
    {
      title: "How to check if a given number is Fibonacci number?",
      link: "geeksforgeeks.org/check-number-fibonacci-number/",
      snippet:
        " numbers until the generated number is greater than or equal to 'n'. Following is an interesting ...",
      thumbnail: [
        {
          src: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTmf7tQlZGY5qLzh5WisQhxXVmb3KTAS0BtOA2dxLl-4H0imXXm-bhVeIFA",
        },
      ],
    },
    {
      title: "Python Program for n-th Fibonacci number - GeeksforGeeks",
      link: "https://www.geeksforgeeks.org/python-program-for-n-th-fibonacci-number/",
      snippet:
        " numbers is defined by the recurrence relation. Fn = Fn-1 + Fn-2. With seed values.",
    },
  ];
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

  const onMoreBtnClick = (url) => {
    window.open(url);
  };
  return (
    <Grid container spacing={3}>
      {relatedData && relatedData.length > 0
        ? relatedData.map((relatedItem) => (
            <Grid key={relatedItem.title} item xs={12} md={12}>
              <Card
                sx={{
                  height: "200px",
                  display: "flex",
                  "&:hover": {
                    backgroundColor: "rgba(0,0,0,0.1)",
                  },
                }}
              >
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
                <CardContent sx={{ flex: 1 }}>
                  <Typography gutterBottom variant="h5" component="div">
                    {relatedItem.title}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {relatedItem.snippet}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    onClick={() => onMoreBtnClick(relatedItem.link)}
                    sx={{ fontSize: "15px", width: "100px" }}
                  >
                    더 알아보기
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))
        : null}
    </Grid>
  );
}

export default RelatedDashboard;
