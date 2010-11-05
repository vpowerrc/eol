module EOL

  class CommonNameDisplay

    attr_accessor :name_id
    attr_accessor :name_string
    attr_accessor :iso_639_1
    attr_accessor :language_label
    attr_accessor :language_name
    attr_accessor :language_id
    # TODO - change references to agent_id to curator_agent_id (or something like that)
    attr_accessor :sources
    attr_accessor :synonym_id
    attr_accessor :source_he_id
    attr_accessor :preferred
    # TODO - stop using hierarchy_id on this model; it could come from two different hierarchies.
    attr_accessor :trusted
    attr_accessor :duplicate
    attr_accessor :duplicate_with_curator
 
    # NOTE - this uses TaxonConceptNames, not Synonyms.  For now, that's because TCN is a denormlized version of Synonyms.
    def self.find_by_taxon_concept_id(tc_id)
      names = Name.find_by_sql([%q{
        SELECT names.id name_id, names.string name_string,
               l.label language_label, l.name language_name, l.id language_id, l.iso_639_1,
               tcn.synonym_id synonym_id, tcn.preferred preferred, tcn.source_hierarchy_entry_id source_he_id
        FROM taxon_concept_names tcn
          JOIN names ON (tcn.name_id = names.id)
          LEFT JOIN languages l ON (tcn.language_id = l.id)
        WHERE tcn.taxon_concept_id = ? AND vern = 1
      }, tc_id])
      names.map {|n| EOL::CommonNameDisplay.new(n)}.sort
    end

    def initialize(name)
      @name_id        = name[:name_id].to_i
      @name_string    = name[:name_string]
      @iso_639_1      = name[:iso_639_1]
      @language_label = name[:language_label] || Language.unknown.label
      @language_name  = name[:language_name]
      @language_id    = name[:language_id].to_i
      @synonym_id     = name[:synonym_id].to_i
      @source_he_id   = name[:source_he_id].to_i
      @preferred      = name[:preferred].class == String ? name[:preferred].to_i > 0 : name[:preferred]
      @trusted        = in_curator_hierarchy?
      @sources        = get_sources
      @duplicate      = false
      @duplicate_with_curator = false
    end

    alias :id :name_id
    alias :string :name_string

    def in_curator_hierarchy?
      in_hierarchy = false
      in_hierarchy = true if !@hierarchy_id.blank? && @hierarchy_id == Hierarchy.eol_contributors.id
      return in_hierarchy
    end

    def get_sources
      sources = Agent.find_by_sql([%q{
        SELECT a1.*
        FROM hierarchy_entries he
          JOIN hierarchies h ON (he.hierarchy_id = h.id)
          JOIN agents a1 ON (h.agent_id = a1.id)
        WHERE he.id = ?
        UNION
        SELECT a2.*
        FROM synonyms syn
          JOIN agents_synonyms agsyn ON (syn.id = agsyn.synonym_id)
          JOIN agents a2 ON (agsyn.agent_id = a2.id)
        WHERE syn.id = ?
      }, @source_he_id, @synonym_id])
      # This is *kind of* a hack.  Long, long ago, we kinda mangled our data by converting a bunch of uBio names without
      # giving the TCNs source he ids (or synonyms).  I'm actually kinda-sorta okay with this; if someone else develops a
      # system to add TCNs in a similar manner, this allows them to specify a default common name source, which could just be
      # an "empty" agent with a display name like "Source unknown".  :)
      if sources.blank?
        sources << Agent.find($AGENT_ID_OF_DEFAULT_COMMON_NAME_SOURCE) rescue nil
      end
      sources
    end

    # Sort by language label first, then by name, then by source.
    def <=>(other)
      if self.language_label == other.language_label
        self.name_string <=> self.name_string # Note this is reversed; higher ratings are better.
      else
        self.language_label.to_s <=> other.language_label.to_s
      end
    end

  end

end
