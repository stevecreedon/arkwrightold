class Order
  include Ripple::Document
  
  many :tax_lines
  many :line_items
  many :payment_details
  many :shipping_lines
  one :shipping_address, :class_name => "Address"
  one :billing_address, :class_name => "Address"
  many :note_attributes
  one :customer
  many :fulfillments
  many :discount_codes
  
  property :number, Integer
  property :name, String
  property :total_discounts, Float
  property :created_at, Time
  property :browser_ip, String
  property :cancel_reason, String
  property :updated_at, Time
  property :total_price, Float
  property :token, String
  property :landing_site_ref, String
  property :taxes_included, Boolean
  property :landing_site, String
  property :id, Integer
  property :cancelled_at, Time
  property :order_number, Integer
  property :total_line_items_price, Float
  property :referring_site, String
  property :subtotal_price, Float
  property :note, String
  property :gateway, String
  property :fulfillment_status, String
  property :financial_status, String
  property :currency, String
  property :closed_at, Time
  property :buyer_accepts_marketing, Boolean
  property :total_tax, Float
  property :total_weight, Integer
  property :email, String
    
  def key
    id
  end  
  
end