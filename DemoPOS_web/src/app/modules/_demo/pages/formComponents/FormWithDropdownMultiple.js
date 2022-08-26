/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-restricted-imports */
import React from "react";
import { useFormik } from "formik";
import { Grid, Button } from "@material-ui/core/";
import { useHistory } from "react-router";
import FormikDropdownMultiple from "../../../_common/components/CustomFormik/FormikDropdownMultiple";
import * as swal from '../../../_common/components/SweetAlert';


function FormWithDropdownMultiple() {
  const history = useHistory();
  const [state] = React.useState({
    names: [
      { id: 1, nameDetail: 'Oliver Hansen' },
      { id: 2, nameDetail:  'Van Henry' },
      { id: 3, nameDetail:  'April Tucker' },
      { id: 4, nameDetail:  'Ralph Hubbard' },
      { id: 5, nameDetail:  'Bradley Wilkerson' },
      { id: 6, nameDetail:  'Kelly Snyder' },
    ],
    selectedNameId: "",
  });

  const [personNameChip, setPersonNameChip] = React.useState([]);


  const formik = useFormik({
    enableReinitialize: true,
    validate: (values) => {
      const errors = {};
      if(!values.nameList){
        errors.nameList = "ทดสอบแจ้ง error";
      }
      return errors;
    },
    initialValues: {
      nameList: state.selectedNameId,
    },
    onSubmit: (values) => {

      var dataSubmit = [];
      formik.values.nameList.forEach(element => {
        dataSubmit.push(element.id);
      });

      swal.swalInfo("info", JSON.stringify(dataSubmit, null, 2)).then((res) => {
        formik.setSubmitting(false);
        formik.resetForm();
      });
    },
  });

  React.useEffect(() => {
    if(formik.values.nameList === ""){//0. ดักไว้ในกรณีไม่มี array เพื่อไปโชว์ ค่า default ใน chip icon
      setPersonNameChip([]);
    }
    else{

        alert(JSON.stringify(formik.values.nameList));

        var data = [];
         formik.values.nameList.forEach(element => {
            data.push(element.nameDetail);
         });
         setPersonNameChip(data); //7. array เพื่อใช้สำหรับรันโชว์ Chip icon ว่าเลือกอะไรไปบ้าง
    }
 
  }, [formik.values.nameList])

  return (
    <form onSubmit={formik.handleSubmit}>
         <br></br>
      values: {JSON.stringify(formik.values)}
      <br></br>
      error: {JSON.stringify(formik.errors)}
      <br></br>
      touched: {JSON.stringify(formik.touched)}
      <br></br>
      dirty: {JSON.stringify(formik.dirty)}


      <Grid container spacing={3}  direction="row" justifyContent="flex-start"  alignItems="flex-end" >
        {/* Title */}
        <Grid item xs={12} lg={6}>
            <FormikDropdownMultiple
            formik={formik}
            data={state.names} //1. ส่ง data list ทั้งหมดที่ใช้ใน dropdown
            name="nameList" 
            itemSelected={personNameChip}
            label="ชื่อ"
            valueFieldName="id"
            displayFieldName="nameDetail"
          />
        </Grid>


        <Grid item xs={12} lg={3}>
          <Button
            type="submit"
            // disabled={formik.isSubmitting || !formik.dirty}
            fullWidth
            color="primary"
            variant="contained"
          >
            Submit
          </Button>
        </Grid>

        <Grid item xs={12} lg={3}>
          <Button
            fullWidth
            onClick={() => {
              history.push("/demo/formDemo");
            }}
            variant="contained"
          >
            Back
          </Button>
        </Grid>
      </Grid>
   
    
    </form>
  );
}

export default FormWithDropdownMultiple;
