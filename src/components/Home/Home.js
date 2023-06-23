import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";
import "./Home.css";
import Repo from "./Repo";
import { FiLink2 } from "react-icons/fi";
import { MdLocationOn } from "react-icons/md";
import { API_ENDPOINTS, ITEMS_PER_PAGE } from "./constants";
import Skeleton from "./Skeleton/Skeleton";

const Home = () => {
  const [pageCount, setPageCount] = useState(0);
  const [repoData, setRepoData] = useState(null);
  const [selectedPage, setSelectedPage] = useState(1);
  const [accountData, setAccountData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [username, setUsername] = useState("tanvir-alam625");
  const [error, setError] = useState(false);

  const getGithubRepoApi = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `${API_ENDPOINTS.GET_REPOS(
          username
        )}?page=${selectedPage}&per_page=${ITEMS_PER_PAGE}`
      );

      if (response.status === 200) {
        setError(false);
        const { data } = response;
        const dataLimit = response.headers["x-ratelimit-limit"];
        setPageCount(Math.ceil(dataLimit / ITEMS_PER_PAGE));
        setRepoData(data);
      } else {
        setError(true);
      }

      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  }, [selectedPage, username]);

  useEffect(() => {
    getGithubRepoApi();
  }, [getGithubRepoApi]);

  const getAccountData = useCallback(async (user) => {
    try {
      const { data } = await axios.get(API_ENDPOINTS.GET_ACCOUNT(user));
      setAccountData(data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    getAccountData(username);
  }, [getAccountData, username]);

  const handleOnChange = useCallback(
    (e) => {
      setUsername(e.target.value);
      getAccountData(e.target.value);
    },
    [getAccountData]
  );

  const handlePageClick = useCallback((data) => {
    setSelectedPage(data.selected + 1);
  }, []);

  return (
    <main className="home-container">
      <div
        style={{ display: "flex", justifyContent: "center", margin: "20px" }}
      >
        <input
          type="text"
          name="search"
          id="search"
          onChange={handleOnChange}
          style={{
            padding: "10px 25px",
            outline: "none",
            border: "2px solid #428BCA",
            width: "70%",
            borderRadius: "4px",
          }}
          placeholder="Type GitHub Username"
        />
      </div>
      {error ? (
        <h2>Not Found User</h2>
      ) : (
        <>
          <div className="home-heading">
            <div className="img-container">
              {isLoading ? (
                <>
                  <Skeleton
                    type="circle"
                    height="300px"
                    width="300px"
                    style={{ marginBottom: "10px" }}
                  />
                  <Skeleton type="text" height="40px" width="80%" />
                </>
              ) : (
                <>
                  <img
                    src={accountData.avatar_url}
                    alt="img"
                    className="account-img"
                  />
                  <p className="gitHub-link">
                    <a
                      href={`https://twitter.com/${accountData?.twitter_username}`}
                      target="_blank"
                    >
                      <FiLink2
                        size="1.4rem"
                        color="#000"
                        style={{ margin: "10px" }}
                      />
                    </a>
                    <span>{accountData?.html_url}</span>
                  </p>
                </>
              )}
            </div>
            <div className="account-info">
              {isLoading ? (
                <>
                  <Skeleton type="text" height="40px" />
                  <Skeleton
                    type="rectangle"
                    height="50px"
                    width="50%"
                    style={{ marginBottom: "10px" }}
                  />
                  <Skeleton type="text" height="40px" width="50%" />
                  <Skeleton type="text" height="40px" width="50%" />
                </>
              ) : (
                <>
                  <h2>{accountData.name}</h2>
                  <p className="desc">{accountData?.bio}</p>
                  <p className="location">
                    <MdLocationOn
                      size="1.4rem"
                      color="#000"
                      style={{ margin: "10px" }}
                    />
                    <span>{accountData?.location}</span>
                  </p>
                  <p>
                    Twitter: https://twitter.com/{accountData?.twitter_username}
                  </p>
                </>
              )}
            </div>
          </div>
          {/* {(isLoading || isLoading) && <RepoSpinner />} */}
          <div className="repo-container">
            {isLoading ? (
              <>
                <Skeleton type="rectangle" height="100px" />
                <Skeleton type="rectangle" height="100px" />
                <Skeleton type="rectangle" height="100px" />
              </>
            ) : (
              repoData?.map((repo, index) => <Repo key={index} repo={repo} />)
            )}
            {/* {!isLoading &&
              repoData?.map((repo, index) => <Repo key={index} repo={repo} />)} */}
          </div>
          {pageCount >= 1 && (
            <div className="pagination-bar">
              <ReactPaginate
                previousLabel="<<"
                nextLabel=">>"
                pageCount={pageCount}
                pageRangeDisplayed={2}
                marginPagesDisplayed={2}
                breakLabel="****"
                onPageChange={handlePageClick}
                containerClassName="pagination"
                pageClassName="page-item"
                pageLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                breakClassName="page-item"
                breakLinkClassName="page-link"
                activeClassName="active"
              />
            </div>
          )}
        </>
      )}
    </main>
  );
};

export default Home;

// import React, { useEffect, useState } from "react";
// import "./Home.css";
// import Repo from "./Repo";
// import ReactPaginate from "react-paginate";
// import axios from "axios";
// import Spinner from "../Spinner/Spinner";
// import RepoSpinner from "./RepoSpinner/RepoSpinner";
// import { FiLink2 } from "react-icons/fi";
// import { MdLocationOn } from "react-icons/md";

// const Home = () => {
//   const [pageCount, setPageCount] = useState(0);
//   const [repodata, setRepoData] = useState(null);
//   const [numberOfSelectPage, setNumberOfSelectPage] = useState(1);
//   const [accountData, setAccountData] = useState({});
//   const [accountLoading, setAccountLoading] = useState(true);
//   const [reposLoading, setReposLoading] = useState(true);
//   const [username, setUsername] = useState("tanvir-alam625");
//   const [error, setError] = useState(false);
//   //  load the repo data
//   useEffect(() => {
//     const getGithubRepoApi = async () => {
//       try {
//         setReposLoading(true);
//         const res = await fetch(
//           `https://api.github.com/users/${username}/repos?page=${numberOfSelectPage}&per_page=10`
//         );
//         console.log(res.status);
//         if (res.status !== 200) {
//           setError(true);
//         } else {
//           setError(false);
//           const data = await res.json();
//           const dataLimit = await res.headers.get("x-ratelimit-limit");
//           setPageCount(Math.ceil(dataLimit / 10));
//           setRepoData(data);
//           setReposLoading(false);
//         }
//       } catch (error) {
//         console.log(error);
//       }
//     };
//     getGithubRepoApi();
//   }, [numberOfSelectPage, username]);

//   const deBouncer = (func, delay) => {
//     let timer;
//     return function (...args) {
//       if (timer) clearTimeout(timer);
//       timer = setTimeout(() => func(...args), delay);
//     };
//   };

//   //  get account  function
//   const getAccountData = async (user) => {
//     try {
//       const { data } = await axios.get(`https://api.github.com/users/${user}`);
//       await setAccountData(data);
//       await setAccountLoading(false);
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   getAccountData(username);
//   // pagination function
//   const handlePageClick = (data) => {
//     setNumberOfSelectPage(data.selected + 1);
//   };

//   if (accountLoading) {
//     return <Spinner />;
//   }

//   const handleOnChange = deBouncer((e) => {
//     setUsername(e.target.value);
//     getAccountData(e.target.value);
//   }, 1000);

//   return (
//     <main className="home-container">
//       <div
//         style={{ display: "flex", justifyContent: "center", margin: "20px" }}
//       >
//         <input
//           type="text"
//           name="search"
//           id="search"
//           onChange={handleOnChange}
//           style={{
//             padding: "10px 25px",
//             outline: "none",
//             border: "2px solid #428BCA",
//             width: "70%",
//           }}
//           placeholder="Type GitHub Username"
//         />
//       </div>
//       {error ? (
//         <h2>Not Found User</h2>
//       ) : (
//         <>
//           <div className="home-heading">
//             <div className="img-container">
//               <img
//                 src={accountData?.avatar_url}
//                 alt="img"
//                 className="account-img"
//               />
//               <p className="gitHub-link">
//                 <a
//                   href={`https://twitter.com/${accountData?.twitter_username}`}
//                   target="_blank"
//                 >
//                   <FiLink2
//                     size="1.4rem"
//                     color="#000"
//                     style={{ margin: "10px" }}
//                   />
//                 </a>
//                 <span>{accountData?.html_url}</span>
//               </p>
//             </div>
//             <div className="account-info">
//               <h2>{accountData?.name}</h2>
//               <p className="desc">{accountData?.bio}</p>
//               <p className="location">
//                 <MdLocationOn
//                   size="1.4rem"
//                   color="#000"
//                   style={{ margin: "10px" }}
//                 />
//                 <span>{accountData?.location}</span>
//               </p>
//               <p>
//                 Twitter: https://twitter.com/{accountData?.twitter_username}
//               </p>
//             </div>
//           </div>
//           {(accountLoading || reposLoading) && <RepoSpinner />}

//           <div className="repo-container">
//             {!reposLoading &&
//               repodata?.map((repo, index) => <Repo key={index} repo={repo} />)}
//           </div>

//           {/* pagination code  */}
//           {pageCount >= 1 && (
//             <div className="pagination-bar">
//               <ReactPaginate
//                 previousLabel={`<<`}
//                 nextLabel={`>>`}
//                 pageCount={pageCount}
//                 pageRangeDisplayed={2}
//                 marginPagesDisplayed={2}
//                 breakLabel={"****"}
//                 onPageChange={handlePageClick}
//                 containerClassName={"pagination"}
//                 pageClassName={"page-item"}
//                 pageLinkClassName={"page-link"}
//                 nextClassName={"page-item"}
//                 nextLinkClassName={"page-link"}
//                 previousClassName={"page-item"}
//                 previousLinkClassName={"page-link"}
//                 breakClassName={"page-item"}
//                 breakLinkClassName={"page-link"}
//                 activeClassName={"active"}
//               />
//             </div>
//           )}
//         </>
//       )}
//     </main>
//   );
// };
// export default Home;
