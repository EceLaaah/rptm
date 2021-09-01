import React, { useContext, useState, useEffect } from "react";
import { ProductContext } from "../../Context/ProductProvider";
import { RiceVarietyContext } from '../../Context/RiceVarietyProvider'
import { Bidding, FilterCategory, FilterIncome } from "../../components";
import MarketCard from "./MarketCard";
import { Search, } from "react-feather";
//import { notification } from 'antd';
import { onSearch } from "../../Utils/ReusableSyntax";
import RolesHook from '../../lib/RolesHook'
import { sortFarmerIncome } from '../../Utils/ReusableSyntax'

const Marketplace = () => {
  const [openModal, setOpenModal] = useState(false);
  const [productData, setProductData] = useState([]);
  const [doSearch, setSearch] = useState([]);
  const [toggleCategory, setToggleCategory] = useState(false);
  const [toggleIncome, setToggleIncome] = useState(false);
  const [sortData, setSortData] = useState(null);
  //const [variety, setVariety] = useState("");
  const [id, setId] = useState("");

  const { product } = useContext(ProductContext);
  const { fetchVariety } = useContext(RiceVarietyContext);
  //const { userInformation } = useContext(UserContext)
  const { info } = RolesHook();
  //const context = useContext(AuthContext);

  const isCategoryToggle = () => setToggleCategory((toggleCategory) => !toggleCategory);
  const isIncomeToggle = () => setToggleIncome((toggleIncome) => !toggleIncome);

  const sortProduct = (event, variety) => {
    event.preventDefault();

    //**Sort by category */
    if (variety !== undefined) {
      const sortCategory = product.filter((obj) => {
        return obj.riceVariety === variety
      })

      setSortData(sortCategory)
    }
  }

  const sortIncome = (event, types) => {
    event.preventDefault();

    const map = {
      kilograms: "kilograms",
      riceVariety: "riceVariety",
      farmerIncome: "farmerIncome"
    }

    const sortType = map[types]

    const sorted = product.sort((a, b) => {
      if (sortType === "farmerIncome" || sortType === "kilograms") {
        return a[sortType] - b[sortType]
      } else {
        return a.riceVariety !== b.riceVariety ? a.riceVariety < b.riceVariety ? -1 : 1 : 0;
      }
    })
    setToggleIncome(false);
    setSortData(sorted)
  }

  useEffect(() => {
    const search = doSearch.length > 0 && onSearch(doSearch, product);
    if (search.length > 0) {
      setProductData(search);
    } else {
      setProductData(product);
    }
  }, [doSearch, product]);

  const isToggle = (event, id) => {
    event.preventDefault();

    setId(id);
    if (!openModal) {
      setOpenModal(true);
    } else {
      setOpenModal(false);
    }
  };

  return (
    <>
      {openModal && (
        <Bidding
          open={openModal}
          onClose={(event) => isToggle(event)}
          id={id}
        />
      )}
      <div className="max-w-content mx-auto px-4 bg-gray-100">
        <div className="flex text-center justify-between">
          <h1 className="text-2xl pb-8 font-bold">Market Place</h1>
        </div>
        <section className="py-2 border border-gray-300 mb-6 flex justify-between items-center px-4">
          <div className="flex items-center justify-between hover:border-blue-500 focus:border-blue-500 rounded-lg py-1 px-5 bg-transparent">
            <Search className="text-gray-400" />
            <input
              type="text"
              onChange={(event) => setSearch(event.target.value)}
              value={doSearch}
              name="doSearch"
              className="w-full outline-none text-lg bg-transparent ml-2"
              placeholder="Search..."
            />
          </div>
          <div className="flex items-center gap-4">
            <FilterCategory
              product={fetchVariety}
              isCategoryToggle={isCategoryToggle}
              toggleCategory={toggleCategory}
              sortProduct={sortProduct}
            />
            {info.role === "NFA" && <FilterIncome isIncomeToggle={isIncomeToggle} toggleIncome={toggleIncome} sortIncome={sortIncome} />}
          </div>
        </section>
        <MarketCard productData={sortData !== null ? sortData : productData} isToggle={isToggle} />
      </div>
    </>
  );
};

export default Marketplace;
