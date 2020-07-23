import {environment  } from '../environments/environment';
    
export const AppURL = {
    Login:      'login',    
    Register:   'register',   
    Sendjob:    'sendjob', 
    Authen:     'authentication'
};

export const BackendURL = environment.api_url;

//export const BackendURL = "http://localhost/help-desk-api/index.php?r=/api";

//export const BackendURL = "http://192.168.231.222/help-desk-api/backend/index.php?r=/api"; 

//  ng build --prod --base-href /help-desk-api/