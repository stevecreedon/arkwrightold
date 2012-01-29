class PaymentDetail
   include Ripple::EmbeddedDocument
   property :credit_card_number, String
   property :credit_card_company, String   
end