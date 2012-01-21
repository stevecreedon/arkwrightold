class CustomersController < ApplicationController
  
  def index
    data = Customer.all.collect do |c|
      {:name => "#{c.first_name} #{c.last_name}", 
      :email => c.email, 
      :created => c.created_at, 
      :orders_count => c.orders_count,
      :total_spent => c.total_spent}
    end
    render :json => Json::Customers.index(data)
  end
  
  def show
    puts "finding #{params[:id].gsub("_DOT_",".")}"
    customer = Customer.find(params[:id].gsub("_DOT_","."))
    render :json => Json::Customers.show(customer)
  end
  
end
