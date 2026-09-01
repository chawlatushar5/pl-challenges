from enum import Enum


class OrderStatus(str, Enum):
    COMPLETED = "completed"
    CANCELLED = "cancelled"
    REFUNDED = "refunded"


# Only COMPLETED orders represent realized revenue for accounting purposes.
# CANCELLED and REFUNDED orders must never be included in a revenue total,
# even though they still exist as rows in the data (finance needs them for
# the cancellation/refund-rate reports elsewhere).
