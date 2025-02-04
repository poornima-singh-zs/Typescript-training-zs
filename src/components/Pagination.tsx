// import React, { useEffect, useState } from "react";
// import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

// interface Product {
//   id: number;
//   title: string;
//   images: string[];
// }

// const Pagination: React.FC = () => {
//   const [data, setData] = useState<Product[]>([]);
//   const [currentPage, setCurrentPage] = useState<number>(1);
//   const [itemsPerPage] = useState<number>(10);
//   const [visiblePage, setVisiblePage] = useState<number[]>([1, 2, 3, 4, 5]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch("https://dummyjson.com/products?limit=20");
//         const result = await response.json();
//         setData(result.products);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     fetchData();
//   }, []);

//   const totalPages = Math.ceil(data.length / itemsPerPage);
//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

//   const handlePageChange = (page: number) => {
//     if (page < 1 || page > totalPages) return;
//     setCurrentPage(page);

//     if (page > visiblePage[visiblePage.length - 1]) {
//       setVisiblePage(visiblePage.map((p) => p + 1));
//     } else if (page < visiblePage[0]) {
//       setVisiblePage(visiblePage.map((p) => p - 1));
//     }
//   };

//   return (
//     <div>
//       <h1 className="heading">Products</h1>
//       <div className="parent">
//         {currentItems.map((product) => (
//           <div className="child" key={product.id}>
//             <img
//               src={product.images[0]}
//               style={{ height: "150px", width: "150px" }}
//               alt={product.title}
//             />
//             <h1 style={{ fontSize: "20px"}}>
//               {product.id} {product.title}
//             </h1>
//           </div>
//         ))}
//       </div>

//       <div className="pagination">
//         <button
//           onClick={() => {
//             setCurrentPage(1);
//             setVisiblePage([1, 2, 3, 4, 5]);
//           }}
//           disabled={currentPage === 1}
          
//         >
//        <div className="arrow">
//        <FaAngleLeft />
//        <FaAngleLeft />
//        </div>
        
//         </button>
//         <button
//           onClick={() => handlePageChange(currentPage - 1)}
//           disabled={currentPage === 1}
//         >
//           <FaAngleLeft/>
//         </button>

//         {visiblePage.map((page) => (
//           <button
//             key={page}
//             onClick={() => handlePageChange(page)}
//             disabled={currentPage === page || page > totalPages}
//           >
//             {page}
//           </button>
//         ))}
//         {visiblePage[visiblePage.length - 1] < totalPages && <button disabled>...</button>}

//         <button
//           onClick={() => handlePageChange(currentPage + 1)}
//           disabled={currentPage === totalPages}
//         >
//             <FaAngleRight />
//         </button>
//         <button
//           onClick={() => {
//             setCurrentPage(totalPages);
//             setVisiblePage([totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages]);
//           }}
//           disabled={currentPage === totalPages }
//         ><div className="arrow">

//           <FaAngleRight /><FaAngleRight />
//         </div>
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Pagination;


// Optimised
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://dummyjson.com/products?limit=30");
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

  const getVisiblePages = (current: number, total: number): number[] => {
    if (total <= 0) return [];
    let start = Math.max(1, current - 2);
    let end = Math.min(total, current + 2);

    if (end - start + 1 < 5) {
      if (current < total / 2) {
        end = Math.min(total, start + 4);
      } else {
        start = Math.max(1, end - 4);
      }
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  const visiblePages = getVisiblePages(currentPage, totalPages);
  const showLeftEllipsis = visiblePages[0] > 1;
  const showRightEllipsis = visiblePages[visiblePages.length - 1] < totalPages;

  const handlePageChange = (page: number) => {
    if (totalPages === 0) return;
 
  if (page === -1) {
  
    setCurrentPage((prev) => (prev === 1 ? totalPages : 1));
  } else if (page === -2) {

    setCurrentPage((prev) => (prev === totalPages ? 1 : totalPages));
  } else if (page === -3) {
  
    setCurrentPage((prev) => (prev > 1 ? prev - 1 : totalPages));
  } else if (page === -4) {
  
    setCurrentPage((prev) => (prev < totalPages ? prev + 1 : 1));
  } else {
    if (page < 1) page = 1;
    else if (page > totalPages) page = totalPages;
    
    setCurrentPage(page);
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
            <h1 style={{ fontSize: "20px" }}>{product.title}</h1>
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="pagination">
           <button onClick={() => handlePageChange(-1)}>
            <FaAngleLeft /><FaAngleLeft />
          </button>
          <button onClick={() => handlePageChange(-3)}>
            <FaAngleLeft />
          </button>

          {showLeftEllipsis && (
            <>
              <button onClick={() => handlePageChange(1)}>1</button>
              <button disabled>...</button>
            </>
          )}

          {visiblePages.map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              disabled={currentPage === page}
            >
              {page}
            </button>
          ))}

          {showRightEllipsis && (
            <>
              <button disabled>...</button>
              <button onClick={() => handlePageChange(totalPages)}>
                {totalPages}
              </button>
            </>
          )}

          <button onClick={() => handlePageChange(-4)}>
            <FaAngleRight />
          </button>
          <button onClick={() => handlePageChange(-2)}>
            <FaAngleRight /><FaAngleRight />
          </button>
        </div>
      )}
    </div>
  );
};

export default Pagination;

