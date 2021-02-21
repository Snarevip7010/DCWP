#!/usr/bin/env python
 
import socket
import time
 
#Create a UDP socket
socket = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
tello_address = ('192.168.10.1' , 8889)
 
#command-mode : 'command'
