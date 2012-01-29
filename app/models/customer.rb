class Customer
  include Ripple::Document
  
  many :addresses
  
  property :accepts_marketing, Boolean
  property :orders_count, Integer
  property :created_at, Time
  property :updated_at, Time
  property :id, Integer
  property :tags, String
  property :note, String
  property :last_name, String
  property :total_spent, Float
  property :state, String
  property :first_name, String
  property :email, String
  
  def key
    self.id
  end
  
  
  # def self.by_name
  #     Riak::MapReduce.new(client).add('customers').map("Ripple.filterByConditions",
  #                           :arg => {:email => {"~=" => "hotmail"}})
  #   end
  #   
  #   def self.client
  #     Thread.current[:ripple_client] ||= Riak::Client.new
  #   end
  #   
  #   def self.client_config
  #     Ripple.config
  #   end
  
end