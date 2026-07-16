const BASE_URL = "http://localhost:5454/api/v1.0";
const apiEndPoints = {
    FETCH_FILES: `${BASE_URL}/files/my`,
    GET_CREDITS: `${BASE_URL}/users/credits`,
    FILE_UPLOAD: `${BASE_URL}/files/upload`,
    TOGGLE_FILE: (id) => `${BASE_URL}/files/${id}/toggle-public`,
    DOWNLOAD_FILE: (id) => `${BASE_URL}/files/download/${id}`,
    DELETE_FILE: (id) => `${BASE_URL}/files/delete/${id}`,
    FETCH_USER_CREDITS: `${BASE_URL}/users/credits`,
    CREATE_ORDER: `${BASE_URL}/payments/create-order`,
    VERIFY_PAYMENT: `${BASE_URL}/payments/verify-payment`,
    TRANSACTIONS: `${BASE_URL}/transactions`,
    PUBLIC_FILE_VIEW: (fileId) => `${BASE_URL}/files/public/${fileId}`,
    TRANSACTION_BY_ID: (id) => `${BASE_URL}/transactions/${id}`,



}
export default apiEndPoints;