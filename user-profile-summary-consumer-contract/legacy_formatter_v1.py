# Old formatter from the v1 API - superseded by api_response_formatter.py
# after the mobile rewrite. Kept around for reference only; nothing
# imports this anymore.
def format_profile_response_v1(summary):
    return {
        "display_name": summary["display_name"],
        "email": summary["email"],
        "account_age_days": summary["account_age_days"],
    }
