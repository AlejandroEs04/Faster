import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';
import useShop from '../hooks/useShop';

const PayPal = ({total}) => {
    const { createOrderPaypal, addPurchase } = useShop();

    const getInfo = async() => {
        const id = await createOrderPaypal(total);
        return id;
    }

    return (
        <PayPalScriptProvider
            options={{
                clientId: import.meta.env.VITE_PUBLIC_PAYPAL_CLIENT_ID, 
                currency: 'MXN'
            }}
        >
            <PayPalButtons 
                createOrder={async() => {
                    return await getInfo();
                }}

                onApprove={async(data, actions) => {
                    await addPurchase(total, data.orderID)
                }}

                onCancel={async(data) => {
                    
                }}
                forceReRender={[total]}
            />
        </PayPalScriptProvider>
    )
}

export default PayPal