import React, { useEffect, useState } from "react"
import "./Home.css"
import AccountImage from "../../img/RR.K.74.TANVIR (1)........jpg"
import Repo from "./Repo";
import ReactPaginate from "react-paginate";
import axios from "axios";
const Home =()=>{
    const [pageCount,setPageCount]=useState(0);
    const [data,setData]=useState(null);
    const [numberOfSelectPage,setNumberOfSelectPage]=useState(1)
    useEffect( ()=>{
        const getGithubRepoApi= async()=>{
            const res =await fetch(`https://api.github.com/users/johnpapa/repos?page=${numberOfSelectPage}&per_page=10`);
            const repoData = await res.json()
            const dataLimit = await res.headers.get('x-ratelimit-limit');
            setPageCount(Math.ceil(dataLimit/10))
            setData(repoData)
            console.log(repoData);
        }
        getGithubRepoApi()

    },[numberOfSelectPage])
    // pagination function 
    const handlePageClick=(data)=>{
        setNumberOfSelectPage(data.selected +1)
    }
  
    return(
        <main className="home-container">
            <div className="home-heading">
                <div className="img-conatiner">
                    <img src={AccountImage} alt='img' className="account-img"/>
                    <p className="gitHub-link">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" className="link-icon" height="24" viewBox="0 0 24 24" style={{fill: 'rgba(0, 0, 0, 1)',transform: 'msFilter'}}><path d="M4.222 19.778a4.983 4.983 0 0 0 3.535 1.462 4.986 4.986 0 0 0 3.536-1.462l2.828-2.829-1.414-1.414-2.828 2.829a3.007 3.007 0 0 1-4.243 0 3.005 3.005 0 0 1 0-4.243l2.829-2.828-1.414-1.414-2.829 2.828a5.006 5.006 0 0 0 0 7.071zm15.556-8.485a5.008 5.008 0 0 0 0-7.071 5.006 5.006 0 0 0-7.071 0L9.879 7.051l1.414 1.414 2.828-2.829a3.007 3.007 0 0 1 4.243 0 3.005 3.005 0 0 1 0 4.243l-2.829 2.828 1.414 1.414 2.829-2.828z"></path><path d="m8.464 16.95-1.415-1.414 8.487-8.486 1.414 1.415z"></path></svg>
                    <span>https://github.com/Tanvir-Alam625</span>
                    </p>
                </div>
                <div className="account-info">
                    <h2>Md Tanvir Alam</h2>
                    <p className="desc">
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                    </p>
                    <p className="location">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="icon">
                    <path fillRule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                    </svg>
                    <span>Dhaka</span>
                    </p>
                    <p>Twitter:</p>
                </div>
                
            </div>
            <div className="repo-container">
                {
                    data?.map(repo => <Repo repo={repo}/>)
                }
            </div>

            {/* pagination code  */}
            <div className="pagination-bar">
                <ReactPaginate
                previousLabel={`<<`}
                nextLabel={`>>`}
                pageCount={pageCount}
                pageRangeDisplayed={2}
                marginPagesDisplayed={2}
                breakLabel={'****'}
                onPageChange={handlePageClick}
                containerClassName={"pagination"}
                pageClassName={'page-item'}
                pageLinkClassName={'page-link'}
                nextClassName={'page-item'}
                nextLinkClassName={'page-link'}
                previousClassName={'page-item'}
                previousLinkClassName={'page-link'}
                breakClassName={'page-item'}
                breakLinkClassName={'page-link'}
                activeClassName={'active'}
                />
            </div>
        </main>

    );
}
export default Home;