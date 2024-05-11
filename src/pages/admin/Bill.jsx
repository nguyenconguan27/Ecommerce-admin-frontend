import { Box, Button, IconButton, Tab, Tabs, Typography } from '@mui/material'
import React, { useState } from 'react'
import TabPanel from '../../components/Admin/TabPanel'
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import BillDetails from '../../components/Admin/Bill/BillDetails';

function Bill() {
  const columns = [
    {
      field: 'billcode',
      headerName: 'Mã hóa đơn',
      minWidth: '200',
      hideable: false

    },
    {
      field: 'createAt',
      headerName: "Ngày tạo",
      minWidth: '150'
    },
    {
      field: 'status',
      headerName: "Tình trạng",
      minWidth: '200'
    },
    {
      field: 'paymentMethod',
      headerName: "Phương thức thanh toán",
      minWidth: '300'
    },
    {
      field: 'shippingMethod',
      headerName: "Phương thức giao hàng",
      minWidth: '200'
    },
    {
      field: 'total',
      headerName: "Tổng tiền",
      minWidth: '200'
    },
    {
      field: 'action',
      headerName: 'Xem chi tiết',
      minWidth: '140',
      sortable: false,
      headerAlign: 'center',
      renderCell: (params) => {
        return <Box style={{ display: 'flex', justifyContent: 'center',width:"100%" }} >
          <IconButton size="medium" sx={{ m: 1 }} onClick={() => { setDisplayBillDetails(true) }} >
            <InfoOutlinedIcon />
          </IconButton>
        </Box>
      }
    }

  ]
  const rows =
    [
      {
        id: 1,
        billcode: 'ĐH001',
        createAt: '22/02/2024',
        status: "Đã thanh toán",
        paymentMethod:"Thanh toán trực tuyến",
        shippingMethod:"Nhanh",
        total: "20.000.000"
      },
      {
        id: 2,
        billcode: 'ĐH002',
        createAt: '23/02/2024',
        status: "Đã thanh toán",
        paymentMethod:"Thanh toán khi nhận được hàng",
        shippingMethod:"Hỏa tốc",
        total: "34.000.000"
      }
      
    ]
  const [value, setValue] = useState(0)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }
  const [displayBillDetails, setDisplayBillDetails] = useState(false)
  return (
    <div>
      <Box>
        <Typography sx={style.pageTitle} variant='h5'>Quản lý người dùng</Typography>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange}>
            <Tab label='Hóa đơn bán' id="tab-0" />
            <Tab label='Hóa đơn nhập' id="tab-1" />
          </Tabs>
          <TabPanel value={value} index={0}>
            <DataGrid
              sx={{ boxShadow: 2, mt: 2 }}
              columns={columns}
              rows={rows}
              slots={{
                toolbar: GridToolbar,
              }}
            ></DataGrid>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <DataGrid
              columns={columns}
              rows={rows}
              slots={{
                toolbar: GridToolbar,
              }}
              sx={{ boxShadow: 2, mt: 2 }}
            ></DataGrid>
          </TabPanel>
        </Box>
      </Box>
      {displayBillDetails && <BillDetails setDisplayBillDetails={setDisplayBillDetails} typeBill={value} />}
    </div>
  )
}
/** @type {import("@mui/material").SxProps} */
const style = {
  pageTitle: {
    mb: 2
  }
}
export default Bill