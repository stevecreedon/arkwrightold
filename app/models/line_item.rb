class LineItem
   include Ripple::EmbeddedDocument
   
      
    property :name, String
    property :price, Float
    property :product_id, Integer
    property :quantity, Integer
    property :requires_shipping, String
    property :title, String
    property :id, Integer
    property :grams, Integer
    property :sku, String
    property :fulfillment_status, String
    property :variant_title, String
    property :vendor, String
    property :fulfillment_service, String
    property :variant_id, Integer
    
    def product
      Product.find(product_id)
    end
    
    def key
      self.id
    end
end