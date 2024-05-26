import React, { useRef } from 'react';
import { observer } from "mobx-react-lite";
import { useInstance } from "react-ioc";
import { provider } from "react-ioc";
import { Box, Typography } from '@mui/material';
import StoreAppointmentEstimate from '../../stores/estimateComponent.store';
import { theme } from "../../../../../_common/theme/theme"
import { useMediaQuery, useTheme } from "@mui/material";
import CircularProgress from '@mui/material/CircularProgress';
import { styled } from "@mui/material/styles"
import classes from "../../../../../_common/assets/styles/pricePageAlpine.module.css"
import { AgGridReact } from 'ag-grid-react'; // the AG Grid React Component
import 'ag-grid-enterprise';
import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-alpine.css';
import DataStoreAppointmentModal from '../../stores/data.store';
import { setCenterColor } from '../../../../../_common/helpers/centerColorSwitch';
import ButtonMain from '../../../../../_components/UI/Buttons/ButtonMain';

const StyledBox = styled(Box)(({ theme }) => ({

    "&.ag-theme-alpine": {
        borderTop: "none",
        backgroundColor: "transparent",
        "--ag-borders": "none",
    },

    "&.ag-theme-alpine .ag-row.ag-row-odd ": {
        backgroundColor: `${theme.palette.primary.light3}`,
    },

    "& .ag-header-row:not(:first-child) .ag-header-cell": {
        borderTop: "none",
    },

    "& .ag-header-group-cell-label": {
        minHeight: "50px !important",
        fontWeight: "500 !important",
    },

    "& .ag-header-cell-label": {
        fontWeight: "500 !important",
    },

    "&.ag-theme-alpine .ag-header": {
        backgroundColor: `${theme.palette.primary.light3}`,
        color: `${theme.palette.primary.grey}`,
        textTransform: "uppercase",
    },

    "& .ag-header .ag-pivot-off": {
        minHeight: "110px !important"
    },
    "& .ag-row-odd .ag-row-no-focus .ag-row ag-row-level-1 .ag-row-position-absolute": {
        height: "300px"
    },
    "& .ag-cell ": {
        padding: "0",
    },

    "& .ag-cell-wrapper": {
        minHeight: "60px !important"
    },

    "&.ag-theme-alpine .ag-header-group-cell": {
        fontSize: "14px",
        transform: "translate(30%)",
        borderLeft: "none"
    },
    "&.ag-theme-alpine .ag-header-cell": {
        fontSize: "11px",
        border: "none",
        borderRight: "none",
        padding: "0"
    }
}));

const SearchInPriceLayout = styled(Box)(({ theme }) => ({
    "& input": {
        padding: "8px",
        borderRadius: "8px",
        border: "2px solid",
        borderColor: `${theme.palette.primary.main}`,
        fontSize: "16px",
        width: "230px",
    },
}));

