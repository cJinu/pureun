from embedded.RaspberryPi.src.bluetooth import *

socket = BluetoothSocket( RFCOMM)

socket.connect(("00:19:10:08:58:70", 1))
print("bluetooth connected")

while True:
    data=socket.recv(1024)
    print("Received:", data)
    if(data=="q"):
        print("Quit")
        break
    
    
socket.close()