import React from 'react';
import { useState } from 'react';
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { th, enUS } from 'date-fns/locale';
import PropTypes from "prop-types";

import {
    addDays, endOfDay, startOfDay, startOfMonth, endOfMonth,
    addMonths, startOfWeek, endOfWeek, isSameDay, addYears,
} from 'date-fns';

function FormikDateRangePicker(props) {

    const [state, setState] = useState([
        {
            startDate: props.startDate,
            endDate: props.endDate,
            key: 'selection',
            disabled: props.disabled,
        }
    ]);


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

    return (
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
    )
}

FormikDateRangePicker.propTypes = {
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
FormikDateRangePicker.defaultProps = {
    formik: {},
    name: "Do not forget to set name",
    startDate: new Date(),
    endDate: addDays(new Date(), 7),
    localeTH: true,
    disabled: false,//if set true, you should to set minDate and maxDate
    minDate: addYears(new Date(), -5),
    maxDate: new Date(),
    months: 1,
    selectedCallback: () => { },
};

export default FormikDateRangePicker
