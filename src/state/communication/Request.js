// Import from Config
// -------------------------------------
import { AppConfig } from './../../config/app.config';

// Import from Files
// -------------------------------------
import { FetchRequest } from './FetchRequest';
import { AxiosRequest } from './AxiosRequest';

const extendClass = AppConfig.axiosEnabled ? AxiosRequest : FetchRequest;

class Request extends extendClass {}


export { Request };