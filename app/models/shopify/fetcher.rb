require 'shopify_api'
require 'riak'
module Shopify
  class Fetcher
    
    attr_accessor :shopify_class, :shop_name
    
    def initialize(shop_name, shopify_class)
      self.shop_name = shop_name
      self.shopify_class = shopify_class
    end
    
    def shop
      @shop ||= Shop.find_or_create(shop_name)
    end
    
    def all
      count = 1
      while (objects = api.find(:all, :params => {:page => count, :status => 'any'})).size > 0 do
        objects.each do |shopify_object|
          object = Shopify::Transformer.new(shopify_object).to_ripple
          object.save!
          shop.send(shopify_class.to_s.pluralize.to_sym) << object
        end
        count += 1
      end
      
      shop.save
    end
       
    def api
      ::ShopifyAPI::Base.site = ::Shopify::Utils.site
      "::ShopifyAPI::#{shopify_class.to_s.camelize}".constantize
    end
    
  end
end