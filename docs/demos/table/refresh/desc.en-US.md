### Refresh Table

When Table component is placed inside some initially hidden element, and will display lazily, the width may not be calculated correctly.

At this time, you need to call the `refresh` method of the Table instance to recalculate the layout after the element is displayed.
