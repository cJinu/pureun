import subprocess

def get_serial_number():
    command = "cat /proc/cpuinfo | grep Serial | cut -d ' ' -f 2"
    serial_number = subprocess.check_output(command, shell=True).decode().strip()
    return serial_number

if __name__ == '__main__':
    serial_number = get_serial_number()
    print("Raspberry Pi Serial Number:", serial_number)
