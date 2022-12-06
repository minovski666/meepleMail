const ThankYouModal = ({setIsOpenThankYouModal, close}: { setIsOpenThankYouModal: any, close: any }) => {

    return (
        <div className="source-modal">
            <div className="delete-source">
                <div>
                    <p>Thank you for subscribing</p>
                    <ul>
                        <li>
                            <button onClick={close}>Close</button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
export default ThankYouModal;