import React from 'react'
import dayjs from "dayjs";
import { useFormik } from 'formik';
import { Grid, Button, CircularProgress, Typography } from "@material-ui/core/";
import {
    addDays,
    addYears,
} from 'date-fns';
import FormikDateRangePicker from '../../../_common/components/CustomFormik/FormikDateRangePicker';
import * as swal from '../../../_common/components/SweetAlert';
import FormikDateRangePickerDialog from '../../../_common/components/CustomFormik/FormikDateRangePickerDialog';

var buddhistEra = require('dayjs/plugin/buddhistEra')
dayjs.extend(buddhistEra)

function FormWithDateRangePicker() {
    const [state] = React.useState({
        dateRangeSelected: {
            startDate: dayjs(),
            endDate: dayjs()
        }

    });
    const [stateD] = React.useState({
        dtRange: {
            startDate: dayjs(),
            endDate: dayjs()
        }

    });

    //#region Formik
    const formik = useFormik({
        enableReinitialize: true,
        validate: (values) => {
            const errors = {};


            return errors;
        },
        initialValues: {
            dateRangeSelected: state.dateRangeSelected,
            dtRange: stateD.dtRange
        },
        onSubmit: (values) => {
            // debugger;buddhistEra
            // console.log(values.dateRangeSelected)
            // formik.setSubmitting(false);
            //แปลงกลับให้เป็น Local DateTime
            let startDate = dayjs(values.dateRangeSelected.startDate).format('DD/MM/BBBB');
            let endDate = dayjs(values.dateRangeSelected.endDate).local().format('DD/MM/BBBB');
            let newDateRangeSelected = {
                startDate: startDate,
                endDate: endDate
            }
            values = { ...values, dateRangeSelected: newDateRangeSelected }

            swal.swalInfo('info', JSON.stringify(values, null, 2)).then((res) => {
                formik.setSubmitting(false);
                formik.resetForm()
            });
        },
    });
    //#endregion Formik
    return (
        <form onSubmit={formik.handleSubmit} >
            <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
            >
                {/* Start search */}
                <Grid item xs={12} lg={12}>
                    <Typography>DateRangePicker 1</Typography>
                    <FormikDateRangePicker
                        formik={formik}
                        name="dateRangeSelected"
                        startDate={new Date()}
                        endDate={addDays(new Date(), 7)}
                        localeTH={true}
                        disabled={false}
                        minDate={addYears(new Date(), -5)}
                        maxDate={addYears(new Date(), 1)}
                        months={2}
                        selectedCallback={(item) => {
                            console.log(item)
                        }}
                    ></FormikDateRangePicker>
                </Grid>
                <br />
                <br />
                <Grid item xs={12} lg={12}>
                    <Typography>Dialog DateRangePicker 2</Typography>
                    <FormikDateRangePickerDialog
                        formik={formik}
                        name="dtRange"
                        startDate={new Date()}
                        endDate={new Date()}
                        localeTH={true}
                        disabled={false}
                        minDate={addYears(new Date(), -5)}//start range
                        maxDate={addYears(new Date(), 1)}//end range
                        months={2}
                    />
                </Grid>
                <br />
                <br />
                <Grid item xs={12} lg={3}>
                    {!formik.isSubmitting && (
                        <Button
                            disabled={formik.isSubmitting}
                            style={{ color: "#FFFFFF" }}
                            size="medium"
                            type="submit"
                            fullWidth
                            color="primary"
                            variant="contained"
                        >
                            ตกลง
                        </Button>
                    )}
                    <Grid
                        container
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                    >
                        {formik.isSubmitting && <CircularProgress size={24} />}
                    </Grid>
                </Grid>
            </Grid>
        </form>
    )
}

export default FormWithDateRangePicker
