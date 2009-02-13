class Comment < ActiveRecord::Base

  belongs_to :user
  belongs_to :parent, :polymorphic => true

  # I *do not* have any idea why Time.now wasn't working (I assume it was a time-zone thing), but this works:
  named_scope :visible, lambda { { :conditions => ['visible_at <= ?', 0.seconds.from_now] } }

  before_create :set_visible_at

  validates_presence_of :body

  attr_accessor :vetted_by

  def visible?
    return false if visible_at.nil?
    return visible_at <= Time.now
  end

  # the description or name of the parent item (i.e. the name of the species or description of the object)
  def parent_name
    return_name=self.parent_type
    case self.parent_type
     when 'TaxonConcept' then 
        tc=TaxonConcept.find_by_id(self.parent_id)
        return_name=tc.name unless tc.blank?
     when 'DataObject' then
        d=DataObject.find_by_id(self.parent_id)
        return_name=d.description unless d.blank?
    end
    return return_name
  end

  # the image url being commented on, if it's an image
  def parent_image_url
    return_url=''
    case self.parent_type
     when 'DataObject' then
        d=DataObject.find_by_id(self.parent_id)
        return_url=d.smart_thumb if d.image?
    end
    return return_url    
  end

  # the url of the parent object (taxon concept or data object)
  def parent_url
    return_url=''
    case self.parent_type
     when 'TaxonConcept' then 
        return_url="/pages/#{self.parent_id}"
     when 'DataObject' then
        return_url="/data_objects/#{self.parent_id}"
    end
    return return_url    
  end
  
  # a friendly version of the parent name (e.g. "Image", "Taxon Concept", etc.)
  def parent_type_name
    return_name=''
    case self.parent_type
     when 'TaxonConcept' then 
        return_name='Taxon concept'
     when 'DataObject' then
        d=DataObject.find_by_id(self.parent_id)
        return_name=d.data_type.label unless d.blank?
    end
    return return_name
  end
  
  def is_curatable_by? user
    user.can_curate? parent
  end

  def show! user = nil
    self.vetted_by = user if user
    self.update_attribute :visible_at, Time.now unless visible_at
  end

  def hide! user = nil
    self.vetted_by = user if user
    self.update_attribute :visible_at, nil
  end

  # aliases to satisfy curation
  alias vetted? visible?
  alias vet!    show!
  alias unvet!  hide!

  def self.per_page
    10
  end

protected

  def set_visible_at
    self.visible_at ||= Time.now
  end

end

# == Schema Info
# Schema version: 20081002192244
#
# Table name: comments
#
#  id          :integer(4)      not null, primary key
#  parent_id   :integer(4)      not null
#  user_id     :integer(4)
#  body        :text            not null
#  parent_type :string(255)     not null
#  created_at  :datetime
#  updated_at  :datetime
#  visible_at  :datetime
# == Schema Info
# Schema version: 20081020144900
#
# Table name: comments
#
#  id          :integer(4)      not null, primary key
#  parent_id   :integer(4)      not null
#  user_id     :integer(4)
#  body        :text            not null
#  parent_type :string(255)     not null
#  created_at  :datetime
#  updated_at  :datetime
#  visible_at  :datetime

