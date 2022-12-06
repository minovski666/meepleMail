
const DeleteSourceModal = ({setIsOpenDeleteModal, close, confirm, sourceId}: { setIsOpenDeleteModal: any, close: any, confirm:any, sourceId:any }) => {

    return (
        <div className="source-modal">
            <div className="delete-source">
                <div>
                    <p>Are you sure you want to remove this source?</p>
                    <ul>
                        <li>
                            <button onClick={close}>Cancel</button>
                        </li>
                        <li>
                            <button className="source-delete-btn" onClick={() => confirm(sourceId)}>Remove</button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
export default DeleteSourceModal;