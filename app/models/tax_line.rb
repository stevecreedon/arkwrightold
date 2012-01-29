class TaxLine
   include Ripple::EmbeddedDocument
   
    property :price, Float
    property :title, String
    property :rate, Float
   
end