# Median of K Sorted Arrays

Implement `find_median_sorted_arrays(arrays)` in `solution.py`, where
`arrays` is a list of two or more integer arrays, each already sorted in
ascending order (any individual array may be empty, lengths may differ).
Return the median of every value across all of them combined.

Examples:
- `find_median_sorted_arrays([[1, 3], [2]])` -> `2`
- `find_median_sorted_arrays([[1, 2], [3, 4]])` -> `2.5`
- `find_median_sorted_arrays([[1, 3], [2], [9, 15]])` -> `3`

## Constraint

Must run in **O(k * log(n) * log(V))** time, where k is the number of
arrays, n is the size of the largest array, and V is the value range.
Concatenating everything and sorting, or merging every array end to end,
touches every element and will not pass the hidden tests.