<?php
require_once 'jwt_helper.php';

class Auth
{    
    private $token;
    private $payload;
    private $bearer = null;
    private $request_headers;

    public function __construct($request_headers)
    {  
        $this->request_headers = $request_headers;       
        $this->getBearer($this->request_headers); 
    }
    
    protected function getBearer($key = null)
    {           
        if (isset($key['Authorization'])) {
            
            $auth_header = $key['Authorization'];  

            if ($auth_header
                &&
                preg_match('#Bearer\s(\S+)#', $auth_header, $matches)) {
                $this->bearer = $matches[1];
            }            
        }else{
            echo json_encode(['message'=>'ไม่มีตัวแปร Authorization']); exit;
        }
    }

    public function verify($token, $secret_key)
    {       
        try {               
            $this->payload =  JWT::decode($token, $secret_key);   
            return true;               
        } catch (Exception $e) {
            http_response_code(401);
            echo json_encode(array(
                "message" => "Access denied.",
                "error" => $e->getMessage(),
            ));   
        }
    }

    public function getToken()
    {
        return $this->bearer;
    }

    public function getPayload(){
        return $this->payload;
    }
}
