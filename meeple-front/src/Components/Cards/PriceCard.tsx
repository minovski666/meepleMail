import info from "../../assets/images/info.svg";
import React from "react";

const PriceCard = ({price,handleSubscription}: any) => {
    const dynamicDescription = () => {
        if (price.nickname === 'MONTHLY') {
            return 'nekoj deskripson so dobivas so mesecen paket'
        } else if (price.nickname === 'ANNUALY') {
            return 'nekoj deskripson so dobivas so godisen paket'
        }
    }


    return (
        <div className="brief-info-tile">
            <div>
                <img src={info} alt="Welcome to MeeplEmail"/>
                <h3>{price.nickname}</h3>
                <p> {(price.unit_amount / 100).toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD"
                })}</p>
                <p>{dynamicDescription()}</p>


                        <button
                            onClick={(e) => handleSubscription(e,price)}>
                            Sign Up
                        </button>

            </div>
        </div>
    )
}

export default PriceCard;