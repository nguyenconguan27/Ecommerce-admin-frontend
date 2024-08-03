import { Box, Button, IconButton, Tab, Tabs, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import TabPanel from "../../components/Admin/TabPanel";
import { DataGrid, GridToolbar, useGridApiRef } from "@mui/x-data-grid";
import ReplayIcon from "@mui/icons-material/Replay";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import config from "../../constants/config";
import { dateTranfer } from "../../utils/utils";
import { BlockOutlined } from "@mui/icons-material";

function UserManager() {
  const { data: customerData } = useQuery({
    queryKey: ["customer"],
    queryFn: () => axios.get(`${config.BASEURL}/account/get-all`),
  });

  const queryClient = useQueryClient();
  const banUserMuatation = useMutation({
    mutationFn: (userId) =>
      axios.post(`${config.BASEURL}/account/ban?userId=${userId}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customer"] });
    },
  });
  console.log(customerData);
  const columnsCustomer = [
    {
      field: "id",
      headerName: "Mã",
      width: "50",
    },
    {
      field: "username",
      headerName: "Tên đăng nhập",
      minWidth: "200",
      hideable: false,
    },
    {
      field: "email",
      headerName: "Email",
      minWidth: "300",
    },

    {
      field: "dateOfBirth",
      headerName: "Ngày sinh",
      minWidth: "200",
      renderCell: (params) => {
        return dateTranfer(params.row.dateOfBirth);
      },
    },
    {
      field: "number",
      headerName: "Số điện thoại",
      minWidth: "200",
    },
    {
      field: "status",
      headerName: "Trạng thái",
      minWidth: "200",
      renderCell: (params) => {
        return params.row.status === 1 ? "Hoạt động" : "Đã khoá";
      },
    },
    {
      field: "score",
      headerName: "Điểm khách hàng",
      minWidth: "200",
    },
    {
      field: "registerDate",
      headerName: "Ngày tạo",
      minWidth: "100",
      renderCell: (params) => {
        return dateTranfer(params.row.registerDate);
      },
    },
    {
      field: "action",
      headerName: "Tác vụ",
      minWidth: "150",
      sortable: false,
      headerAlign: "center",
      renderCell: (params) => {
        return (
          <Box
            style={{
              display: "flex",
              justifyContent: "center",
              width: "100%",
            }}
          >
            {params.row.status === 1 && (
              <IconButton
                size="medium"
                sx={{ m: 1 }}
                onClick={() => {
                  banUserMuatation.mutate(params.row.id);
                }}
              >
                <BlockOutlined />
              </IconButton>
            )}
          </Box>
        );
      },
    },
  ];
  const customersRows = customerData
    ? customerData?.data?.data?.map((customer) => {
        return {
          id: customer.id,
          username: customer.username,
          email: customer.email,
          dateOfBirth: dateTranfer(customer.dateOfBirth),
          number: customer.number,
          registerDate: dateTranfer(customer.registerDate),
          score: customer.score,
          status: customer.status,
        };
      })
    : [];
  const activeAccount = [];
  const banedAccount = [];
  customerData?.data.data.map((customer) => {
    if (customer.status === 1) {
      activeAccount.push(customer);
    } else {
      banedAccount.push(customer);
    }
  });
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <Box>
        <Typography sx={style.pageTitle} variant="h5">
          Quản lý khách hàng
        </Typography>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs value={value} onChange={handleChange}>
            <Tab label="Hoạt động" id="tab-0" />
          </Tabs>
          <TabPanel value={value} index={0}>
            <DataGrid
              sx={{ boxShadow: 2, mt: 2 }}
              columns={columnsCustomer}
              rows={activeAccount}
              slots={{
                toolbar: GridToolbar,
              }}
            ></DataGrid>
          </TabPanel>
        </Box>
      </Box>
    </div>
  );
}
/** @type {import("@mui/material").SxProps} */
const style = {
  pageTitle: {
    mb: 2,
  },
};
export default UserManager;
