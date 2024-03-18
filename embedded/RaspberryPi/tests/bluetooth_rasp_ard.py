from embedded.RaspberryPi.src.bluetooth import *

socket = BluetoothSocket( RFCOMM)
socket.connect(("00:19:10:08:58:70", 1))
print("bluetooth connected!")

msg = input("send message : ")
socket.send(msg)


print("finished")
socket.close()