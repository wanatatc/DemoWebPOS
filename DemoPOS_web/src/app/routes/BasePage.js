import React from "react";
import { Redirect, Switch, Route } from "react-router-dom";
import { ContentRoute } from "./ContentRoute";
import PrivateRoute from "./PrivateRoute";
import ErrorUnAuthorized from "../pages/ErrorUnAuthorized";
import Home from "../pages/Home";
import TitleManage from "../modules/Title/pages/TitleManage";
import Test from "../pages/Test";
import { PERMISSIONS } from "../../Constant";
import EmployeeManage from "../modules/Employee/pages/EmployeeManage";
import AlertDemo from "../modules/_demo/pages/AlertDemo";
import FormDemo from "../modules/_demo/pages/formComponents/FormDemo";
import FormWithAutoComplete from "../modules/_demo/pages/formComponents/FormWithAutoComplete";
import FormWithCheckBox from "../modules/_demo/pages/formComponents/FormWithCheckBox";
import FormWithCheckboxGroup from "../modules/_demo/pages/formComponents/FormWithCheckboxGroup";
import FormWithDatePicker from "../modules/_demo/pages/formComponents/FormWithDatePicker";
import FormWithDateTimePicker from "../modules/_demo/pages/formComponents/FormWithDateTimePicker";
import FormWithDropdown from "../modules/_demo/pages/formComponents/FormWithDropdown";
import FormWithDropDownMultiple from "../modules/_demo/pages/formComponents/FormWithDropdownMultiple";
import FormWithDropdownCascade from "../modules/_demo/pages/formComponents/FormWithDropdownCascade";
import FormWithRadioGroup from "../modules/_demo/pages/formComponents/FormWithRadioGroup";
import FormWithRating from "../modules/_demo/pages/formComponents/FormWithRating";
import FormWithSlider from "../modules/_demo/pages/formComponents/FormWithSlider";
import FormWithSwitch from "../modules/_demo/pages/formComponents/FormWithSwitch";
import FormWithTextMaskCardId from "../modules/_demo/pages/formComponents/FormWithTextMaskCardId";
import FormWithTextField from "../modules/_demo/pages/formComponents/FormWithTextField";
import FormWithTextNumber from "../modules/_demo/pages/formComponents/FormWithTextNumber";
import FormWithTimePicker from "../modules/_demo/pages/formComponents/FormWithTimePicker";
import FormWithUploader from "../modules/_demo/pages/formComponents/FormWithUploader";
import pdfGenerrate from "../modules/_demo/pages/PdfGenerateDemo";
import QRGenerateDemo from "../modules/_demo/pages/QRGenerateDemo";
import QRReaderDemo from "../modules/_demo/pages/QRReaderDemo";
import BarcodeGenerateDemo from "../modules/_demo/pages/BarcodeGenerateDemo";
import ChartDemo from "../modules/_demo/pages/ChartDemo";
import ChartDrillDownDemo from "../modules/_demo/pages/ChartDrillDownDemo";
import PrintComponent from "../modules/_demo/pages/PrintComponent";
import DatatableListDemo from "../modules/_demo/pages/DatatableListDemo";
import TabBasic from "../modules/_demo/pages/TabBasic";
import ReduxDemo from "../modules/_demo/pages/ReduxDemo";
import FormWithCustomDateBE from "../modules/_demo/pages/formComponents/FormWithCustomDateBE";
import FormWithDateRangePicker from "../modules/_demo/pages/formComponents/FormWithDateRangePicker";
//import TimeAgoPage from "../modules/_demo/pages/TimeAgoPage";
import Product from "../modules/Product/pages/Product";
import ProductAddEdit from "../modules/Product/pages/ProductAddEdit";
import {
  ProductGroups,
  ProductGroupEdit,
  ProductGroupById,
} from "../modules/ProductGroup/pages";
import Purchase from "../modules/Cart/pages/Purchase";
import CheckoutPage from "../modules/Cart/pages/CheckoutPage";
import CalendarDemo from "../modules/_demo/pages/CalendarDemo";
import ProductById from "../modules/Product/pages/ProductById";

export const breadcrumbNameMap = {
  "/product": "Product Manage",
  "/product/new": "New Product",
  "/product/:id/edit": "Product edit",
  "/product/:id": "Product view",
  "/checkout": "Check out",
  "/productgroup": "Product Group manage",
  "/productgroup/:id/edit": "Product Group edit",
  "/productgroup/:id": "Product Group",
  "/purchase": "Purchase",
};

