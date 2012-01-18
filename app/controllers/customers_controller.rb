class CustomersController < ApplicationController
  
  def index
    data = Customer.all.collect do |c|
      {:name => "#{c.first_name} #{c.last_name}", :email => c.email, :created => c.created_at}
    end
    render :json => Json::Customers.index(data)
  end
  
  def show
    customer = Customer.find(params[:id].gsub("_","."))
    render :json => Json::Customers.show(customer)
  end
  
end
