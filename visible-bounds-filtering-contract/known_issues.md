# Known Issues

## #482 - Off-map marker looked like it was on the map

A support ticket came in: a customer clicked a marker that appeared right
at the edge of the map and expected it to be a location within the visible
area. It wasn't - the underlying point was actually several miles outside
the map's bounds, but the marker rendered right at the boundary anyway and
looked like a normal, valid marker.

Root cause: the point-projection code doesn't check whether a point falls
inside the visible map area before handing its coordinates to the
renderer, so an out-of-bounds point's coordinates get silently pushed to
whatever value the linear projection produces, including values right at
(or just past) the canvas edge.

Status: needs a fix in the next map-marker-related change.
