import React, { useEffect } from 'react';
import { useMercadopago } from 'react-sdk-mercadopago';

export default function Checkout() {
    const mercadopago = useMercadopago.v2('APP_USR-165fdfe6-9bcd-4c1b-be42-662ee2a3aca4', {
        locale: 'es-AR'
    });

    useEffect(() => {
        if (mercadopago) {
            mercadopago.checkout({
                preference: {
                    items: [{
                        "title":"endocrinología",
                        "unit_price":800,
                        "quantity":10
                      }]
                },
                render: {
                    container: '.cho-container',
                    label: 'Pay',
                }
            })
        }
    }, [mercadopago])

    return (
        <div>
            <div class="cho-container" />   
        </div>
    )
}