import React from 'react';
import { useState } from 'react';
import { DateRangePicker } from 'react-date-range';
import {
    Grid, Button, InputAdornment, IconButton, Input, FormControl,
    InputLabel, Dialog, DialogContent, DialogActions
} from '@material-ui/core';
import clsx from 'clsx';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { th, enUS } from 'date-fns/locale';
import PropTypes from "prop-types";
import { makeStyles } from '@material-ui/core/styles';
import dayjs from "dayjs";
import {
    addDays, endOfDay, startOfDay, startOfMonth, endOfMonth,
    addMonths, startOfWeek, endOfWeek, isSameDay, addYears,
} from 'date-fns';

var buddhistEra = require('dayjs/plugin/buddhistEra')
dayjs.extend(buddhistEra)

const useStyles = makeStyles((theme) => ({
    marginFilterItem: {
        marginTop: 10
    },
    textLabel: {
        fontSize: 13,
        color: '#9E9898'
    },
    textTiltla: {
        fontSize: 14,
        color: '#ACA3A3'
    },
    dialogPaper: {
        height: '600px'
    },
    textField: {
        fullWidth: true,
    },
    dateRangeSubmitButton: {
        color: "#FFFFFF", //font color
        borderRadius: 5,
        width: '90%',
        marginTop: '5%',
        marginBottom: '5%',
        backgroundColor: "primary",
        '&:hover': {
            backgroundColor: "primary",
        },
        closeButton: {
            position: 'absolute',
            right: theme.spacing(1),
            top: theme.spacing(1),
            color: theme.palette.grey[500],
        },
    },
}));
function FormikDateRangePickerDialog(props) {
    const classes = useStyles();
    const [openDialog, setOpenDialog] = React.useState(false);
    const [dateRangeSelectedTemp, setRangeSelectedTemp] = React.useState("")
    const [dateDateRangeSelected, setDateRangeSelected] = React.useState("");
    const [state, setState] = useState([
        {
            startDate: props.startDate,
            endDate: props.endDate,
            key: 'selection',
            disabled: props.disabled,
        }
    ]);

    const handleDialogClose = () => {
        setOpenDialog(false);
    };

    const handleDialogSubmit = () => {
        debugger;
        if (dateRangeSelectedTemp === "") {
            setDateRangeSelected(`${dayjs(state[0].startDate).format('DD/MM/BBBB')}-${dayjs(state[0].endDate).format('DD/MM/BBBB')}`);
        }
        else {
            setDateRangeSelected(dateRangeSelectedTemp);
        }

        let selected = {
            startDate: state[0].startDate,
            endDate: state[0].endDate
        };
        props.formik
            .setFieldValue(props.name, selected)
            .then(setOpenDialog(false));

    };


    const defineds = {
        startOfWeek: startOfWeek(new Date()),
        endOfWeek: endOfWeek(new Date()),
        startOfLastWeek: startOfWeek(addDays(new Date(), -7)),
        endOfLastWeek: endOfWeek(addDays(new Date(), -7)),
        startOfToday: startOfDay(new Date()),
        endOfToday: endOfDay(new Date()),
        startOfYesterday: startOfDay(addDays(new Date(), -1)),
        endOfYesterday: endOfDay(addDays(new Date(), -1)),
        startOfMonth: startOfMonth(new Date()),
        endOfMonth: endOfMonth(new Date()),
        startOfLastMonth: startOfMonth(addMonths(new Date(), -1)),
        endOfLastMonth: endOfMonth(addMonths(new Date(), -1)),
    };

    const staticRangeHandler = {
        range: {},
        isSelected(range) {
            const definedRange = this.range();
            return (
                isSameDay(range.startDate, definedRange.startDate) &&
                isSameDay(range.endDate, definedRange.endDate)
            );
        },
    };

    function createStaticRanges(ranges) {
        return ranges.map(range => ({ ...staticRangeHandler, ...range }));
    }

    const defaultStaticRangesTH = createStaticRanges([
        {
            label: 'วันนี้',
            hasCustomRendering: false,
            range: () => ({
                startDate: defineds.startOfToday,
                endDate: defineds.endOfToday,
            }),
            isSelected() {
                return true;
            }
        },
        {
            label: 'เมื่อวาน',
            hasCustomRendering: false,
            range: () => ({
                startDate: defineds.startOfYesterday,
                endDate: defineds.endOfYesterday,
            }),
            isSelected() {
                return true;
            }
        },

        {
            label: 'อาทิตย์นี้',
            hasCustomRendering: false,
            range: () => ({
                startDate: defineds.startOfWeek,
                endDate: defineds.endOfWeek,
            }),
            isSelected() {
                return true;
            }
        },
        {
            label: 'อาทิตย์ที่แล้ว',
            hasCustomRendering: false,
            range: () => ({
                startDate: defineds.startOfLastWeek,
                endDate: defineds.endOfLastWeek,
            }),
            isSelected() {
                return true;
            }
        },
        {
            label: 'เดือนนี้',
            hasCustomRendering: false,
            range: () => ({
                startDate: defineds.startOfMonth,
                endDate: defineds.endOfMonth,
            }),
            isSelected() {
                return true;
            }
        },
        {
            label: 'เดือนที่แล้ว',
            hasCustomRendering: false,
            range: () => ({
                startDate: defineds.startOfLastMonth,
                endDate: defineds.endOfLastMonth,
            }),
            isSelected() {
                return true;
            }
        },
    ]);

    React.useEffect(() => {

        setRangeSelectedTemp(`${dayjs(state[0].startDate).format('DD/MM/BBBB')}-${dayjs(state[0].endDate).format('DD/MM/BBBB')}`)
    }, [state])

    return (
        <div>
            <FormControl className={clsx(classes.margin, classes.textField)} fullWidth>
                <InputLabel htmlFor="standard-adornment-dateRangePicker">เลือกช่วงวันที่</InputLabel>
                <Input
                    disabled={true}
                    id="standard-adornment-dateRangePicker"
                    type='text'
                    name="txtDateRange"
                    value={dateDateRangeSelected}
                    //onChange={handleChange('password')}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="CalendarDate"
                                onClick={() => {
                                    setOpenDialog(true);
                                }}
                            //onMouseDown={handleMouseDownPassword}
                            >
                                <CalendarTodayIcon />
                            </IconButton>
                        </InputAdornment>
                    }
                    onClick={() => {
                        setOpenDialog(true);
                    }}
                />
            </FormControl>
            <Dialog
                onClose={handleDialogClose}
                aria-labelledby="customized-dialog-title"
                open={openDialog}
                fullWidth={true}
                maxWidth={"md"}
                className={classes.dialogPaper}
            >
                <DialogContent>
                    <div style={{ padding: 0 }}>
                        <Grid
                            container spacing={3}
                            justifyContent="center"
                        >
                            <Grid item xs={12} sm={12} lg={12}>
                                <DateRangePicker
                                    name={props.name}
                                    editableDateInputs={true}
                                    dateDisplayFormat="dd MMMM yyyy"
                                    locale={props.localeTH ? th : enUS}

                                    startDate={props.startDate}
                                    endDate={props.endDate}
                                    maxDate={props.maxDate}
                                    minDate={props.minDate}
                                    onChange={(item) => {
                                        setState([item.selection])
                                        let selected = {
                                            startDate: item.selection.startDate,
                                            endDate: item.selection.endDate
                                        }
                                        props.formik
                                            .setFieldValue(props.name, selected)
                                            .then(props.selectedCallback(selected));

                                    }}
                                    showSelectionPreview={true}
                                    months={props.months}
                                    ranges={state}
                                    direction="horizontal"
                                    staticRanges={props.localeTH ? defaultStaticRangesTH : undefined}//{[]}
                                    inputRanges={[]}//set วันล่วงหน้าหรือย้อนหลัง จากปัจจุบันกี่วัน ถ้าใช้ให้commentออก
                                    showDateDisplay={true}//แสดง selected date range
                                />
                            </Grid>
                        </Grid>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Grid
                        container
                        direction="row"
                        justifyContent="flex-end"
                        alignItems="center"
                    >
                        <Grid item xs={12} sm={12} md={2} lg={2} >
                            <Button
                                style={{ color: "#FFFFFF" }}
                                className={classes.dateRangeSubmitButton}
                                size="small"
                                type="button"
                                fullWidth
                                color="primary"
                                variant="contained"
                                onClick={() => {
                                    handleDialogSubmit();
                                }}
                            >
                                ตกลง
                            </Button>
                        </Grid>
                        <Grid item xs={12} sm={12} md={2} lg={2} >
                            <Button
                                style={{ width: '90%', }}
                                size="small"
                                type="button"
                                fullWidth
                                variant="outlined"
                                color="primary"
                                onClick={() => {
                                    handleDialogClose();
                                }}
                            >
                                ยกเลิก
                            </Button>
                        </Grid>
                    </Grid>
                </DialogActions>
                {/* </form> */}
            </Dialog>
        </div>
    )
}

FormikDateRangePickerDialog.propTypes = {
    formik: PropTypes.object,
    name: PropTypes.string,
    startDate: PropTypes.object,
    endDate: PropTypes.object,
    localeTH: PropTypes.bool,
    disabled: PropTypes.bool,
    minDate: PropTypes.object,
    maxDate: PropTypes.object,
    months: PropTypes.number,
    selectedCallback: PropTypes.func,
};

// Same approach for defaultProps too
FormikDateRangePickerDialog.defaultProps = {
    formik: {},
    name: "Do not forget to set name",
    startDate: new Date(),
    endDate: new Date(),
    localeTH: true,
    disabled: false,//if set true, you should to set minDate and maxDate
    minDate: addYears(new Date(), -5),
    maxDate: new Date(),
    months: 2,
    selectedCallback: () => { },
};

export default FormikDateRangePickerDialog

