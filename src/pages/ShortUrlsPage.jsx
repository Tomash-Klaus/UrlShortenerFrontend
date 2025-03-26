import {useState, useEffect} from "react";
import ReactPaginate from "react-paginate";
import { getShortPagedData} from "../services/urlApi.js";
import useAuthHook from "../hooks/useAuthHook.js";
import UrlTableComponent from "../components/UrlTableComponent.jsx";
import {Typography} from '@mui/material';
import AddNewUrlComponent from "../components/AddNewUrlComponent.jsx";

const ShortUrlsPage = () => {
    const [shortUrls, setShortUrls] = useState([]);
    const [totalCount, setTotalCount] = useState(shortUrls.length);
    const [currentPage, setCurrentPage] = useState(0);
    const [refreshData, setRefreshData] = useState(false);
    const itemsPerPage = 5;
    const {isAuthenticated} = useAuthHook();

    useEffect(() => {
        const fetchShortUrls = async () => {
            try {
                const data = await getShortPagedData(currentPage + 1, itemsPerPage);
                setShortUrls(data.items);
                setTotalCount(data.totalCount);
            } catch (err) {
                console.error("Error fetching short URLs", err);
            }
        };
        fetchShortUrls();
    }, [currentPage, refreshData]);

    return (
        <div className="short-urls-page">
            <Typography variant="h4" gutterBottom align="center" style={{marginBottom: '20px'}}>
                Short URLs
            </Typography>

            {isAuthenticated && (
                <AddNewUrlComponent fetchData={() => {
                    setRefreshData(prevState => !prevState)
                }}/>
            )}

            <UrlTableComponent shortUrls={shortUrls} totalCount={totalCount} fetchData={() => {
                setRefreshData(prevState => !prevState)
            }}/>

            <div className="pagination-container"
                 style={{display: 'flex', justifyContent: 'center', marginTop: '20px'}}>
                <ReactPaginate
                    previousLabel={"<"}
                    nextLabel={">"}
                    pageCount={Math.ceil(totalCount / itemsPerPage)}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={3}
                    onPageChange={(selected) => setCurrentPage(selected.selected)}
                    containerClassName={"pagination"}
                    activeClassName={"active"}
                />
            </div>
        </div>
    );
};

export default ShortUrlsPage;
