import os
import base64
random_bytes = os.urandom(32)
priv_key = base64.urlsafe_b64encode(random_bytes).decode('utf-8').rstrip('=')
print("PrivateKey:", priv_key)
