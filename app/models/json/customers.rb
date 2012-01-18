module Json
  module Customers
   
   def self.index(customers)
     {:customers => customers}
   end
   
   def self.show(customer)
     {:customer => customer.robject.data}
   end   
    
  end
end