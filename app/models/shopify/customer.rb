require 'shopify_api'
require 'riak'
module Shopify
  class Customer
    
    def all_for_shop(name)
      
      shop = Shop.find_or_create(name)
      
      count = 1
      
      while (customers = api.find(:all, :params => {:page => count})).size > 0 do
        customers.each do |shopify_customer|
          addresses = shopify_customer.attributes.delete(:addresses)
          customer = ::Customer.new(shopify_customer.attributes)
          addresses.each do |address|
            customer.addresses << ::Address.new(address.attributes)
          end
          customer.save
          shop.customers << customer
        end
        count += 1
      end
      
      shop.save
      
    end
      
    def api
      ::ShopifyAPI::Base.site = ::Shopify::Utils.site
      ::ShopifyAPI::Customer
    end
    
  end
end