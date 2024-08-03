import { Box, Button, IconButton, Tab, Tabs, Typography } from "@mui/material";
import React, { useState } from "react";
import TabPanel from "../../components/Admin/TabPanel";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import ReplayIcon from "@mui/icons-material/Replay";
import CancelOutlined from "@mui/icons-material/CancelOutlined";
import BillDetails from "../../components/Admin/Bill/BillDetails";
import PortableWifiOffIcon from "@mui/icons-material/PortableWifiOff";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import axios from "axios";
import config from "../../constants/config";
import { dateTranfer, formatCurrency } from "../../utils/utils";
import { toast } from "react-toastify";
import { Padding } from "@mui/icons-material";

function Bill() {
  const { data: receiptData } = useQuery({
    queryKey: ["receipt"],
    queryFn: () => axios.get(`${config.BASEURL}/receipt/get-all`),
  });
  const cancelMutation = useMutation({
    mutationFn: (receiptId) =>
      axios.put(
        `${config.BASEURL}/receipt/update-status?receiptId=${receiptId}&action=0`
      ),
  });
  const approveMutation = useMutation({
    mutationFn: (receiptId) =>
      axios.post(
        `${config.BASEURL}/receipt/approved?receipt_id=${receiptId}&action=1`
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["receipt"] });
      setDisplayBillDetails(false);
    },
  });
  const notReceiveMutation = useMutation({
    mutationFn: (receiptId) =>
      axios.put(
        `${config.BASEURL}/receipt/update-status?receiptId=${receiptId}&action=5`
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["receipt"] });
    },
  });
  console.log(receiptData);
  const queryClient = useQueryClient();
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
      field: "score",
      headerName: "Điểm khách hàng",
      maxWidth: "100",
      style: {
        textAlign: "center",
        display: "flex",
        justifyContent: "center",
      },
      valueGetter: (_, row) => row.customerDTO.score,
    },
    {
      field: "action",
      headerName: "Tác vụ",
      minWidth: "120",
      sortable: false,
      headerAlign: "center",
      renderCell: (params) => {
        return (
          <Box
            style={{
              display: "flex",
              justifyContent:
                params.row.status === "Đã nhận" ||
                params.row.status === "Không nhận hàng"
                  ? "center"
                  : "start",
              width: "100%",
            }}
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
            {params.row.status === "Đang chờ" && params.row.payMethod === 2 && (
              <IconButton size="medium" sx={{ m: 1 }}>
                <CancelOutlined
                  onClick={() => {
                    cancelMutation.mutate(Number(params.row.id.substring(2)), {
                      onSuccess: () => {
                        toast.info("Từ chối đơn hàng thành công");
                        queryClient.invalidateQueries({
                          queryKey: ["receipt"],
                        });
                      },
                    });
                  }}
                />
              </IconButton>
            )}
            {params.row.status === "Đã huỷ" && (
              <IconButton size="medium" sx={{ m: 1 }}>
                <ReplayIcon
                  onClick={() => {
                    approveMutation.mutate(Number(params.row.id.substring(2)), {
                      onSuccess: () => {
                        toast.info("Chấp thuận đơn hàng thành công");
                        queryClient.invalidateQueries({
                          queryKey: ["receipt"],
                        });
                      },
                    });
                  }}
                />
              </IconButton>
            )}
            {params.row.status === "Đã giao" && (
              <IconButton size="medium" sx={{ m: 1 }}>
                <PortableWifiOffIcon
                  onClick={() => {
                    notReceiveMutation.mutate(
                      Number(params.row.id.substring(2)),
                      {
                        onSuccess: () => {
                          queryClient.invalidateQueries({
                            queryKey: ["receipt"],
                          });
                        },
                      }
                    );
                  }}
                />
              </IconButton>
            )}
          </Box>
        );
      },
    },
  ];

  const getStatus = (status) => {
    if (status === 1) return "Đang chờ";
    else if (status === 2) return "Đã giao";
    else if (status === 3) return "Đã nhận";
    else if (status === 4) return "Đã huỷ";
    else return "Không nhận hàng";
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
    } else if (receipt.status === 4) {
      receiptsCancle.push({
        ...receipt,
        id: "HD" + String(receipt.id),
        status: getStatus(receipt.status),
      });
    } else {
      receiptsReceived.push({
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
          Quản lý hoá đơn
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
