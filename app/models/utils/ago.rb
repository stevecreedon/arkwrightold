module Utils
  class Ago
    
    REG = /last_(\d+)_(\w+)/
    
    SECONDS = {'minutes' => 60, 'minute' => 60, 'hours' => 60 * 60, 'hour' => 60 * 60, 'days' => 24 * 60 * 60, 'day' => 24 * 60 * 60, 'weeks' => 7 * 24 * 60 * 60, 'week' => 7 * 24 * 60 * 60}
  
    
    def parse(mefod)
      mefod = mefod.to_s if mefod.is_a?(Symbol)
      return nil unless mefod =~ REG
      return nil unless ['weeks','week','days','day','hours','hour','minutes','minute'].include?($2.downcase)
      $1.to_i * SECONDS[$2]
    end
    
  end
end