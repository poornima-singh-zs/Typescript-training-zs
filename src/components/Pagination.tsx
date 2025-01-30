import React, { useEffect, useState } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

interface Product {
  id: number;
  title: string;
  images: string[];
}

const Pagination: React.FC = () => {
  const [data, setData] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage] = useState<number>(10);
  const [visiblePage, setVisiblePage] = useState<number[]>([1, 2, 3, 4, 5]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://dummyjson.com/products?limit=100");
        const result = await response.json();
        setData(result.products);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);

    if (page > visiblePage[visiblePage.length - 1]) {
      setVisiblePage(visiblePage.map((p) => p + 1));
    } else if (page < visiblePage[0]) {
      setVisiblePage(visiblePage.map((p) => p - 1));
    }
  };

  return (
    <div>
      <h1 className="heading">Products</h1>
      <div className="parent">
        {currentItems.map((product) => (
          <div className="child" key={product.id}>
            <img
              src={product.images[0]}
              style={{ height: "150px", width: "150px" }}
              alt={product.title}
            />
            <h1 style={{ fontSize: "20px"}}>
              {product.id} {product.title}
            </h1>
          </div>
        ))}
      </div>

      <div className="pagination">
        <button
          onClick={() => {
            setCurrentPage(1);
            setVisiblePage([1, 2, 3, 4, 5]);
          }}
          disabled={currentPage === 1}
          
        >
       <div className="arrow">
       <FaAngleLeft />
       <FaAngleLeft />
       </div>
        
        </button>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <FaAngleLeft/>
        </button>

        {visiblePage.map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            disabled={currentPage === page || page > totalPages}
          >
            {page}
          </button>
        ))}
        {visiblePage[visiblePage.length - 1] < totalPages && <button disabled>...</button>}

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
            <FaAngleRight />
        </button>
        <button
          onClick={() => {
            setCurrentPage(totalPages);
            setVisiblePage([totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages]);
          }}
          disabled={currentPage === totalPages}
        ><div className="arrow">

          <FaAngleRight /><FaAngleRight />
        </div>
        </button>
      </div>
    </div>
  );
};

export default Pagination;