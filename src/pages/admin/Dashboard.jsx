import { Box, Card, Divider, Grid, Typography } from "@mui/material";
import axios from "axios";
import React from "react";
import { useEffect, useMemo, useRef, useState } from "react";
function Dashboard() {
  const [month, setMonth] = useState(-1);
  const [year, setYear] = useState(-1);
  const [quater, setQuater] = useState(-1);
  const handleExport = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/export/exportReport?month=${month}&year=${year}`,
        {
          responseType: "blob",
        }
      );

      const blob = new Blob([response.data], { type: "application/pdf" });

      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = `report_${month}_${year}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("There was an error downloading the report:", error);
    }
  };

  useEffect(() => {
    let currentDate = new Date();

    let currentYear = currentDate.getFullYear(); // Lấy năm hiện tại
    let currentMonth = currentDate.getMonth() + 1;
    if (currentMonth == 1) {
      currentMonth = 12;
      currentYear = currentYear - 1;
    }
    setMonth(currentMonth - 1);
    setYear(currentYear);
  }, []);

  const handleChangeMonth = (e) => {
    setMonth(e.target.value);
  };
  const handleChangeYear = (e) => {
    setYear(e.target.value);
  };

  return (
    <Box>
      <iframe
        title="Ecommerce_OLAP"
        width="1300"
        height="600"
        src="https://app.powerbi.com/reportEmbed?reportId=7d497a0f-cc1e-44c3-9efd-31e4f9b5f269&autoAuth=true&ctid=e7572e92-7aee-4713-a3c4-ba64888ad45f"
        frameborder="0"
        allowFullScreen="true"
      ></iframe>
      <div className="w-[30%] flex justify-between items-end">
        <span>Tháng:</span>
        <select
          onChange={handleChangeMonth}
          name="month"
          value={month}
          id=""
          className="border border-gray-600 rounded-sm"
        >
          {Array(12)
            .fill(0)
            .map((_, index) => {
              return <option value={index + 1}>{index + 1}</option>;
            })}
        </select>
        <span>Năm:</span>
        <select
          onChange={handleChangeYear}
          name="year"
          value={year}
          id=""
          className="border border-gray-600 rounded-sm"
        >
          {Array(4)
            .fill(2021)
            .map((value, index) => {
              return <option value={value + index}>{value + index}</option>;
            })}
        </select>
        <button
          className="px-2 py-2 bg-sky-500 text-white rounded-sm"
          onClick={handleExport}
        >
          Xuất báo cáo
        </button>
      </div>
    </Box>
  );
}

export default Dashboard;
