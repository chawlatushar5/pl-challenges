from api_response_formatter import format_profile_response
from solution import get_user_summary


def handle_profile_request(user, as_of):
    summary = get_user_summary(user, as_of)
    return format_profile_response(summary)
