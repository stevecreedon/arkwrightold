class Shop
  include Ripple::Document
  
  many :customers
  
  property :name, String
  
  def self.find_or_create(name)
    shop = Shop.find(name)
    shop = Shop.create(:name => name) unless shop
    shop
  end
    
  def key
    self.name
  end
  
end