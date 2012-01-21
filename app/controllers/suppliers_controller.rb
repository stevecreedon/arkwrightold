class SuppliersController < ApplicationController
  
  def index
    data = Supplier.all.collect do |s|
      {:name => s.name, 
      :email => s.email, 
      :www => s.www, 
      :telephone => s.telephone,
      :contact => s.contact,
      :key => s.key}
    end
    render :json => Json::Suppliers.index(data)
  end
  
  def show
     supplier = Supplier.find(params[:id])
     render :json => Json::Suppliers.show(supplier)
   end
  
  def create
    supplier  = Supplier.create!(
                                  :name => params[:name], 
                                  :email => params[:email], 
                                  :www => params[:www],
                                  :contact => params[:contact],
                                  :telephone => params[:telephone]
                                )
    render :json => Json::Sencha::OK
  end
  
end