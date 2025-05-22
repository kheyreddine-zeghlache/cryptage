from Crypto.Cipher import AES
from Crypto.Util.Padding import pad, unpad
from Crypto.Random import get_random_bytes
import base64
import json

def encrypt_aes(plaintext):
    # Générer une clé aléatoire de 32 bytes (AES-256)
    key = get_random_bytes(32)
    # Générer un IV aléatoire de 16 bytes
    iv = get_random_bytes(16)
   
    cipher = AES.new(key, AES.MODE_CBC, iv)
    ciphertext = cipher.encrypt(pad(plaintext.encode('utf-8'), AES.block_size))
   
    # Combiner IV + ciphertext et encoder en base64
    encrypted_data = iv + ciphertext
    encrypted_data_b64 = base64.b64encode(encrypted_data).decode('utf-8')
   
    # Encoder la clé en base64 pour la stocker
    key_b64 = base64.b64encode(key).decode('utf-8')
   
    return {
        "encrypted": encrypted_data_b64,
        "key": key_b64
    }

if __name__ == "__main__":
    import sys
    text = sys.argv[1]
    result = encrypt_aes(text)
    print(json.dumps(result))