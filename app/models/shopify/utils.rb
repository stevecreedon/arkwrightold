module Shopify
  module Utils
  
    def self.site
      "http://#{SHOPIFY_API_KEY}:#{SHOPIFY_PASSWORD}@#{SHOPIFY_SHOP_NAME}.myshopify.com/admin"
    end
    
  end
end