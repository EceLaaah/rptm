import React, { useContext, useState } from "react";
import ReactPaginate from "react-paginate";
import { AuthContext } from "../../Context/auth";
import { ChevronLeft, ChevronRight } from "react-feather";
import { Spin, Popconfirm } from "antd";
import { ProductContext } from "../../Context/ProductProvider";
import { Card, Bidding } from "../../components";

const Marketplace = () => {
  const [loading, setLoading] = useState(false);
  const [pageNumber, setPageNumber] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [id, setId] = useState("");

  const numberOfCards = 6;
  const pagesVisited = pageNumber * numberOfCards;
  const product = useContext(ProductContext);
  const context = useContext(AuthContext);

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
                <Popconfirm
                  title="Are you sure you want to bid?"
                  onConfirm={(event) => isToggle(event, type.id)}
                >
                  <button className="bg-primary hover:bg-primary-slight text-white px-8 py-1 text-sm my-3 font-semibold rounded-sm">
                    Bid
                  </button>
                </Popconfirm>
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
        <div className="flex text-center justify-between">
          <h1 className="text-2xl pb-8 font-bold">Market Place</h1>
        </div>
        <Spin spinning={loading} delay={500}>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 flex justify-center relative">
            {displayCards}
          </div>
        </Spin>
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
