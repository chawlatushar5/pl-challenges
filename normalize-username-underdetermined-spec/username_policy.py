"""
Username normalization policy (source of truth - the brief's examples
alone don't disambiguate every case, this module documents the actual
rule the auth team signed off on):

1. Lowercase everything.
2. Replace runs of one or more whitespace characters with a single dot.
3. Strip apostrophes and hyphens entirely (do not replace with anything -
   "O'Brien" -> "obrien", "Mary-Jane" -> "maryjane").
4. Strip any leading/trailing dots left over after the above.
5. Truncate to a maximum of 20 characters after all the above steps.
"""
