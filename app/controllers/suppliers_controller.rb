class SuppliersController < ApplicationController
  
  def index
    data = Supplier.all.collect do |s|
      {:name => s.name, 
      :email => s.email, 
      :www => s.www, 
      :telephone => s.telephone,
      :contact => s.contact}
    end
    render :json => Json::Suppliers.index(data)
  end
  
  def show
    
  end
  
  def create
    supplier  = Supplier.create!(params[:supplier])
    render :json => Json::Sencha::OK
  end
  
end