import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const base_url = import.meta.env.VITE_API_URL;

export const fetchAllData = (setData) => {
  const fetchData = async () => {
    try {
      let { data } = await axios.get(`${base_url}/books`);

      toast.success(data.message);
      setData(data.data);
    } catch (error) {
      console.log("Error : ", error);
      toast.error(error.response.data.message);
    }
  };

  fetchData();
};

const showMoreThan100 = async (setData) => {
  try {
    const { data } = await axios.get(`${base_url}/books`, {
      params: {
        searchTerm: "noOfPage",
        gt: 100,
      },
    });

    toast.success(data.message);
    setData(data.data);
  } catch (error) {
    console.log("Error:", error);
    toast.error(error.response.data.message);
  }
};

const showBetween25and90 = async (setData) => {
  try {
    const { data } = await axios.get(`${base_url}/books`, {
      params: {
        searchTerm: "noOfPage",
        gt: 25,
        lt:90
      },
    });

    toast.success(data.message);
    setData(data.data);
  } catch (error) {
    console.log("Error:", error);
    toast.error(error.response.data.message);
  }
};

const showBetween25and90not80 = async (setData) => {
  try {
     const { data } = await axios.get(`${base_url}/books`, {
      params: {
        searchTerm: "noOfPage",
        gt: 25,
        lt:90,
        ne:80
      },
    });
    toast.success(data.message);
    setData(data.data);
  } catch (error) {
    console.log("Error:", error);
    toast.error(error.response.data.message);
  }
};

const showZeroPageBooks = async (setData) => {
  try {
   const { data } = await axios.get(`${base_url}/books`, {
      params: {
        searchTerm: "noOfPage",
        eq:0
      },
    });

    toast.success(data.message);
    setData(data.data);
  } catch (error) {
    console.log("Error:", error);
    toast.error(error.response.data.message);
  }
};

const showBetweenYear2001and2015 = async (setData) => {
  try {
    const { data } = await axios.get(`${base_url}/books`, {
      params: {
        searchTerm: "releaseYear",
        gt:2001,
        lt:2015
      },
    });

    toast.success(data.message);
    setData(data.data);
  } catch (error) {
    console.log("Error:", error);
    toast.error(error.response.data.message);
  }
};

function handleShowFunctions(id, setData) {
  if (id == 7) {
    fetchAllData(setData);
  } else if (id == 11) {
    showMoreThan100(setData);
  } else if (id == 12) {
    showBetween25and90(setData);
  } else if (id == 13) {
    showBetween25and90not80(setData);
  } else if (id == 14) {
    showZeroPageBooks(setData);
  } else if (id == 15) {
    showBetweenYear2001and2015(setData);
  }
}

export default handleShowFunctions;
