import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "../../app/forms/Button";
import { urlBrand } from "../../app/layout/endpoints";
import customConfirm from "../../app/utils/customConfirm";
import GenericList from "../../app/utils/GenericList";
import Pagination from "../../app/utils/Pagination";
import RecordsPerPageSelect from "../../app/utils/RecordsPerPageSelect";
import { brandDto } from "./brand.model";

export default function IndexBrand() {
    const [brand, setBrand] = useState<brandDto[]>();
    const [totalAmountOfPages, setTotalAmountOfPages] = useState(0);
    const [recordsPerPage, setRecordsPerPage] = useState(10);
    const [page, setPage] = useState(1);

    useEffect(() => {
        loadData();
    }, [page, recordsPerPage])

    function loadData() {
        axios.get(urlBrand, {
            params: {page, recordsPerPage}
        })
            .then((response: AxiosResponse<brandDto[]>) => {
               const totalAmountOfRecords = parseInt(response.headers['totalAmountOfRecords'], 10);
               setTotalAmountOfPages(Math.ceil(totalAmountOfRecords / recordsPerPage));
               setBrand(response.data);
            })
    }

    async function deleteBrand(id: number) {
        try{
            await axios.delete(`${urlBrand}/${id}`);
            loadData();
        } 
        catch(error: any) {
            if(error && error.response) {
                console.log(error(error.response.data));
            }
        }
    }

    return (
        <>
             <h3>Brand</h3>
            <Link to="/brand/create" className="btn btn-primary" >Create Brand</Link>

            <RecordsPerPageSelect onChange={amountOfRecords => {
                setPage(1);
                setRecordsPerPage(amountOfRecords)
            }}/>

            <Pagination currentPage={page} totalAmountOfPages={totalAmountOfPages}
                onChange={newPage => setPage(newPage)} />

            <GenericList list={brand}>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                        </tr>                       
                    </thead>
                    <tbody>
                        {brand?.map(brand => 
                            <tr key={brand.id}>
                                <td>
                                    <Link className="btn btn-success" to={`/brand/edit/${brand.id}`}>Edit</Link>

                                    <Button 
                                    onClick={() => customConfirm(() => deleteBrand(brand.id))}
                                    className="btn btn-danger">Delete</Button>
                                </td>

                                <td>
                                    {brand.name}
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </GenericList>
        </>
    )
}