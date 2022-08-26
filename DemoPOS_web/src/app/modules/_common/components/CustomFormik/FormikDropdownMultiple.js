/* eslint-disable array-callback-return */
import React from 'react';
import  PropTypes  from "prop-types";
import {FormControl,InputLabel,  Select,   MenuItem, Input, Chip ,FormHelperText} from '@material-ui/core/'

 function FormikDropdownMultiple(props) {

      const [dataToFormik, setDataToFormik] = React.useState([])

      const handleChange = (event) => { //4. เซ็ตข้อมูล

        setDataToFormik([]);
        var result ; 

        //5. ใช้สำหรับเก็บ array เพื่อส่งกลับไป formik
        event.target.value.forEach(element => { //element เป็น display field , 

                //คำ search เป็น parameter ในการหา เช่น {"id":1,"reasonDetail":"ผิดเงื่อนไขการรับประกัน","isActive":true} = reasonDetail
                props.data.map((item) => {
                    if(item[`${props.displayFieldName}`] === element){
                        result = item ;
                    }
                });
    
                // result =  props.data.find(({reasonDetail}) => reasonDetail === element);
                dataToFormik.push(result);
                // alert(JSON.stringify(result));
        });
        
      };

    return (
        
     
            <FormControl
                fullWidth
                disabled={props.disabled}
                error={
                  props.formik.errors[`${props.name}`] &&
                  props.formik.touched[`${props.name}`]
                }
            >
                <InputLabel id="demo-mutiple-chip-label">{props.label}</InputLabel>
                <Select
                    labelId="demo-mutiple-chip-label"
                    id="demo-mutiple-chip"
                    multiple
                    name={props.name} //2. นำ data list จาก props มาโชว์ใน dropdown
                    value={props.itemSelected}
                    input={<Input id="select-multiple-chip" />}
                    renderValue={(selected) =>  //8. นำ props.itemSelected เป็น value จาก Select มาวนโชว์ Chip ?
                        <div>
                                {selected.map((value ) => (
                                     <Chip label={value} />
                                ))}
                        </div>
                    }
                    onChange={(event) => {
                        handleChange(event); //3. event กดเลือก
                        console.log(event);
                        props.formik
                          .setFieldValue(props.name, dataToFormik) //6. พ่น array ที่เลือกพร้อมกับ id ส่งกลับไป formik
                          .then(props.selectedCallback(event.target.value));
                    }}
                >
                    {/* {props.data.map((item) => (
                        <MenuItem key={item.id} value={item.name}>
                        {item.name}
                        </MenuItem>
                    ))} */}

                    
                    <MenuItem disabled={props.disableFirstItem} value={0}>
                    <em>{props.firstItemText}</em>
                    </MenuItem>
                    {props.data.map((item) => (
                    <MenuItem
                        key={`${item[`${props.valueFieldName}`]}`}
                        value={item[`${props.displayFieldName}`]}
                    >
                        {item[`${props.displayFieldName}`]}
                    </MenuItem>
                    ))}

                </Select>
                {props.formik.errors[`${props.name}`] &&
                props.formik.touched[`${props.name}`] && (
                    <FormHelperText>
                        {props.formik.errors[`${props.name}`]}
                    </FormHelperText>
                )}
            </FormControl>
    
    )
}


FormikDropdownMultiple.propTypes = {
    formik: PropTypes.object,
    name: PropTypes.string,
    label: PropTypes.string,
    data: PropTypes.array,
    valueFieldName: PropTypes.string,
    displayFieldName: PropTypes.string,
    firstItemText: PropTypes.string,
    disableFirstItem: PropTypes.bool,
    selectedCallback: PropTypes.func,
    disabled: PropTypes.bool
  };
  
  // Same approach for defaultProps too
  FormikDropdownMultiple.defaultProps = {
    formik: {},
    name: "Do not forget to set name",
    label: "Do not forget to set label",
    data: [{ id: 0, name: "Do not forget to set data" }],
    valueFieldName: "id",
    displayFieldName: "name",
    firstItemText: "Do not forget to set firstItemText",
    disableFirstItem: true,
    selectedCallback: () => {},
    disabled: false
  };
  

export default FormikDropdownMultiple ;
