class Shop
  include Ripple::Document
  
  many :customers
  many :products
  many :orders
  
  property :name, String
  
  def self.find_or_create(name)
    shop = Shop.find(name)
    shop = Shop.create(:name => name) unless shop
    shop
  end
  
  def clear
    customers.each{|c| c.destroy}
    products.each{|p| p.destroy}
    orders.each{|o| o.destroy}
  end
    
  def key
    self.name
  end
  
end