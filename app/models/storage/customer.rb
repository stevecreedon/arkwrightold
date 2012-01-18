module Storage
  class Customer
  
    def client
      @client ||= Riak::Client.new
    end
    
    def bucket
      @bucket ||= client.bucket('customers')
    end
  
    def store(shopify_customer)
      rc = Riak::RObject.new(bucket, shopify_customer.email)
      rc.data = shopify_customer
      rc.content_type = 'application/json'
      rc.store
    end
    
    def customers_by_name
      Riak::MapReduce.new(Riak::Client.new)
      .add('customers')
      .map('Riak.mapValuesJson')
      .reduce('Riak.reduceSort', :keep => true)
      .run
    end
  
  end
end