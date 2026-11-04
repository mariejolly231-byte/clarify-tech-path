# QR code du formulaire en ligne, pour la slide « Remplir la grille »
# Usage : python3 grille-audit/qr.py "https://forms.gle/..."
import sys
import qrcode
img = qrcode.make(sys.argv[1], box_size=12, border=1, error_correction=qrcode.constants.ERROR_CORRECT_M)
img.save("src/images/qr-grille.png")
print("QR code enregistré dans src/images/qr-grille.png")
