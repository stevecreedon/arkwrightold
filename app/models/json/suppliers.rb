module Json
  module Suppliers
   
   def self.index(suppliers)
     {:suppliers => suppliers}
   end
   
   def self.show(supplier)
     {:supplier => supplier.robject.data}
   end   
    
  end
end