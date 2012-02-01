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
    
    def underscored
      @object.class.name.underscore
    end
    
    def to_ripple
      ripple_class.associations.each do |key, value|
        associate(value)
      end
      
      object.attributes = shopify_object.attributes
      object
    end
    
    def associate(association)
      child_shopify_objects = [shopify_object.attributes.delete(association.name.to_sym)].flatten.compact
      return if child_shopify_objects.empty?
      
      child_shopify_objects.each do |child_shopify_object|
        link(document(child_shopify_object, association), association)
      end
    end
    
    def link(linked, association)
      object.send(association.name.to_sym) << linked if association.many?
      object.send("#{association.name}=".to_sym, linked) if association.one?
      link_back(linked, association) if association.linked?
    end
    
    def link_back(linked, association)
      reversed = reverse_association(linked, association)
      linked.send(reversed.name) << object if reversed.many?
      linked.send("#{reversed.name}=".to_sym, object) if reversed.one?
    end
    
    def reverse_association(linked, association)
      linked_associations = linked.class.associations
      return linked_associations[underscored] if linked_associations[underscored]
      return linked_associations[underscored.pluralize] if linked_associations[underscored.pluralize]
      raise "cannot find a reverse link association for #{association.inspect} in #{object.class.name}"
    end
    
    def document(child_shopify_object, association)
      return Transformer.new(child_shopify_object, association.klass).to_ripple if association.embeddable?
      return association.klass.find(child_shopify_object.id)
    end
    
  end
end
