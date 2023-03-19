import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "../../app/forms/Button";
import { urlTypes } from "../../app/layout/endpoints";
import customConfirm from "../../app/utils/customConfirm";
import GenericList from "../../app/utils/GenericList";
import Pagination from "../../app/utils/Pagination";
import RecordsPerPageSelect from "../../app/utils/RecordsPerPageSelect";
import { typesDto  } from "./types.model";

export default function IndexTypes() {
    const [types, setTypes] = useState<typesDto[]>();
    const [totalAmountOfPages, setTotalAmountOfPages] = useState(0);
    const [recordsPerPage, setRecordsPerPage] = useState(10);
    const [page, setPage] = useState(1);

    useEffect(() => {
        loadData();
    }, [page, recordsPerPage])

    function loadData() {
        axios.get(urlTypes, {
            params: {page, recordsPerPage}
        })
            .then((response: AxiosResponse<typesDto[]>) => {
               const totalAmountOfRecords = parseInt(response.headers['totalamountofrecords'], 10);
               setTotalAmountOfPages(Math.ceil(totalAmountOfRecords / recordsPerPage));
               setTypes(response.data);
            })
    }

    async function deleteTypes(id: number) {
        try{
            await axios.delete(`${urlTypes}/${id}`);
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
             <h3>Types</h3>
            <Link className="btn btn-primary" to="/types/create">Create Types</Link>

            <RecordsPerPageSelect onChange={amountOfRecords => {
                setPage(1);
                setRecordsPerPage(amountOfRecords)
            }}/>

            <Pagination currentPage={page} totalAmountOfPages={totalAmountOfPages}
                onChange={newPage => setPage(newPage)} />

            <GenericList list={types}>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                        </tr>                       
                    </thead>
                    <tbody>
                        {types?.map(type => 
                            <tr key={type.id}>
                                <td>
                                    <Link className="btn btn-success" to={`/types/edit/${type.id}`}>Edit</Link>

                                    <Button 
                                    onClick={() => customConfirm(() => deleteTypes(type.id))}
                                    className="btn btn-danger">Delete</Button>
                                </td>

                                <td>
                                    {type.name}
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </GenericList>
        </>
    )
}