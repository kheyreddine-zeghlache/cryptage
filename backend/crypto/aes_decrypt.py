from Crypto.Cipher import AES
from Crypto.Util.Padding import unpad
import base64
import json
import sys

def decrypt_aes(encrypted_data_b64, key_b64):
    try:
        key = base64.b64decode(key_b64)
        encrypted_data = base64.b64decode(encrypted_data_b64)
       
        # Extraire l'IV (premiers 16 bytes)
        iv = encrypted_data[:16]
        ciphertext = encrypted_data[16:]
       
        cipher = AES.new(key, AES.MODE_CBC, iv)
        plaintext = unpad(cipher.decrypt(ciphertext), AES.block_size).decode('utf-8')
       
        return {"decrypted": plaintext}
    except Exception as e:
        return {"error": str(e)}

if __name__ == "__main__":
    encrypted_data = sys.argv[1]
    key = sys.argv[2]
    result = decrypt_aes(encrypted_data, key)
    print(json.dumps(result))