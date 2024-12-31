import { useContext, useEffect } from 'react';
import { StoreContext } from '../../context/StoreContext';
import { PayPalButton } from "react-paypal-button-v2";

const PayPalIntegration = () => {
    const { getTotalCartAmount } = useContext(StoreContext)
    return (
        <div>
            <PayPalButton
                amount={getTotalCartAmount() + 2}
                onSuccess={(details, data) => {
                    // Handle successful payment here
                    console.log(details.status);  // completed
                    console.log(data);
                }}
            />
        </div>
    );
};




export default PayPalIntegration;