export default function BasePage(props) {
  return (
    <React.Fragment>
      <Switch>
        {/* <Redirect exact from="/" to="/home" /> */}
        <Route exact path="/errorUnAuthorized" component={ErrorUnAuthorized} />
        <ContentRoute exact title="home" path="/" component={Home} />
        <ContentRoute exact title="home" path="/home" component={Home} />
        <ContentRoute exact path="/test" component={Test} title="Test" />

        {/* Begin Demo */}

        <PrivateRoute
          exact
          title="alert demo"
          path="/demo/alert"
          component={AlertDemo}
        />
        <PrivateRoute
          exact
          title="form demo"
          path="/demo/formDemo"
          component={FormDemo}
        />
        <PrivateRoute
          exact
          title="form demo"
          path="/demo/formWithCustomDateBE"
          component={FormWithCustomDateBE}
        />
        <PrivateRoute
          exact
          title="form with autoComplete demo"
          path="/demo/formWithAutoComplete"
          component={FormWithAutoComplete}
        />
        <PrivateRoute
          exact
          path="/demo/formWithCheckBox"
          component={FormWithCheckBox}
          title="FormWithCheckBox"
        />
        <PrivateRoute
          exact
          path="/demo/formWithCheckboxGroup"
          component={FormWithCheckboxGroup}
          title="FormWithCheckboxGroup"
        />
        <PrivateRoute
          exact
          path="/demo/formWithDatePicker"
          component={FormWithDatePicker}
          title="FormWithDatePicker"
        />
        <PrivateRoute
          exact
          path="/demo/formWithDateTimePicker"
          component={FormWithDateTimePicker}
          title="FormWithDateTimePicker"
        />
        <PrivateRoute
          exact
          path="/demo/formWithDateRangePicker"
          component={FormWithDateRangePicker}
          title="FormWithDateRangePicker"
        />
        <PrivateRoute
          exact
          path="/demo/formWithDropdown"
          component={FormWithDropdown}
          title="FormWithDropdown"
        />
        <PrivateRoute
          exact
          path="/demo/formWithDropdownMultiple"
          component={FormWithDropDownMultiple}
          title="FormWithDropdownMultiple"
        />
        <PrivateRoute
          exact
          path="/demo/formWithDropdownCascade"
          component={FormWithDropdownCascade}
          title="FormWithDropdownCascade"
        />
        <PrivateRoute
          exact
          path="/demo/formWithRadioGroup"
          component={FormWithRadioGroup}
          title="FormWithRadioGroup"
        />
        <PrivateRoute
          exact
          path="/demo/formWithRating"
          component={FormWithRating}
          title="FormWithRating"
        />
        <PrivateRoute
          exact
          path="/demo/formWithSlider"
          component={FormWithSlider}
          title="FormWithSlider"
        />
        <PrivateRoute
          exact
          path="/demo/formWithSwitch"
          component={FormWithSwitch}
          title="FormWithSwitch"
        />
        <PrivateRoute
          exact
          path="/demo/formWithTextMaskCardId"
          component={FormWithTextMaskCardId}
          title="FormWithTextMaskCardId"
        />
        <PrivateRoute
          exact
          path="/demo/formWithTextField"
          component={FormWithTextField}
          title="FormWithTextField"
        />
        <PrivateRoute
          exact
          path="/demo/formWithTextNumber"
          component={FormWithTextNumber}
          title="FormWithTextNumber"
        />
        <PrivateRoute
          exact
          path="/demo/formWithTimePicker"
          component={FormWithTimePicker}
          title="FormWithTimePicker"
        />
        <PrivateRoute
          exact
          path="/demo/formWithUploader"
          component={FormWithUploader}
          title="FormWithUploader"
        />
        <PrivateRoute
          exact
          path="/demo/reduxDemo"
          component={ReduxDemo}
          title="reduxDemo"
        />
        <PrivateRoute
          exact
          path="/demo/pdfGenerrate"
          component={pdfGenerrate}
          title="pdfGenerrate"
        />
        <PrivateRoute
          exact
          path="/demo/QRGenerateDemo"
          component={QRGenerateDemo}
          title="QRGenerateDemo"
        />
        <PrivateRoute
          exact
          path="/demo/QRReaderDemo"
          component={QRReaderDemo}
          title="QRReaderDemo"
        />
        <PrivateRoute
          exact
          path="/demo/BarcodeGenerateDemo"
          component={BarcodeGenerateDemo}
          title="BarcodeGenerateDemo"
        />
        <PrivateRoute
          exact
          path="/demo/apexcharts"
          component={ChartDemo}
          title="ChartDemo"
        />
        <PrivateRoute
          exact
          path="/demo/chartDrillDown"
          component={ChartDrillDownDemo}
          title="ChartDrillDownDemo"
        />
        <PrivateRoute
          exact
          path="/demo/PrintComponent"
          component={PrintComponent}
          title="PrintComponent"
        />
        <PrivateRoute
          exact
          path="/demo/datatableList"
          component={DatatableListDemo}
          title="DatatableListDemo"
        />
        <PrivateRoute
          exact
          path="/demo/tabBasic"
          component={TabBasic}
          title="Tab Basic"
        />

        <PrivateRoute
          exact
          path="/demo/calendar"
          component={CalendarDemo}
          title="Carlendar"
        />

        <PrivateRoute
          exact
          path="/title"
          permissions={[]}
          component={TitleManage}
        />

        <PrivateRoute
          exact
          path="/permissionTest"
          permissions={[PERMISSIONS.employee_delete]}
          component={Test}
        />

        <PrivateRoute
          exact
          path="/employeeManage"
          permissions={[PERMISSIONS.employee_read]}
          component={EmployeeManage}
        />

        {/* End Demo part สามารถ comment ได้ */}

        {/* Begin Demo POS */}

        <PrivateRoute
          exact
          path="/product"
          permissions={[]}
          component={Product}
        />

        <PrivateRoute
          exact
          path="/product/new"
          permissions={[]}
          component={ProductAddEdit}
        />

        <PrivateRoute
          exact
          path="/product/:id/edit"
          permissions={[]}
          component={ProductAddEdit}
        />

        <PrivateRoute
          exact
          path="/product/:id"
          permissions={[]}
          component={ProductById}
        />

        <PrivateRoute
          exact
          path="/checkout"
          permissions={[]}
          component={CheckoutPage}
        />

        <PrivateRoute exact path="/productgroup" component={ProductGroups} />

        <PrivateRoute
          exact
          path="/productgroup/:id/edit"
          component={ProductGroupEdit}
        />

        <PrivateRoute
          exact
          path="/productgroup/:id"
          component={ProductGroupById}
        />

        <PrivateRoute exact path="/purchase" component={Purchase} />

        {/* nothing match - redirect to error */}
        <Redirect to="/error404" />

        {/* --- End Demo POS --- */}
      </Switch>
    </React.Fragment>
  );
}
