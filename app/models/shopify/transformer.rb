module Shopify
  class Transformer
   
    attr_accessor :clazz, :shopify_object, :associations, :ripple_class
   
    def initialize(shopify_object, ripple_class=nil)
      self.shopify_object = shopify_object
      self.ripple_class = _ripple_class unless ripple_class
      self.ripple_class = ripple_class if ripple_class
    end
    
    def _ripple_class
      self.shopify_object.class.name.split("::").last.constantize
    end
    
    def object
      @object ||= ripple_class.new
    end
    
    def to_ripple
      ripple_class.associations.each do |key, value|
        associate(value)
      end
      
      object.attributes = shopify_object.attributes
      object
    end
    
    def associate(association)
      child_shopify_objects = shopify_object.attributes.delete(association.name.to_sym)
      return unless child_shopify_objects
      
      if child_shopify_objects.is_a?(Array)
        child_shopify_objects.each do |child_shopify_object|
          object.send(association.name.to_sym) << child(child_shopify_object, association)
        end
      else
        object.send("#{association.name}=".to_sym, child(child_shopify_objects, association))
      end
      
      
    end
    
    def child(child_shopify_object, association)
      return Transformer.new(child_shopify_object, association.klass).to_ripple if association.embeddable?
      return association.klass.find(child_shopify_object.id)
    end
    
    
    
  end
end
