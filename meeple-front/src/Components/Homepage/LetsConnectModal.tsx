import React, {useState} from "react";
import axios from "axios";

const LetsConnectModal = ({setIsOpen, close}: { setIsOpen: any, close: any }) => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [comment, setComment] = useState('')
    const [isValid, setIsValid] = useState('')
    const [valStatus, setValStatus] = useState('')
    const [valStatusIcon, setValStatusIcon] = useState('')
    const url: any = process.env.REACT_APP_API_URL !== undefined ? process.env.REACT_APP_API_URL : '';

    const getName = (event: any) => {
        setName(event.target.value)
    }
    const getEmail = (event: any) => {
        setEmail(event.target.value)
    }
    const getComment = (event: any) => {
        setComment(event.target.value)
    }

    const send = () => {
        if (name !== '' && (email !== '' && email.includes('@')) && comment !== '') {
            axios.post(url + 'contacts', {
                name: name,
                email: email,
                comment: comment,
                isBug: false
            }).then((response) => {
                if (response.status === 200) {
                    setValStatus('validation-message connect no-heading success')
                    setValStatusIcon('fas fa-check')
                    setIsValid('You have successfully contacted us!')
                }
            })
        } else {
            setValStatus('validation-message connect no-heading error')
            setValStatusIcon('fas fa-warning')
            setIsValid('Please fill email and comment.')
        }
    }


    return (
        <div onClick={close}>
            <div className="connect-modal">
                <div onClick={e => e.stopPropagation()}>
                    <h2>Let's Connect</h2>
                    <p>Are you an active content creator? Drop us a message and let's connect.</p>
                    <button className="connect-modal-close" onClick={close}><span className="icon-cancel"></span>
                    </button>
                    {isValid &&
                        <div className={valStatus}>
                            <span><i className={valStatusIcon}></i></span>
                            <p>{isValid}</p>
                        </div>
                    }
                    <div>
                        <div className="connect-form-group">
                            <label htmlFor="name">Name</label>
                            <input type="text" onChange={getName}/>
                        </div>
                        <div className="connect-form-group">
                            <label htmlFor="email">Email</label>
                            <input type="text" onChange={getEmail}/>
                        </div>
                        <div className="connect-form-group">
                            <label htmlFor="comment">Comment</label>
                            <textarea name="comment" id="comment" cols={30} rows={10} onChange={getComment}></textarea>
                        </div>
                        <div className="connect-form-group">
                            <button className="connect-send-btn" onClick={send}>Send</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default LetsConnectModal;