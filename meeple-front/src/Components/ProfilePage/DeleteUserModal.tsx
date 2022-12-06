const DeleteUserModal = ({setIsOpenDeleteModal, close, confirm}: { setIsOpenDeleteModal: any, close: any, confirm:any }) => {
    return (
        <div className="source-modal">
            <div className="delete-source">
                <div>
                    <p>Are you sure you want to delete your account?</p>
                    <p>After you delete your account you won't be able to login again.</p>
                    <ul>
                        <li>
                            <button onClick={close}>Cancel</button>
                        </li>
                        <li>
                            <button className="source-delete-btn" onClick={() => confirm(true)}>Delete</button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
export default DeleteUserModal;