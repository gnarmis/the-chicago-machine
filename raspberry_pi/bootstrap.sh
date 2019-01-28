#!/bin/bash

# install dependencies
sudo apt-get update
sudo apt-get install -y libav-tools espeak

# move streaming command to PATH
cp ./twstream /home/pi/twstream
cp ./start_tw_stream /home/pi/start_tw_stream

# setup systemd service
sudo cp ./twstream.service /lib/systemd/system/twstream.service
# set the service to start on boot
sudo systemctl enable twstream.service

# setup ngrok auth and config
#mkdir ~/.ngrok2
#cp ./ngrok.yml ~/.ngrok2/ngrok.yml

# setup the port forwarder for port 8080 to chicagomachine.ngrok.io
#sudo cp ./ngrok.service /lib/systemd/system/ngrok.service
#sudo systemctl enable ngrok.service

# move speech in place
cp ./speech /home/pi/speech
# move randomized taunt generator into place too
cp ./taunt /home/pi/taunt

# setup systemd service
sudo cp ./speech.service /lib/systemd/system/speech.service
# set the service to start on boot
sudo systemctl enable speech.service
