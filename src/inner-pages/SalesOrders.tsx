import {
  Box,
  Paper,
  Checkbox,
  IconButton,
  Button,
  Divider,
  FormControl,
  OutlinedInput,
  InputAdornment,
  TextField,
  Select,
  MenuItem,
  SelectChangeEvent,
  ListItemText,
  InputLabel,
  FilledInput,
  Input,
  TableCell,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { styled } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import {
  AddCircleOutlineRounded,
  ArrowBackIos,
  ArrowForwardIos,
  InfoOutlined,
  SyncOutlined,
} from "@mui/icons-material";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: "center",
  color: theme.palette.text.secondary,
  height: 60,
  lineHeight: "60px",
}));
const columns: GridColDef[] = [
  { field: "id", headerName: "#", width: 70 },
  { field: "orderDate", headerName: "Order Date", width: 130 },
  { field: "shopify", headerName: "Shopify", width: 130 },
  {
    field: "qboNumber",
    headerName: "Quickbooks",
    width: 90,
  },
  {
    field: "items",
    headerName: "Items",
    width: 90,
  },
  {
    field: "fulfillmentStatus",
    headerName: "Fulfillment Status",
    width: 150,
  },
  {
    field: "totalAmount",
    headerName: "Total Amount",
    width: 120,
  },
  {
    field: "paymentStatus",
    headerName: "Payment Status",
    width: 120,
  },
  {
    field: "syncDate",
    headerName: "Sync Date",
    width: 120,
  },
  {
    field: "orderTags",
    headerName: "Order Tags",
    width: 90,
  },
];

