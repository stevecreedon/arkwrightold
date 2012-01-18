module Clearbooks
  def self.client
    client = Savon::Client.new("https://secure.clearbooks.co.uk/api/wsdl/")
  end
end

module Savon
  module SOAP
    class XML
      
      def for_clearbooks!
        self.namespaces["xmlns:cb"] = "https://secure.clearbooks.co.uk/api/soap/"
        self.header = {"cb:authenticate" => "", :attributes! => { "cb:authenticate" => {"apiKey" => "lightartstudiod520f84b76840d2c77"}}}
      end
      
    end
  end
end
