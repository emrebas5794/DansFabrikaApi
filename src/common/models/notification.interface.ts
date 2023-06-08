
export interface SMS {
    phone: string,
    message: string
}

export interface Email {
    email: string,
    message: string,
    title: string
}

export interface BulkEmail {
    emails: string[],
    message: string,
    title: string
}