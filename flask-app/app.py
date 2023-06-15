import os
import hashlib
import hmac
import base64
from flask import Flask, request, jsonify

app = Flask(__name__)

WEBHOOKS_SECRET = os.environ.get("WEBHOOKS_SECRET")
PORT = os.environ.get("PORT") or 3000
HEVO_USER_AGENT = "HevoWebhookEvent"


# Use this authenticator to validate hevo Webhooks
def authenticate(view_func):
    def wrapper(*args, **kwargs):
        if not WEBHOOKS_SECRET:
            return view_func(*args, **kwargs)

        user_agent = request.headers.get("User-Agent")
        if user_agent != HEVO_USER_AGENT:
            return jsonify({"error": "Unauthorized request"}), 401

        received_signature = request.headers.get("hmac-signature")
        if not received_signature:
            return jsonify({"error": "Unauthorized request"}), 401

        computed_signature = base64.b64encode(hmac.new(
            WEBHOOKS_SECRET.encode("utf-8"),
            request.get_data(),
            hashlib.sha256
        ).digest())

        if not hmac.compare_digest(received_signature.encode("utf-8"), computed_signature):
            return jsonify({"error": "wrong signature"}), 401

        return view_func(*args, **kwargs)

    wrapper.__name__ = view_func.__name__
    return wrapper


@app.route("/webhook-token", methods=["POST"])
@authenticate
def webhook_token():
    print(request.get_json())
    return jsonify({"message": "Authenticated successfully!"})


if __name__ == "__main__":
    app.run(debug=True, port = PORT)