import React, { useState } from 'react'
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Box } from '@mui/material';
Chart.register(...registerables);
const StatisticChart = () => {
    const chartData = {
        labels: ["T1", "T2", "T3", "T4", "T5", "T6", "T7", "T8", "T9", "T10", "T11", "T12"],
        datasets: [{
            label: "Doanh thu",
            data: [50000000, 100000000, 400000000, 50000000, 50000000, 70000000, 80000000, 120000000, 250000000, 450000000, 50000000, 50000000],
            backgroundColor: [
                "rgba(255, 0, 0, 0.3)",      // Red
                "rgba(255, 165, 0, 0.3)",    // Orange
                "rgba(255, 255, 0, 0.3)",    // Yellow
                "rgba(0, 255, 0, 0.3)",      // Green
                "rgba(0, 255, 255, 0.3)",    // Cyan
                "rgba(0, 0, 255, 0.3)",      // Blue
                "rgba(128, 0, 128, 0.3)",    // Purple
                "rgba(255, 20, 147, 0.3)",   // Deep Pink
                "rgba(255, 105, 180, 0.3)",  // Pink
                "rgba(255, 192, 203, 0.3)",  // Light Pink
                "rgba(75, 0, 130, 0.3)",     // Indigo
                "rgba(148, 0, 211, 0.3)"
            ],
            fill: true
        }],
    }
    return (
        <div>
            <Swiper
                modules={[Navigation]}
                spaceBetween={50}
                slidesPerView={1}
                navigation
                onSwiper={(swiper) => console.log(swiper)}
                onSlideChange={() => console.log('slide change')}
            >
                <SwiperSlide style={{ display: "flex", justifyContent: "center" }}>
                    <Box sx={style.chartHolder}>
                        <Bar
                            data={chartData}
                            options={{
                                color: "black",
                                scales: {
                                    y: {
                                        beginAtZero: true
                                    }
                                }
                            }}
                        // style={{ height: "100%" }}
                        />
                    </Box>
                </SwiperSlide>
                <SwiperSlide style={{ display: "flex", justifyContent: "center" }} >
                    <Box sx={style.chartHolder}>
                        <Bar
                            data={chartData}
                            options={{
                                color: "black",
                                scales: {
                                    y: {
                                        beginAtZero: true
                                    }
                                }
                            }}
                        // style={{ height: "100%" }}
                        />
                    </Box>
                </SwiperSlide>
                <SwiperSlide style={{ display: "flex", justifyContent: "center" }} >
                    <Box sx={style.chartHolder}>
                        <Bar
                            data={chartData}
                            options={{
                                color: "black",
                                scales: {
                                    y: {
                                        beginAtZero: true
                                    }
                                }
                            }}
                        // style={{ height: "100%" }}
                        />
                    </Box>
                </SwiperSlide>
            </Swiper>

        </div>
    )
}
/**  @type {import("@mui/material").SxProps} */
const style = {
    chartHolder: {
        width: "80%",
        display: "flex",
        justifyContent: "center"
    }
}
export default StatisticChart