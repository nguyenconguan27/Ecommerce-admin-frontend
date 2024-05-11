import { Box, Card, Divider, Grid, Typography } from "@mui/material";
import React from "react";
import ColorText from "../../components/Admin/ColorText";
import ShoppingBasketOutlinedIcon from "@mui/icons-material/ShoppingBasketOutlined";
import CrisisAlertOutlinedIcon from "@mui/icons-material/CrisisAlertOutlined";
import ArrowUpwardOutlinedIcon from "@mui/icons-material/ArrowUpwardOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import LocalAtmOutlinedIcon from "@mui/icons-material/LocalAtmOutlined";
import PaidOutlinedIcon from "@mui/icons-material/PaidOutlined";
import CurrencyExchangeOutlinedIcon from "@mui/icons-material/CurrencyExchangeOutlined";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import StatisticChart from "../../components/Admin/Dashboard/StatisticChart";
import EmojiEventsOutlinedIcon from "@mui/icons-material/EmojiEventsOutlined";
import RankProduct from "../../components/Admin/Dashboard/RankProduct";
function Dashboard() {
  const top10 = [
    {
      name: "Máy lọc không khí chống dị ứng thú cưng Levoit Vital 100S",
      sale: 250,
    },
    {
      name: "Samsung Galaxy S24 Ultra 12GB 256GB",
      sale: 230,
    },
    {
      name: "Bàn chải điện Oral-B Vitality Crossaction Blue D12.513",
      sale: 210,
    },
    {
      name: "Apple iPhone 14 Pro Max 256GB",
      sale: 200,
    },
    {
      name: "Google Pixel 7 XL 128GB",
      sale: 180,
    },
    {
      name: "OnePlus 10 Pro 12GB 256GB",
      sale: 150,
    },
    {
      name: "Xiaomi Mi 13 Ultra 12GB 512GB",
      sale: 120,
    },
    {
      name: "Huawei P50 Pro 8GB 256GB",
      sale: 100,
    },
    {
      name: "Sony Xperia 1 III 12GB 256GB",
      sale: 80,
    },
    {
      name: "LG Velvet 3 5G 8GB 128GB",
      sale: 50,
    },
  ];
  return (
    <Box>
      {/* <Typography sx={style.pageTitle} variant='h5'>Thống kê doanh thu </Typography>
            <Box sx={{marginBottom:"50px"}} >
                <Grid container rowSpacing={5} columnSpacing={5}>
                    <Grid item xs={12} sm={6} md={3}>
                        <Card sx={style.item}>
                            <Box sx={{ backgroundColor: "#2D9596" }}>
                                <Box sx={style.item.cardTitle}>
                                    <ShoppingBasketOutlinedIcon />
                                    <Box sx={style.item.cardTitle.text} >Đã bán</Box>
                                </Box>
                            </Box>
                            <Box sx={style.item.cardNumber}>
                                <ColorText color="#2D9596" children="115" />
                            </Box>
                            <Divider />
                            <Box sx={style.item.statistic}>
                                <Box sx={style.item.statistic.container} >
                                    <CrisisAlertOutlinedIcon />
                                    <Box sx={style.item.statistic.container.number} >
                                        <ArrowUpwardOutlinedIcon fontSize='small' />
                                        <ColorText color="#2D9596" children={"5%"} />
                                    </Box>
                                </Box>
                                <Box sx={style.item.statistic.container} >
                                    <CalendarMonthOutlinedIcon />
                                    <Box sx={style.item.statistic.container.number} >
                                        <ArrowUpwardOutlinedIcon fontSize='small' />
                                        <ColorText color="#2D9596" children={"5%"} />
                                    </Box>
                                </Box>
                            </Box>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Card sx={style.item}>
                            <Box sx={{ backgroundColor: "#2D9596" }}>
                                <Box sx={style.item.cardTitle}>
                                    <LocalAtmOutlinedIcon />
                                    <Box sx={style.item.cardTitle.text} >Doanh thu</Box>
                                </Box>
                            </Box>
                            <Box sx={style.item.cardNumber}>
                                <ColorText color="#2D9596" children="300.000.000 VND" />
                            </Box>
                            <Divider />
                            <Box sx={style.item.statistic}>
                                <Box sx={style.item.statistic.container} >
                                    <CrisisAlertOutlinedIcon />
                                    <Box sx={style.item.statistic.container.number} >
                                        <ArrowUpwardOutlinedIcon fontSize='small' />
                                        <ColorText color="#2D9596" children={"5%"} />
                                    </Box>
                                </Box>
                                <Box sx={style.item.statistic.container} >
                                    <CalendarMonthOutlinedIcon />
                                    <Box sx={style.item.statistic.container.number} >
                                        <ArrowUpwardOutlinedIcon color='#2D9596' fontSize='small' />
                                        <ColorText color="#2D9596" children={"5%"} />
                                    </Box>
                                </Box>
                            </Box>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Card sx={style.item}>
                            <Box sx={{ backgroundColor: "#2D9596" }}>
                                <Box sx={style.item.cardTitle}>
                                    <PaidOutlinedIcon />
                                    <Box sx={style.item.cardTitle.text} >Lợi nhuận</Box>
                                </Box>
                            </Box>
                            <Box sx={style.item.cardNumber}>
                                <ColorText color="#2D9596" children="100.000.000 VND" />
                            </Box>
                            <Divider />
                            <Box sx={style.item.statistic}>
                                <Box sx={style.item.statistic.container} >
                                    <CrisisAlertOutlinedIcon />
                                    <Box sx={style.item.statistic.container.number} >
                                        <ArrowUpwardOutlinedIcon fontSize='small' />
                                        <ColorText color="#2D9596" children={"5%"} />
                                    </Box>
                                </Box>
                                <Box sx={style.item.statistic.container} >
                                    <CalendarMonthOutlinedIcon />
                                    <Box sx={style.item.statistic.container.number} >
                                        <ArrowUpwardOutlinedIcon color='#2D9596' fontSize='small' />
                                        <ColorText color="#2D9596" children={"5%"} />
                                    </Box>
                                </Box>
                            </Box>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Card sx={style.item}>
                            <Box sx={{ backgroundColor: "#2D9596" }}>
                                <Box sx={style.item.cardTitle}>
                                    <CurrencyExchangeOutlinedIcon />
                                    <Box sx={style.item.cardTitle.text} >Chi phí</Box>
                                </Box>
                            </Box>
                            <Box sx={style.item.cardNumber}>
                                <ColorText color="#2D9596" children="200.000.000 VND" />
                            </Box>
                            <Divider />
                            <Box sx={style.item.statistic}>
                                <Box sx={style.item.statistic.container} >
                                    <CrisisAlertOutlinedIcon />
                                    <Box sx={style.item.statistic.container.number} >
                                        <ArrowUpwardOutlinedIcon fontSize='small' />
                                        <ColorText color="#2D9596" children={"5%"} />
                                    </Box>
                                </Box>
                                <Box sx={style.item.statistic.container} >
                                    <CalendarMonthOutlinedIcon />
                                    <Box sx={style.item.statistic.container.number} >
                                        <ArrowUpwardOutlinedIcon color='#2D9596' fontSize='small' />
                                        <ColorText color="#2D9596" children={"5%"} />
                                    </Box>
                                </Box>
                            </Box>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={12} md={7} style={{maxHeight:"500px"}}>
                        <Card sx={style.item}>
                            <Box sx={{ backgroundColor: "#2D9596" }}>
                                <Box sx={style.item.cardTitle}>
                                    <TimelineOutlinedIcon />
                                    <Box sx={style.item.cardTitle.text} >Doanh thu theo thời gian</Box>
                                </Box>
                            </Box>
                            <Box sx={style.item.chartContainer}>
                                <StatisticChart />
                            </Box>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={12} md={5} style={{maxHeight:"500px"}}>
                        <Card sx={style.item}>
                            <Box sx={{ backgroundColor: "#2D9596" }}>
                                <Box sx={style.item.cardTitle}>
                                    <EmojiEventsOutlinedIcon />
                                    <Box sx={style.item.cardTitle.text} >Top 10 sản phẩm bán chạy</Box>
                                </Box>
                            </Box>
                            <Box sx={style.item.rankProductContainer}>
                                {top10.map((product,index)=>{
                                    return(
                                        <RankProduct number={index+1} product={product} />
                                    )
                                })}
                            </Box>
                        </Card>
                    </Grid>
                </Grid>
            </Box> */}
      <iframe
        title="abc"
        width="1140"
        height="541.25"
        src="https://app.powerbi.com/reportEmbed?reportId=59aa0e42-894d-42ea-93a4-5b8c5408842f&autoAuth=true&ctid=e7572e92-7aee-4713-a3c4-ba64888ad45f"
        frameborder="0"
        allowFullScreen="true"
      ></iframe>
    </Box>
  );
}
/**  @type {import("@mui/material").SxProps} */
const style = {
  pageTitle: {
    mb: 2,
  },
  item: {
    cardTitle: {
      display: "flex",
      alignItems: "flex-start",
      text: {
        fontSize: "1.2rem",
        ml: 1,
      },
      p: 1.5,
      color: "white",
    },
    cardNumber: {
      fontSize: "1.3em",
      fontWeight: "500",
      p: 1.5,
    },
    statistic: {
      display: "flex",
      p: 1.5,
      justifyContent: "space-around",
      container: {
        p: 1,
        display: "flex",
        backgroundColor: "#F0F3FF",
        alignItems: "baseline",
        number: {
          ml: 2,
          display: "flex",
          alignItems: "center",
          fontSize: "1rem",
        },
      },
    },
    chartContainer: {
      color: "#2D9596",
      height: "auto",
      width: "100%",
      padding: "1em",
      maxHeight: "400px",
    },
    rankProductContainer: {
      p: 2,
      maxHeight: "333px",
      overflowY: "scroll",
    },
  },
};
export default Dashboard;
