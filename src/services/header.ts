const headersMultipartFormNoToken = {
    'Content-Type': 'multipart/form-data',
};

const headersMultipartFormWithToken = (token: string) => ({
    'Content-Type': 'multipart/form-data',
    'Authorization': `Bearer ${token}`,
});

const headersNoToken = {
    'Content-Type': 'application/json',
}

const headersWithToken = (token: string) => ({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
});

export { headersMultipartFormNoToken, headersMultipartFormWithToken, headersNoToken, headersWithToken };