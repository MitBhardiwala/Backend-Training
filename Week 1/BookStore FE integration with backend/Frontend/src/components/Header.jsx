import filterOptions from "../assets/filters.json";
import { Button } from "@mui/material";
import handleSortOptions from "../helperFunctions/sortingFunctions";
import { useState } from "react";
import handleShowFunctions from "../helperFunctions/showFunctions";

import formData from "../utils/DialogBoxFormData";
import CommonDialogBox from "../utils/CommonDialogBox";



const Header = ({ setData }) => {
  const [open, setOpen] = useState(false);
  const [currentFilterId, setCurrentFilterId] = useState(0);
  const [currForm, setCurrForm] = useState({});
  const [currFilter, setcurrFilter] = useState("form")

  return (
    <>
      <div className="flex flex-wrap gap-2">
        {filterOptions.map((filter) => (
          <Button
            variant="contained"
            color="success"
            className="m-1"
            key={filter.filterId}
            onClick={() => {
              
              setCurrentFilterId(filter.filterId);
              setcurrFilter(filter.filterOption)
              const foundForm = formData.find(
                (item) => item.id === filter.filterId
              );
              setCurrForm(foundForm ? foundForm.formData : {});
              if (filter.filterId >= 16 && filter.filterId <= 21) {
                handleSortOptions(filter.filterId, setData);
              } else if (
                filter.filterId == 7 ||
                (filter.filterId >= 11 && filter.filterId <= 15)
              ) {
                handleShowFunctions(filter.filterId, setData);
              } else {
                setOpen(true);
              }
            }}
          >
            {filter.filterOption}
          </Button>
        ))}
        <CommonDialogBox
          open={open}
          formData={currForm}
          setOpen={setOpen}
          filterId={currentFilterId}
          setData={setData}
          title={currFilter}
        />
      </div>
    </>
  );
};

export default Header;
