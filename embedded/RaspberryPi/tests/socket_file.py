import requests

mp3 = requests.get("http://192.168.30.209:3000/file/ETA.mp3")

goToServer = requests.post("http://192.168.30.209:3000/file")

open("sample.mp3", "wb").write(mp3.content)

# files = {"file": open("output.txt", "rb")}
# r = requests.post("http://192.168.30.209:3000/file/", files=files)
