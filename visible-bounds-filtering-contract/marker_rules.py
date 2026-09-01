# Precision (decimal places) used to detect duplicate marker locations -
# GPS input for this feed is only reliable to 4 decimal places (about 11
# meters), so two points rounding to the same (lat, lon) at this precision
# represent the same physical marker, not two distinct ones.
DUPLICATE_PRECISION = 4

# Featured marker ids that must be drawn last, so they render on top of
# any overlapping regular markers (SVG stacks elements in document order -
# whatever is added last draws on top).
FEATURED_IDS = {"vip-1", "vip-2"}
