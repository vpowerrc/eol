# This is the "long" method, using PHP, to reindex a taxon page, and is not allowed if there are too many
# descendants.
class TaxonConceptReindexing

  attr_reader :taxon_concept

  def initialize(taxon_concept, options)
    @taxon_concept = taxon_concept
    @allow_large_tree = options[:allow_large_tree]
    @flatten = options[:flatten]
  end

  # TODO - do we want a more generic name for methods, here? :call, :invoke, :run, :go ? ...I'll decide later.
  def reindex
    @taxon_concept.disallow_large_curations unless @allow_large_tree # NOTE: this can raise an exception.
    @taxon_concept.lock_classifications
    CodeBridge.reindex_taxon_concept(@taxon_concept.id, :flatten => @flatten)
  end

end