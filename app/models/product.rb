class Product
  include Ripple::Document
  
  many :variants
  many :images
 
  property :product_type, String
  property :handle, String
  property :created_at, Time
  property :body_html, String
  property :title, String
  property :template_suffix, String
  property :updated_at, Time
  property :id, Integer
  property :tags, String
  property :vendor, String
  property :published_at, Time
  property :options, Array
  
  def key
    id
  end

  
end