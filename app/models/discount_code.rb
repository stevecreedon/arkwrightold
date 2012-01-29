class DiscountCode
   include Ripple::EmbeddedDocument
   
   property :code, String
   property :amount, Float
   
end