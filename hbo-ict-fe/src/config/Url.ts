const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

export const URLS = {
    API_ENDPOINT,
    DOCS: `${API_ENDPOINT}/docs`,
    PDF_FILE: `${API_ENDPOINT}/storage/pdf/hboi_domeinbeschrijving_2023_nl.pdf`,
    EXCEL_SHEET: `${API_ENDPOINT}/storage/excel/DB23_kubus_NL.xlsx`,
    JSON: `${API_ENDPOINT}/api/descriptions?grouping=architecture_layers,activities,levels`
};
