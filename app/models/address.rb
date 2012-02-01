class Address
   include Ripple::EmbeddedDocument
   
   embedded_in :order
    
   property :name, String
   property :first_name, String
   property :last_name, String
   property :company, String
   
   property :address1, String
   property :address2, String
   property :city, String
   property :zip, String
   property :province, String
   property :province_code, String
   property :country, String
   property :country_code, String
   
   property :default, Boolean
   property :id, Integer
   
   property :phone, String
end