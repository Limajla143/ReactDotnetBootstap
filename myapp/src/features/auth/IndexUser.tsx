import axios from "axios";
import Swal from "sweetalert2";
import {UserDto} from './auth.model';
import { urlAccounts } from "../../app/layout/endpoints";
import IndexEntity from "../../app/utils/IndexEntity";
import Button from "../../app/forms/Button";
import customConfirm from "../../app/utils/customConfirm";

export default function IndexUsers() {

    async function makeAdmin(id: string) {
        await doAdmin(`${urlAccounts}/makeAdmin`, id);
    }

    async function removeAdmin(id: string) {
        await doAdmin(`${urlAccounts}/removeAdmin`, id);
    }

    async function doAdmin(url: string, id: string) {
        await axios.post(url, JSON.stringify(id), {
            headers: {'Content-Type': 'application/json'}
        });

        Swal.fire({
            title: 'Success',
            text: 'Operation finished correctly',
            icon: 'success'
        });
    }

    return(
        <IndexEntity<UserDto>
            title="Users" url={`${urlAccounts}/listUsers`} 
            >
            {users => <>
                <thead>
                    <tr>
                        <th></th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {users?.map(user => <tr key={user.id}>
                        <td>
                            <Button onClick={() => customConfirm(() => makeAdmin(user.id),
                                `Do you wish to make ${user.email} as an admin?`, 'Do it')}>
                                Make Admin</Button>

                              <Button className="btn btn-danger ms-2" 
                                onClick={() => customConfirm(() => removeAdmin(user.id),
                                `Do you wish to remove ${user.email} as an admin?`, 'Do it')}>
                                Remove Admin</Button>
                        </td>
                        <td>{user.email}</td>
                    </tr>)}
                </tbody>
            </>}
        </IndexEntity>
    )
}