const PriceDataGrid = provider()(observer(() => {
    const estimateStore = useInstance(StoreAppointmentEstimate)
    const dataStore = useInstance(DataStoreAppointmentModal)
    const centerColor = setCenterColor(dataStore.centerId)

    const mainTheme = useTheme();
    const mobileBreakpointSm = useMediaQuery(mainTheme.breakpoints.down("sm"))

    const gridRef = useRef();
    const containerStyle = { width: '100%', height: '100%', background: "white" }

    const onFilterTextBoxChanged = () => {
        gridRef.current.api.setQuickFilter(
            document.getElementById('filter-text-box').value
        );
    }

    const getDataPath = (data) => {
        let path = data.path.split('/');
        return path
    };

    const getRowStyle = params => {

        if (params.data?.service?.isGroup) {
            return { background: `${theme.palette.primary.light2}` };
        }
    };

    const handlePriceClick = (params) => {
        estimateStore.sendService({ serviceId: params.data?.service?.id, value: params?.value })
            .catch((error) => {
                alert("Возникла ошибка при загрузке услуги")
            }).then((data) => {
                if (data) {
                    dataStore.incrCashUnitsCount()
                }
            })
    }

    const DataGridBtn = (params) => {
        if (!params.data?.service?.isGroup && params?.value) {
            return (
                <ButtonMain
                    variant='text'
                    textVariant="body1"
                    title={params?.value}
                    sx={{ mt: 1, mb: 1, color: centerColor }}
                    onClick={() => handlePriceClick(params)}
                />
            )
        } else return ""
    }

    const columnDefs = [
        {
            headerName: '',
            width: 25,
            height: 20,
            field: '0',
            rowGroup: true,
            rowGroupIndex: 0,
            autoHeight: true,
            initialPinned: 'left',
            cellRenderer: (params) => {
                return (
                  <>{!params?.data?.service?.isGroup && params?.data?.service?.color !== null &&
                    <Box
                      sx={{
                          border: "1px solid",
                          borderColor: "primary.light",
                          background: params?.data?.service?.color !== null ? `#${params?.data?.service?.color}` : undefined,
                          width: "15px",
                          height: "15px",
                          marginLeft: "10px",
                          borderRadius: "50%"
                      }}
                    />
                  }
                  </>
                )
            }
        },
        {
            headerName: 'Дополнительные манипуляции во время проведения',
            children: [
                {
                    headerName: 'Отдельные манипуляции',
                    field: 'price1',
                    minWidth: 150,
                    height: 100,
                    autoHeight: true,
                    cellRenderer: (params) => DataGridBtn(params)
                },
                {
                    headerName: 'Обработка одного ногтя',
                    field: 'price2',
                    minWidth: 150,
                    left: 50,
                    autoHeight: true,
                    cellRenderer: (params) => DataGridBtn(params)
                },
                {
                    headerName: 'Гиг. аппаратного педикюра',
                    field: 'price3',
                    minWidth: 150,
                    left: 50,
                    autoHeight: true,
                    cellRenderer: (params) => DataGridBtn(params)
                },
                {
                    headerName: 'Гиг. обработки ногтей',
                    field: 'price4',
                    minWidth: 150,
                    left: 50,
                    autoHeight: true,
                    cellRenderer: (params) => DataGridBtn(params)
                },
                {
                    headerName: 'Гиг. Обработки подошвенной поверхности стоп',
                    field: 'price5',
                    minWidth: 150,
                    left: 50,
                    cellRendererParams: {
                        suppressMenu: false
                    },
                    cellRenderer: (params) => DataGridBtn(params)
                },
            ]
        },
    ]

    const defaultColDef = {
        flex: 1,
        wrapHeaderText: true,
        autoHeaderHeight: true,
    }

    const autoGroupColumnDef = {
        headerName: 'Наименование услуги',
        left: 100,
        minWidth: mobileBreakpointSm ? 200 : 500,
        cellStyle: { 'whiteSpace': 'normal' },
        autoHeight: true, // <- Yay!
        sort: 'desc',
        comparator: (valueA, valueB, nodeA, nodeB, isDescending) => {
            if (nodeA.data?.service.isGroup === nodeB.data?.service.isGroup) {
                if (nodeA.data?.service.order === nodeB.data?.service.order) {
                    return 0;
                }
                if (nodeA.data?.service.order < nodeB.data?.service.order) {
                    return 1
                }
                if (nodeA.data?.service.order > nodeB.data?.service.order) {
                    return -1
                }
            }
            if (nodeA.data?.service.isGroup === true || nodeB.data?.service.isGroup === true) {
                if (nodeA.data?.service.isGroup > nodeB.data?.service.isGroup) {
                    return -1
                }
                if (nodeA.data?.service.isGroup < nodeB.data?.service.isGroup) {
                    return 1
                }
                else {
                    return 0
                }
            }
            if (nodeA.data?.service.isGroup === false && nodeB.data?.service.isGroup === false) {
                if (nodeA.data?.service.order < nodeB.data?.service.order) {
                    return 1
                }
                if (nodeA.data?.service.order > nodeB.data?.service.order) {
                    return -1
                }
                else {
                    return 0
                }
            }
        },
        cellRendererParams: {
            suppressCount: true,
            suppressMenu: false
        },
    }

    if (estimateStore.isLoadingPrice) {
        return (
            <Box sx={{ mt: 20, width: "100%", display: 'flex', justifyContent: "center" }}>
                <CircularProgress />
            </Box>
        )
    }

    if (!estimateStore.isLoadingPrice && !estimateStore?.price(estimateStore.activeTab?.id)?.price) {
        return (
            <Box sx={{ mt: 5, width: "100%", display: 'flex', justifyContent: "center" }}>
                <Typography variant="h6">Что-то пошло не так</Typography>
            </Box>
        )
    }

    return (
        <>
            {estimateStore?.price(estimateStore.activeTab?.id)?.price &&
                <div style={containerStyle}>
                    <div className={classes.agThemeAlpine}>
                        <SearchInPriceLayout style={{ marginBottom: '5px' }}>
                            <input
                                type="text"
                                id="filter-text-box"
                                placeholder="Поиск..."
                                onInput={onFilterTextBoxChanged}
                            />
                        </SearchInPriceLayout>
                        <StyledBox className="ag-theme-alpine" sx={{ height: 600, width: '100%', background: "white" }}>
                            <AgGridReact
                                ref={gridRef}
                                rowData={estimateStore?.price(estimateStore.activeTab?.id)?.price}
                                columnDefs={columnDefs}
                                defaultColDef={defaultColDef}
                                autoGroupColumnDef={autoGroupColumnDef}
                                treeData={true}
                                animateRows={true}
                                groupDefaultExpanded={-1}
                                getDataPath={getDataPath}
                                rowSelection={'single'}
                                getRowStyle={getRowStyle}
                                rowHeight={"fit-content"}
                                overlayNoRowsTemplate={"Нет данных для отображения"}
                            />
                        </StyledBox>
                    </div>
                </div>
            }
        </>
    )
}));

export default PriceDataGrid