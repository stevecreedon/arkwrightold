class Variant
  include Ripple::EmbeddedDocument
    
  property :position, Integer
  property :price, Float
  property :created_at, Time
  property :requires_shipping, Boolean
  property :title, String
  property :inventory_quantity, Integer
  property :compare_at_price, Float
  property :inventory_policy, String
  property :updated_at, Time
  property :inventory_management, String
  property :id, Integer
  property :taxable, Boolean
  property :grams, Integer
  property :sku, String
  property :option1, String
  property :fulfillment_service, String
  property :option2, String
  property :option3, String
end
  