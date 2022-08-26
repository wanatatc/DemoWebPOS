import React from "react";
import TitleSearch from "../components/TitleSearch";
import TitleTable from "../components/TitleTable";
import TitleAddEdit from "../components/TitleAddEdit";
import TitleReOrder from "../components/TitleReOrder";

function TitleManage() {
  return (
    <div>
      <TitleSearch></TitleSearch>
      <TitleTable></TitleTable>
      <TitleAddEdit></TitleAddEdit>
      <TitleReOrder></TitleReOrder>
    </div>
  );
}

export default TitleManage;
