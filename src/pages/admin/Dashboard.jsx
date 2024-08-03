import { Box } from "@mui/material";
import React from "react";
function Dashboard() {
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
    </Box>
  );
}

export default Dashboard;
