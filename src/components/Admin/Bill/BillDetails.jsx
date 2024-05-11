import { Box, IconButton, Grid, Button, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Typography } from '@mui/material'
import React, { useState } from 'react'
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
function BillDetails({ setDisplayBillDetails }) {
    const handleCloseBillDetails = () => {
        setDisplayBillDetails(false)
    }
    return (
        <Box sx={style.coverer}>
            <Box sx={style.addUserModal}>
                <Box style={{ display: 'flex', justifyContent: "flex-end" }}>
                    <IconButton
                        onClick={handleCloseBillDetails}
                    >
                        <CancelOutlinedIcon color='error' />
                    </IconButton>
                </Box>
                <Typography variant='h5' textAlign="center">Chi tiết hóa đơn</Typography>
                <Grid sx={style.form} container rowSpacing={2} columnSpacing={2}>
                    <Grid xs={12} sm={12} md={7}>
                        <Grid item xs={12} sm={12} md={12} sx={style.infoContainer}>
                            <Box sx={style.infoContainer.infoCustomer} >
                                <Box sx={style.infoLabel}>
                                    <Box sx={style.infoLabel.infoCustomerLabelText} >Tên khách hàng: </Box>
                                </Box>
                                <Box sx={style.infoText} >Nguyễn Cảnh Hưng</Box>
                            </Box>
                            <Box sx={style.infoContainer.infoCustomer} >
                                <Box sx={style.infoLabel}>
                                    <Box sx={style.infoLabel.infoCustomerLabelText} >Số điện thoại: </Box>
                                </Box>
                                <Box sx={style.infoText} >0987112451</Box>
                            </Box>
                            <Box sx={style.infoContainer.infoCustomer} >
                                <Box sx={style.infoLabel}>
                                    <Box sx={style.infoLabel.infoCustomerLabelText} >Địa chỉ: </Box>
                                </Box>
                                <Box sx={style.infoText}>15 Trần Phú, Hoàng Mai, Hà Nội</Box>
                            </Box>
                        </Grid>
                    </Grid>
                    <Grid sx={0} sm={0} md={1}></Grid>
                    <Grid sx={12} sm={12} md={4}>
                        <Grid item xs={12} sm={12} md={12} sx={style.infoContainer}>
                            <Box sx={style.infoContainer.infoBill} >
                                <Box sx={style.infoLabel}>
                                    <Box sx={style.infoLabel.infoBillLabelText} >Mã hóa đơn: </Box>
                                </Box>
                                <Box sx={style.infoText}>HĐ001</Box>
                            </Box>
                            <Box sx={style.infoContainer.infoBill} >
                                <Box sx={style.infoLabel}>
                                    <Box sx={style.infoLabel.infoBillLabelText} >Ngày tạo: </Box>
                                </Box>
                                <Box sx={style.infoText}>24/03/2024</Box>
                            </Box>
                            <Box sx={style.infoContainer.infoBill} >
                                <Box sx={style.infoLabel}>
                                    <Box sx={style.infoLabel.infoBillLabelText} >Trạng thái hóa đơn: </Box>
                                </Box>
                                <Box sx={style.infoText}>Đã thanh toán</Box>
                            </Box>
                        </Grid>
                    </Grid>
                </Grid>
                <TableContainer style={{padding:"16px"}}>
                    <Table padding='normal'>
                        <TableHead>
                            <TableRow>
                                <TableCell size='small' align='center'>#No</TableCell>
                                <TableCell size='small' align='center'>Tên sản phẩm</TableCell>
                                <TableCell size='small' align='center'>Đơn giá</TableCell>
                                <TableCell size='small' align='center'>Số lượng</TableCell>
                                <TableCell size='small' align='center'>Thành tiền</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell size='small' align='center'>1</TableCell>
                                <TableCell size='small' align='center'>Laptop MSI 12</TableCell>
                                <TableCell size='small' align='center'>17.000.000</TableCell>
                                <TableCell size='small' align='center'>1</TableCell>
                                <TableCell size='small' align='center'>17.000.000</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell size='small' align='center'>2</TableCell>
                                <TableCell size='small' align='center'>Bàn phím cơ AKKO Matcha Redbean</TableCell>
                                <TableCell size='small' align='center'>990.000</TableCell>
                                <TableCell size='small' align='center'>1</TableCell>
                                <TableCell size='small' align='center'>990.000</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell size='small'colSpan={4} >Tổng</TableCell>
                                <TableCell size='small' align='center'>17.990.000</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell size='small'colSpan={4} >Phí vận chuyển</TableCell>
                                <TableCell size='small' align='center'>+110.000</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell size='small'colSpan={4} >Giảm giá</TableCell>
                                <TableCell size='small' align='center'>-100.000</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell size='small'colSpan={4} style={{fontWeight:"600"}} >Tổng tiền</TableCell>
                                <TableCell size='small' align='center'>18.000.000</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Box>
    )
}
/** @type {import("@mui/material").SxProps} */
const style = {
    coverer: {
        position: "fixed",
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 1111,
        background: "rgba(0, 0, 0, 0.5)"
    },
    addUserModal: {
        backgroundColor: "white",
        width: "70%",
        position: 'absolute',
        top: "50%",
        left: "50%",
        transform: "translate(-50%,-50%)",
        boxShadow: 5,
        padding: '10px',
        maxHeight: "70%",
        overflowY: "scroll"
    },
    form: {
        padding: 4
    },
    inputsContainer: {
        display: 'flex'
    },
    infoContainer: {
        infoBill: {
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between"
        },
        infoCustomer: {
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start"
        }
    },
    infoLabel: {
        display: "flex",
        alignItems: "center",
        infoBillLabelText: {
            fontWeight: "600"
        },
        infoCustomerLabelText: {
            fontWeight: "600",
            marginRight: "10px"
        }
    },
    infoText: {
        fontSize: "0.9em"
    }


}
export default BillDetails;
