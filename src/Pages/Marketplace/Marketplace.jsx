import React, { useContext, useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import { AuthContext } from "../../Context/auth";
import { ChevronLeft, ChevronRight } from "react-feather";
import { Popconfirm } from "antd";
import { ProductContext } from "../../Context/ProductProvider";
import { Card, Bidding } from "../../components";
import MarketCard from './MarketCard'
import { Search } from 'react-feather'
import { onSearch } from '../../Utils/ReusableSyntax'
//import { MyDateString } from '../../Utils'

const Marketplace = () => {
  const [pageNumber, setPageNumber] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [productData, setProductData] = useState([]);
  const [doSearch, setSearch] = useState([]);
  const [id, setId] = useState("");

  const numberOfCards = 6;
  const pagesVisited = pageNumber * numberOfCards;
  const { product } = useContext(ProductContext);
  const context = useContext(AuthContext);

  useEffect(() => {
    const search = doSearch.length > 0 && onSearch(doSearch, product);
    if (search.length > 0) {
      setProductData(search)
    } else {
      setProductData(product)
    }
  }, [doSearch, product])

  const isToggle = (event, id) => {
    event.preventDefault();
    setId(id);
    if (!openModal) {
      setOpenModal(true);
    } else {
      setOpenModal(false);
    }
  };

  const displayCards = productData.length ? (
    productData
      .slice(pagesVisited, pagesVisited + numberOfCards)
      .map((type, index) => (
        <>
          {type.uid === context.uid ? null : (
            <MarketCard
              key={index}
              {...type}
              isToggle={(event) => isToggle(event, type.id)}
            />
          )}
        </>
      ))
  ) : (
    <div className="absolute inset-x-0 py-10 text-center text-xl font-semibold text-gray-600">
      Market Place is Empty
    </div>
  );

  //returning page count divided by number of card presented in the screen
  const pageCount = Math.ceil(product.length / numberOfCards);

  //Next and previous number on change
  const changePage = ({ selected }) => {
    setPageNumber(selected);
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
      {/* {fetchFarmLocation.length <= 0 && <Confirmation />} */}
      <div className="max-w-content mx-auto px-4 bg-gray-100">
        <div className="mb-5 flex items-center justify-between border-2 border-gray-200 hover:border-blue-500 focus:border-blue-500  rounded-lg py-3  px-5 bg-white">
          <input
            type="text"
            onChange={(event) => setSearch(event.target.value)}
            value={doSearch}
            name="doSearch"
            className="w-full outline-none text-xl"
            placeholder="Search..."
          />
          <Search className="text-gray-200" />
        </div>
        <div className="flex text-center justify-between">
          <h1 className="text-2xl pb-8 font-bold">Market Place</h1>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 flex justify-center relative">
          {displayCards}
        </div>
        <ReactPaginate
          previousLabel={<ChevronLeft className="text-gray-500" />}
          nextLabel={<ChevronRight className="text-gray-500" />}
          breakLabel={"..."}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          onPageChange={changePage}
          containerClassName={
            "pagination flex sm:justify-end justify-center items-center text-acad-secondary font-bold"
          }
          previousLinkClassName={"border-0"}
          nextLinkClassName={"border-0"}
          disabledClassName={"paginationDisabled"}
          activeClassName={"active"}
        />
      </div>
    </>
  );
};

export default Marketplace;
