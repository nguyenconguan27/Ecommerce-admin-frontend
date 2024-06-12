import { Box, Button, IconButton, Tab, Tabs, Typography } from "@mui/material";
import React, { useState } from "react";
import TabPanel from "../../components/Admin/TabPanel";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import CancelOutlined from "@mui/icons-material/CancelOutlined";
import BillDetails from "../../components/Admin/Bill/BillDetails";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import config from "../../constants/config";
import { dateTranfer, formatCurrency } from "../../utils/utils";

function Bill() {
  const { data: receiptData } = useQuery({
    queryKey: ["receipt"],
    queryFn: () => axios.get(`${config.BASEURL}/receipt/get-all`),
  });
  console.log(receiptData);
  const [detail, setDetail] = useState(null);
  const columns = [
    {
      field: "id",
      headerName: "Mã hóa đơn",
      minWidth: "200",
      hideable: false,
    },
    {
      field: "orderDate",
      headerName: "Ngày tạo",
      minWidth: "150",
      renderCell: (params) => {
        return dateTranfer(params.row.orderDate);
      },
    },
    {
      field: "status",
      headerName: "Tình trạng",
      minWidth: "200",
    },
    {
      field: "payMethod",
      headerName: "Phương thức thanh toán",
      minWidth: "200",
      renderCell: (params) => {
        return params.row.payMethod === 1 ? "Thanh toán qua thẻ" : "Trực tiếp";
      },
    },

    {
      field: "total",
      headerName: "Tổng tiền",
      minWidth: "200",
      renderCell: (params) => {
        return formatCurrency(params.row.total);
      },
    },
    {
      field: "action",
      headerName: "Tác vụ",
      minWidth: "140",
      sortable: false,
      headerAlign: "center",
      renderCell: (params) => {
        return (
          <Box
            style={{ display: "flex", justifyContent: "center", width: "100%" }}
          >
            <IconButton
              size="medium"
              sx={{ m: 1 }}
              onClick={() => {
                setDisplayBillDetails(true);
                setDetail(params.row);
              }}
            >
              <InfoOutlinedIcon />
            </IconButton>
            <IconButton size="medium" sx={{ m: 1 }}>
              <CancelOutlined />
            </IconButton>
          </Box>
        );
      },
    },
  ];

  const getStatus = (status) => {
    if (status === 1) return "Đang chờ";
    else if (status === 2) return "Đã giao";
    else if (status === 3) return "Đã nhận";
    else return "Đã huỷ";
  };
  console.log(receiptData);

  const receiptsWait = [];
  const receiptsShipping = [];
  const receiptsReceived = [];
  const receiptsCancle = [];
  receiptData?.data.data.map((receipt) => {
    if (receipt.status === 1) {
      receiptsWait.push({
        ...receipt,
        id: "HD" + String(receipt.id),
        status: getStatus(receipt.status),
      });
    } else if (receipt.status === 2) {
      receiptsShipping.push({
        ...receipt,
        id: "HD" + String(receipt.id),
        status: getStatus(receipt.status),
      });
    } else if (receipt.status === 3) {
      receiptsReceived.push({
        ...receipt,
        id: "HD" + String(receipt.id),
        status: getStatus(receipt.status),
      });
    } else {
      receiptsCancle.push({
        ...receipt,
        id: "HD" + String(receipt.id),
        status: getStatus(receipt.status),
      });
    }
  });

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [displayBillDetails, setDisplayBillDetails] = useState(false);
  return (
    <div>
      <Box>
        <Typography sx={style.pageTitle} variant="h5">
          Quản lý người dùng
        </Typography>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs value={value} onChange={handleChange}>
            <Tab label="Hóa đơn chờ" id="tab-0" />
            <Tab label="Hóa đơn giao" id="tab-1" />
            <Tab label="Đã giao" id="tab-2" />
            <Tab label="Đã huỷ" id="tab-3" />
          </Tabs>
          <TabPanel value={value} index={0}>
            <DataGrid
              sx={{ boxShadow: 2, mt: 2 }}
              columns={columns}
              rows={receiptsWait}
              slots={{
                toolbar: GridToolbar,
              }}
              initialState={{
                pagination: { paginationModel: { pageSize: 10 } },
              }}
            ></DataGrid>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <DataGrid
              columns={columns}
              rows={receiptsShipping}
              slots={{
                toolbar: GridToolbar,
              }}
              sx={{ boxShadow: 2, mt: 2 }}
              initialState={{
                pagination: { paginationModel: { pageSize: 10 } },
              }}
            ></DataGrid>
          </TabPanel>
          <TabPanel value={value} index={2}>
            <DataGrid
              columns={columns}
              rows={receiptsReceived}
              slots={{
                toolbar: GridToolbar,
              }}
              sx={{ boxShadow: 2, mt: 2 }}
              initialState={{
                pagination: { paginationModel: { pageSize: 10 } },
              }}
            ></DataGrid>
          </TabPanel>
          <TabPanel value={value} index={3}>
            <DataGrid
              columns={columns}
              rows={receiptsCancle}
              slots={{
                toolbar: GridToolbar,
              }}
              sx={{ boxShadow: 2, mt: 2 }}
              initialState={{
                pagination: { paginationModel: { pageSize: 10 } },
              }}
            ></DataGrid>
          </TabPanel>
        </Box>
      </Box>
      {displayBillDetails && (
        <BillDetails
          setDisplayBillDetails={setDisplayBillDetails}
          typeBill={value}
          receipt={detail}
        />
      )}
    </div>
  );
}
/** @type {import("@mui/material").SxProps} */
const style = {
  pageTitle: {
    mb: 2,
  },
};
export default Bill;
