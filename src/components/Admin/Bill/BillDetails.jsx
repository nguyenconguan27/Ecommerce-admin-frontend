import {
  Box,
  IconButton,
  Grid,
  Button,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { dateTranfer, formatCurrency } from "../../../utils/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import config from "../../../constants/config";
function BillDetails({ setDisplayBillDetails, receipt }) {
  const handleCloseBillDetails = () => {
    setDisplayBillDetails(false);
  };
  const queryClient = useQueryClient();

  const approveMutation = useMutation({
    mutationFn: () =>
      axios.post(
        `${config.BASEURL}/receipt/approved?receipt_id=${Number(
          receipt.id.substring(2)
        )}&action=${1}`
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["receipt"] });
      setDisplayBillDetails(false);
    },
  });

  const handelApprove = () => {
    approveMutation.mutate();
  };
  return (
    <Box sx={style.coverer}>
      <Box sx={style.addUserModal}>
        <Box style={{ display: "flex", justifyContent: "flex-end" }}>
          <IconButton onClick={handleCloseBillDetails}>
            <CancelOutlinedIcon color="error" />
          </IconButton>
        </Box>
        <Typography variant="h5" textAlign="center">
          Chi tiết hóa đơn
        </Typography>
        <Grid sx={style.form} container rowSpacing={2} columnSpacing={2}>
          <Grid sx={12} sm={12} md={4}>
            <Grid item xs={12} sm={12} md={12} sx={style.infoContainer}>
              <Box sx={style.infoContainer.infoBill}>
                <Box sx={style.infoLabel}>
                  <Box sx={style.infoLabel.infoBillLabelText}>
                    Tên khách hàng:{" "}
                  </Box>
                </Box>
                <Box sx={style.infoText}>{receipt.customerDTO.username}</Box>
              </Box>
              <Box sx={style.infoContainer.infoBill}>
                <Box sx={style.infoLabel}>
                  <Box sx={style.infoLabel.infoBillLabelText}>
                    Số điện thoại:{" "}
                  </Box>
                </Box>
                <Box sx={style.infoText}>{receipt.shippingInfoDTO.number}</Box>
              </Box>
              <Box sx={style.infoContainer.infoBill}>
                <Box sx={style.infoLabel}>
                  <Box sx={style.infoLabel.infoBillLabelText}>Đia chỉ: </Box>
                </Box>
                <Box sx={style.infoText}>{receipt.shippingInfoDTO.address}</Box>
              </Box>
            </Grid>
          </Grid>
          <Grid sx={0} sm={0} md={4}></Grid>
          <Grid sx={12} sm={12} md={4}>
            <Grid item xs={12} sm={12} md={12} sx={style.infoContainer}>
              <Box sx={style.infoContainer.infoBill}>
                <Box sx={style.infoLabel}>
                  <Box sx={style.infoLabel.infoBillLabelText}>Mã hóa đơn: </Box>
                </Box>
                <Box sx={style.infoText}>{receipt.id}</Box>
              </Box>
              <Box sx={style.infoContainer.infoBill}>
                <Box sx={style.infoLabel}>
                  <Box sx={style.infoLabel.infoBillLabelText}>Ngày tạo: </Box>
                </Box>
                <Box sx={style.infoText}>{dateTranfer(receipt.orderDate)}</Box>
              </Box>
              <Box sx={style.infoContainer.infoBill}>
                <Box sx={style.infoLabel}>
                  <Box sx={style.infoLabel.infoBillLabelText}>
                    Trạng thái hóa đơn:{" "}
                  </Box>
                </Box>
                <Box sx={style.infoText}>{receipt.status}</Box>
              </Box>
            </Grid>
          </Grid>
        </Grid>
        <TableContainer style={{ padding: "16px" }}>
          <Table padding="normal">
            <TableHead>
              <TableRow>
                <TableCell size="small" align="center">
                  #No
                </TableCell>
                <TableCell size="small" align="center">
                  Tên sản phẩm
                </TableCell>
                <TableCell size="small" align="center">
                  Đơn giá
                </TableCell>
                <TableCell size="small" align="center">
                  Số lượng
                </TableCell>
                <TableCell size="small" align="center">
                  Kích thước
                </TableCell>
                <TableCell size="small" align="center">
                  Thành tiền
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {receipt.orderList.map((order, index) => {
                return (
                  <TableRow>
                    <TableCell size="small" align="center">
                      {index + 1}
                    </TableCell>
                    <TableCell size="small" align="center">
                      {order.product.title}
                    </TableCell>
                    <TableCell size="small" align="center">
                      {formatCurrency(order.price)}
                    </TableCell>
                    <TableCell size="small" align="center">
                      {order.quantity}
                    </TableCell>
                    <TableCell size="small" align="center">
                      {order.size}
                    </TableCell>
                    <TableCell size="small" align="center">
                      {formatCurrency(order.quantity * order.price)}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        {receipt && receipt.status === "Đang chờ" && (
          <Box
            style={{
              display: "flex",
              justifyContent: "flex-end",
              paddingRight: "15px",
            }}
          >
            <Button
              variant="contained"
              color="success"
              type="submit"
              onClick={handelApprove}
            >
              Duyệt đơn
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
}
/** @type {import("@mui/material").SxProps} */
const style = {
  coverer: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    zIndex: 1111,
    background: "rgba(0, 0, 0, 0.5)",
  },
  addUserModal: {
    backgroundColor: "white",
    width: "70%",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
    boxShadow: 5,
    padding: "10px",
    maxHeight: "70%",
    overflowY: "scroll",
  },
  form: {
    padding: 4,
  },
  inputsContainer: {
    display: "flex",
  },
  infoContainer: {
    infoBill: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
    },
    infoCustomer: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-start",
    },
  },
  infoLabel: {
    display: "flex",
    alignItems: "center",
    infoBillLabelText: {
      fontWeight: "600",
    },
    infoCustomerLabelText: {
      fontWeight: "600",
      marginRight: "10px",
    },
  },
  infoText: {
    fontSize: "0.9em",
  },
};
export default BillDetails;
