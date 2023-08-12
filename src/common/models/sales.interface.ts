
export interface Item {
    name: string;
    price: number;
    quantity: number;
    description: string;
}

export interface Invoice {
    merchant_key: string;
    invoice_id: string;
    total?: number;
    items?: string;
    currency_code: string;
    cc_holder_name: string;
    cc_no: string;
    expiry_month: string;
    expiry_year: string;
    cvv: string;
    installments_number: string;
    invoice_description: string;
    cancel_url: string;
    return_url: string;
    authorization: string;
    hash_key?: string;
    name: string;
    surname: string;
    bill_address1?: string;
    bill_address2?: string;
    bill_city?: string;
    bill_postcode?: string;
    bill_state?: string;
    bill_country?: string;
    bill_phone?: string;
    bill_email?: string;
    sale_web_hook_key?: string;
}



export interface SipayCredentials {
    is_3d: number,
    merchantKey: string,
    appKey: string,
    appSecret: string,
    merchantId: string,
    apiUrl: string
}