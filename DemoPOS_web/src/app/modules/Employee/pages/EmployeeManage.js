import React from 'react'
import EmployeeAddEdit from '../components/EmployeeAddEdit'
import EmployeeSearch from '../components/EmployeeSearch'
import EmployeeTable from '../components/EmployeeTable'

function EmployeeManage() {
    return (
        <div>
            <EmployeeSearch></EmployeeSearch>
            <EmployeeTable></EmployeeTable>
            <EmployeeAddEdit></EmployeeAddEdit>
        </div>
    )
}

export default EmployeeManage
