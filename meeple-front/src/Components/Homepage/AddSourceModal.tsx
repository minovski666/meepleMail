import dicetower from "../../assets/images/dicetower.png";
import React, {useContext, useEffect, useState} from "react";
import axios from "axios";
import {myContext} from "../../Context";

const AddSourceModal = ({
                            setIsOpen,
                            close,
                            getSource,
                            addedSources
                        }: { setIsOpen: any, close: any, getSource: any, addedSources: any }) => {

    const [sources, setSources] = useState([{id: -1, name: '', description: '', image: '', link: '', provider: ''}])
    const url: any = process.env.REACT_APP_API_URL + 'source/' !== undefined ? process.env.REACT_APP_API_URL + 'source/' : '';
    const userObject = useContext<any>(myContext);
    const [freeSub, setFreeSub] = useState(false)

    const getSources = () => {
        axios.get(url).then(response => {
            if (response.data) {
                if (addedSources.length === 0 || addedSources[0].id === -1) {
                    setSources(response.data)
                } else {
                    const difference = response.data.filter((ar: any) => !addedSources.find((rm: any) => (rm.id === ar.id)))
                    setSources(difference)
                }
            }
        })
    }

    const deleteSourceFromArray = (sourceId: any) => {
        if (userObject.subscriptions.length !== 0) {
            const newSources = sources.filter((source) => source.id !== sourceId);
            setSources(newSources)
        } else {
            const newSources = sources.filter((source) => source.id !== sourceId && sources.length <= 1);
            setSources(newSources)
            setFreeSub(true)
        }

    }

    useEffect(() => {
        getSources()
    }, []);


    return (
        <div onClick={close}>
            <div className="source-modal">
                <div className="pick-source" onClick={e => e.stopPropagation()}>
                    <div>
                        <button className="source-modal-close" onClick={close}><span className="icon-cancel"></span>
                        </button>
                        <span>Pick a Source</span>
                        <p>Choose the sources you want to be included in your newsletter</p>
                        <div>
                            <ul>
                                {
                                    sources.map((source) => (
                                        <li key={source.id} onClick={() => deleteSourceFromArray(source.id)}>
                                            <button>
                                                <div onClick={() => {
                                                    getSource(source);
                                                }}>
                                                    <img className="source-image" src={source.image ? source.image : ''}
                                                         alt={source.name}/>
                                                    <span>{source.name}</span>
                                                    <p>{source.description}</p>
                                                </div>
                                            </button>
                                        </li>
                                    ))
                                }
                            </ul>
                            {sources.length === 0 && !freeSub &&
                                <span className="more-sources-info"><i className="fas fa-info-circle"></i> Stay tuned! More sources coming soon.</span>
                            }
                            {freeSub &&
                                <span className="more-sources-info"><i className="fas fa-info-circle"></i> Only one source for free subscription.</span>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default AddSourceModal;