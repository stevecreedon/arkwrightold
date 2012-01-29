class ShippingLine
  include Ripple::EmbeddedDocument
  
  property :price, Float
  property :code, String
  property :title, String
  property :source, String
  
end