require 'savon'
module Clearbooks
  class Customer
   
    def all
      Clearbooks.client.request :list_entities do
        soap.for_clearbooks!
        soap.body = {
          :type => "customer"
        }
      end
      
    end
    
    def create(customer)
      respopnse = Clearbooks.client.request :create_entity do
        soap.for_clearbooks!
        soap.body = {:entity => {:customer => {}}, :attributes! => {:entity => {
                                                              :company_name => 'private customer',
                                                              :contact_name => customer.name, 
                                                              :email => customer.email, 
                                                              :external_id => customer.shopify_id}}
                    }                                                    
      end
    end
    
  end
end