const rows = [
  { id: 1, lastName: "Snow", firstName: "Jon", age: 35, shopify: "hey" },
  { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
  { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
  { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
  { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
  { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
  { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
  { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
  { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
];
export const SalesOrders = () => {
  const [totalRecords, setTotalRecords] = useState(0);
  const [page, setPage] = useState(0);
  const [filter, setFilter] = useState("");
  const [activeFilters, setActiveFilters] = useState<number[]>([]);
  const [filters, setFilters] = useState([
    { name: "Order Date", value: 10 },
    { name: "Fulfillment Status", value: 20 },
    { name: "Payment Status", value: 30 },
    { name: "Sync Date", value: 40 },
    { name: "Total Amount", value: 50 },
    { name: "Status", value: 60 },
    { name: "Location", value: 70 },
  ]);
  const [constFilters, setConstFilters] = useState([
    { name: "Order Date", value: 10 },
    { name: "Fulfillment Status", value: 20 },
    { name: "Payment Status", value: 30 },
    { name: "Sync Date", value: 40 },
    { name: "Total Amount", value: 50 },
    { name: "Status", value: 60 },
    { name: "Location", value: 70 },
  ]);
  const [isVisibleDateFilter, setIsVisibleDateFilter] = useState(false);
  const [isVisibleFulfillmentFilter, setIsVisibleFulfillmentFilter] =
    useState(false);
  const [isVisiblePaymentFilter, setIsVisiblePaymentFilter] = useState(false);
  const [isVisibleAmountFilter, setIsVisibleAmountFilter] = useState(false);
  const [isVisibleLocationFilter, setIsVisibleLocationFilter] = useState(false);
  const [isVisibleStatusFilter, setIsVisibleStatusFilter] = useState(false);
  const [isVisibleResyncBtn, setIsVisibleResyncBtn] = useState(false);
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };
  const names = ["New York", "Chicago", "Los Angeles"];
  const statusOptions = ["Synced", "Failed", "Warning"];

  const [location, setLocation] = useState<string[]>([]);
  const [status, setStatus] = useState<string[]>([]);
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleChangeLocation = (event: SelectChangeEvent<typeof location>) => {
    const {
      target: { value },
    } = event;
    setLocation(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };
  const handleChangeStatus = (event: SelectChangeEvent<typeof status>) => {
    const {
      target: { value },
    } = event;
    setStatus(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };
  const months: any[] = [
    {
      id: 1,
      name: "January",
    },
    {
      id: 2,
      name: "February",
    },
    {
      id: 3,
      name: "March",
    },
    {
      id: 4,
      name: "April",
    },
    {
      id: 5,
      name: "May",
    },
    {
      id: 6,
      name: "June",
    },
    {
      id: 7,
      name: "July",
    },
    {
      id: 8,
      name: "August",
    },
    {
      id: 9,
      name: "September",
    },
    {
      id: 10,
      name: "October",
    },
    {
      id: 11,
      name: "November",
    },
    {
      id: 12,
      name: "December",
    },
  ];
  const [selectedMonth, setSelectedMonth] = useState<any>({
    id: 1,
    name: "January",
  });
  const salesOrders: any[] = [
    {
      id: 1,
      orderDate: "28th July, 3:20 PM",
      shopify: "#10234664",
      qboNumber: "1235647",
      items: 4,
      totalAmount: 100.35,
      salesChannel: "Instagram",
      fulfillmentStatus: "Fulfilled",
      paymentStatus: "Paid",
      syncDate: "28th July, 3:20 PM",
      orderTags: "luxury",
    },
    {
      id: 2,
      orderDate: "28th July, 3:20 PM",
      shopify: "#10234664",
      qboNumber: "1235647",
      items: 4,
      totalAmount: 200.35,
      salesChannel: "Facebook",
      fulfillmentStatus: "Fulfilled",
      paymentStatus: "Paid",
      syncDate: "28th July, 3:20 PM",
      orderTags: "luxury",
    },
  ];

  const handleChangePage = (event: any, newPage: number) => {
    setPage(newPage);
  };
  const [value, setValue] = useState("1");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const clearAllFilters = () => {
    setIsVisibleLocationFilter(false);
    setIsVisibleAmountFilter(false);
    setIsVisibleDateFilter(false);
    setIsVisiblePaymentFilter(false);
    setIsVisibleFulfillmentFilter(false);
    setIsVisibleStatusFilter(false);
    setActiveFilters([]);
    setFilters(constFilters);
  };
  const renderSelect = (selected: any) => {
    return (
      <span>
        <span onClick={() => removeStatusFilter(70)}>x</span> Location:{" "}
        {selected.join(", ")}
      </span>
    );
  };
  const selectPrevMonth = () => {
    console.log(selectedMonth);
    const index = months.findIndex((x: any) => x.id == selectedMonth.id);
    if (index != 0) {
      setSelectedMonth(months[index - 1]);
    }
  };
  const selectNextMonth = () => {
    console.log(selectedMonth);
    const index = months.findIndex((x: any) => x.id == selectedMonth.id);
    console.log(index);
    if (index != 11) {
      setSelectedMonth(months[index + 1]);
    }
  };
  const removeStatusFilter = (value: Number) => {
    setStatus([]);
    const index = constFilters.findIndex((x: any) => x.value == value);
    if (value == 70) {
      setIsVisibleLocationFilter(false);
    } else if (value == 60) {
      setIsVisibleStatusFilter(false);
    }
    filters.splice(index, 0, constFilters[index]);
    setFilters(filters);
  };
  const handleChangeFilter = (event: SelectChangeEvent) => {
    if (!activeFilters.includes(Number(event.target.value))) {
      activeFilters.push(Number(event.target.value));
    }
    setActiveFilters(activeFilters);
    if (Number(event.target.value) == 10) {
      setIsVisibleDateFilter(true);
    } else if (Number(event.target.value) == 20) {
      setIsVisibleFulfillmentFilter(true);
    } else if (Number(event.target.value) == 30) {
      setIsVisiblePaymentFilter(true);
    } else if (Number(event.target.value) == 50) {
      setIsVisibleAmountFilter(true);
    } else if (Number(event.target.value) == 60) {
      setIsVisibleStatusFilter(true);
    } else if (Number(event.target.value) == 70) {
      setIsVisibleLocationFilter(true);
    }
    const removeIndex = filters.findIndex(
      (x) => x.value == Number(event.target.value)
    );
    filters.splice(removeIndex, 1);
    setFilters(filters);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <>
      <h2 className="left">Sales Orders</h2>
      <Box>
        <Item key={1} elevation={1} className="tableContainer">
          <div className="seachContainer p-1">
            <div>
              <TextField
                className="mr-1"
                placeholder="Search ..."
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton>
                        <SearchIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker views={["month"]} />
              </LocalizationProvider> */}
              <FormControl sx={{ m: 1, width: "25ch" }} variant="standard">
                {/* <InputLabel htmlFor="filled-adornment-password">
                  Password
                </InputLabel> */}
                <OutlinedInput
                  id="standard-adornment-password"
                  type={"text"}
                  value={selectedMonth.name}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton onClick={selectPrevMonth} edge="end">
                        <ArrowBackIos />
                      </IconButton>
                      <IconButton onClick={selectNextMonth} edge="end">
                        <ArrowForwardIos />
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
            </div>
            <div>
              <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
                <SyncOutlined />
              </IconButton>
              <span className="syncText">Sync Now </span>
              <div className="custom-margin"> Last sync 1 week ago</div>
            </div>
          </div>
          <Paper className="m-1 p-1">
            <div className="left p-1">
              <Button variant="outlined" className="mr-1">
                All
              </Button>
              <Button variant="outlined" className="mr-1">
                Online Store
              </Button>
              <Button variant="outlined" className="mr-1">
                Instagram
              </Button>
              <Button variant="outlined" className="mr-1">
                Facebook
              </Button>
              <Button variant="outlined" className="mr-1">
                POS
              </Button>
              <Button variant="outlined" className="mr-1">
                Manual Order
              </Button>
            </div>
            <Divider />
            <div className="left p-1">
              {isVisibleResyncBtn ? (
                <Button variant="outlined">Resync</Button>
              ) : (
                ""
              )}
              {isVisibleLocationFilter ? (
                <FormControl sx={{ m: 1, width: 300 }}>
                  <span
                    onClick={() => {
                      return removeStatusFilter(70);
                    }}
                  >
                    X
                  </span>
                  <Select
                    labelId="demo-multiple-checkbox-label"
                    id="demo-multiple-checkbox"
                    multiple
                    value={location}
                    onChange={handleChangeLocation}
                    input={<OutlinedInput label="Tag" />}
                    renderValue={(selected) => renderSelect(selected)}
                    MenuProps={MenuProps}
                  >
                    {names.map((name) => (
                      <MenuItem key={name} value={name}>
                        <Checkbox checked={location.indexOf(name) > -1} />
                        <ListItemText primary={name} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              ) : (
                ""
              )}
              {isVisibleStatusFilter ? (
                <FormControl sx={{ m: 1, width: 300 }}>
                  <span
                    onClick={() => {
                      return removeStatusFilter(60);
                    }}
                  >
                    X
                  </span>
                  <Select
                    labelId="demo-multiple-checkbox-label"
                    id="demo-multiple-checkbox"
                    multiple
                    value={status}
                    onChange={handleChangeStatus}
                    input={<OutlinedInput label="Tag" />}
                    renderValue={(selected) => `Status: ` + selected.join(", ")}
                    MenuProps={MenuProps}
                  >
                    {statusOptions.map((name) => (
                      <MenuItem key={name} value={name}>
                        <Checkbox checked={status.indexOf(name) > -1} />
                        <ListItemText primary={name} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              ) : (
                ""
              )}

              <FormControl sx={{ m: 1, minWidth: 120 }}>
                <Select
                  value={filter}
                  onChange={handleChangeFilter}
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}
                  placeholder="Add Filter"
                >
                  <MenuItem value="" disabled>
                    <em>
                      Add Filter{" "}
                      <IconButton
                        className="small-font"
                        type="button"
                        sx={{ p: "10px" }}
                        aria-label="plus"
                      >
                        <AddCircleOutlineRounded />
                      </IconButton>
                    </em>
                  </MenuItem>
                  {filters.map((filter: any) => (
                    <MenuItem key={filter.value} value={filter.value}>
                      {filter.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Button
                variant="outlined"
                className="mr-1"
                onClick={clearAllFilters}
              >
                Clear All
              </Button>
            </div>
            <DataGrid
              className="m-10"
              rows={salesOrders}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 5 },
                },
              }}
              pageSizeOptions={[5, 10]}
              checkboxSelection
              onRowSelectionModelChange={(ids) => {
                if (ids.length > 0) {
                  setIsVisibleResyncBtn(true);
                } else {
                  setIsVisibleResyncBtn(false);
                }
              }}
            />
          </Paper>
        </Item>
      </Box>
      {/* <div style={{ height: 400, width: "100%" }}></div> */}
    </>
  );
};
