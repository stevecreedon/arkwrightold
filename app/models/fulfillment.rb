class Fulfillment
   include Ripple::EmbeddedDocument
   
   many :order_items
   one :receipt
   
   
   property :created_at, Time
   property :tracking_company, String
   property :order_id, Integer
   property :updated_at, Time
   property :id, Integer
   property :tracking_number, Integer
   property :status, String
   
end