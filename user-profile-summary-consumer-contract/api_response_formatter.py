# Formats a profile summary for the mobile client's existing /profile
# response shape - already deployed, the mobile app parses these exact
# key names.
def format_profile_response(summary):
    return {
        "displayName": summary["displayName"],
        "emailAddress": summary["emailAddress"],
        "accountAgeDays": summary["accountAgeDays"],
    }
