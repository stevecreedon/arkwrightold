class Image
  include Ripple::EmbeddedDocument

  property :position, Integer
  property :created_at, Time
  property :product_id, Integer
  property :updated_at, Time
  property :src, String
  property :id, Integer

end