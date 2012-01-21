class SuppliersController < ApplicationController
  
  def create
    puts params.inspect
    render :nothing => true
  end
  
end