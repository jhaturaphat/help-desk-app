import {environment  } from '../environments/environment';
    
export const AppURL = {
    Login:      'login',    
    Register:   'register',   
    Sendjob:    'sendjob', 
    Authen:     'authentication'
};

export const BackendURL = environment.api_url;

//  ng build --prod --base-href /help-desk-api/