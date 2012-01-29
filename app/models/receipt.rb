class Receipt
   include Ripple::EmbeddedDocument
   
   property :testcase, Boolean,
   property :authorization, Integer
   
end