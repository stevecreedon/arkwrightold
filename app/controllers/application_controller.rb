class ApplicationController < ActionController::Base
  protect_from_forgery
  
  before_filter :shop
   
  def shop
    
  end
  
  
end
