import React, { useContext, useState } from "react";
import ReactPaginate from "react-paginate";
import { AuthContext } from "../../Context/auth";
import { ChevronLeft, ChevronRight } from "react-feather";
import { Popconfirm } from "antd";
import { ProductContext } from "../../Context/ProductProvider";
import { Card, Bidding } from "../../components";
import RolesHooks from '../../lib/RolesHook'
import { Search } from 'react-feather'
//import { MyDateString } from '../../Utils'

const Marketplace = () => {
  const [pageNumber, setPageNumber] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [id, setId] = useState("");

  const numberOfCards = 6;
  const pagesVisited = pageNumber * numberOfCards;
  const product = useContext(ProductContext);
  const context = useContext(AuthContext);

  const { info } = RolesHooks();

  // function monthDiff(d1, d2) {
  //   var months;
  //   months = (d2.getFullYear() - d1.getFullYear()) * 12;
  //   months -= d1.getMonth();
  //   months += d2.getMonth();
  //   return months <= 0 ? 0 : months;
  // }

  // function test(d1, d2) {
  //   var diff = monthDiff(d1, d2);
  //   console.log(
  //     d1.toISOString().substring(0, 10),
  //     "to",
  //     d2.toISOString().substring(0, 10),
  //     ":",
  //     diff
  //   );
  // }

  // test(
  //   new Date(2008, 10, 4), // November 4th, 2008
  //   new Date()  // March 12th, 2010
  // );

  // product.product.sort((obj) => {
  //   console.log(new Date(obj.dateHarvested.seconds * 1000).toISOString().substring(0, 10))
  // })

  const isToggle = (event, id) => {
    event.preventDefault();
    setId(id);
    if (!openModal) {
      setOpenModal(true);
    } else {
      setOpenModal(false);
    }
  };

  const displayCards = product.product.length ? (
    product.product
      .slice(pagesVisited, pagesVisited + numberOfCards)
      .map((type, index) => (
        <>
          {type.uid === context.uid ? null : (
            <Card
              cardStyle="truncate"
              key={index}
              image={type.imageUrl}
              kilograms={type.kilograms}
              price={type.price}
              title={type.riceVariety}
              name={type.email}
              description={type.description}
            >
              <div className="text-right">
                {info.role === "NFA" ? (
                  <Popconfirm
                    title="Would you like to purchase this item?"
                  >
                    <button className="bg-primary hover:bg-primary-slight text-white px-8 py-1 text-sm my-3 font-semibold rounded-sm">
                      Buy
                    </button>
                  </Popconfirm>
                ) : (
                  <Popconfirm
                    title="Are you sure you want to bid?"
                    onConfirm={(event) => isToggle(event, type.id)}
                  >
                    <button className="bg-primary hover:bg-primary-slight text-white px-8 py-1 text-sm my-3 font-semibold rounded-sm">
                      Bid
                    </button>
                  </Popconfirm>
                )}
              </div>
            </Card>
          )}
        </>
      ))
  ) : (
    <div className="absolute inset-x-0 py-10 text-center bg-gray-200 font-semibold text-gray-600">
      Market Place is Empty
    </div>
  );

  //returning page count divided by number of card presented in the screen
  const pageCount = Math.ceil(product.product.length / numberOfCards);

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
          <input type="text" className="w-full outline-none text-xl" placeholder="Search..." />
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
