# The Chicago Machine

![the-chicago-machine](/the-chicago-machine.png)

This projects holds the source code for [@gnarmis](https://twitter.com/gnarmis) and [@lukeshepard](https://twitter.com/lukeshepard)'s robot for Robot Riot
January 2019 in Chicago.

- [System Design](#system-design) –– the full system
- [Website](#website) –– Next.js + Firebase
- [Raspberry Pi](#raspberrypi) –– custom "taunting" scripts + Twitch.tv streaming

## System Design

![system-design](/system_design.png)
![prototype](/prototype.jpeg)

Regular whiteboards and the SketchPaper iOS app were great tools, along with
just meeting regularly. We went through a lot of sketches, prototypes, and video
updates of individual explorations.

This was our first real build, so we made paper and cardboard prototypes, bought
servos and basic batteries, stayed at 6 volts for electronics, went to physical
stores and talked to vendors for advice, and figured out what worked and what
didn't. I even checked out the Chicago Public Library's Maker Lab, which
provides very accessible 3D printing for like \$1 per 30 min job –– along with
educational resources. Also, fried some components and boards lol.

Some things we learned:

- Simpler is better. We decided to do basic RC for motion control and raspberry
  pi for the fancy features like video streaming. This was super helpful when
  the raspberry pi's WiFi-based control mechanisms started flaking out because
  of various WiFi/cell hotspot issues.
- Grip, speed, basic design: these factors will make the difference.
- https://www.servocity.com/actobotics is awesome. Wish we'd found it sooner.
- Explore, test, explore some more. Our final design was built within a day of
  the competition –– maybe too close but in the meantime we'd figured out how
  much time we'd need and were a lot more confident in what we could build (by building again and again, often from scratch).

## Website

![website](/website.png)

The website is a small webapp where we hooked up a Twitch.tv stream coming from the robot, along with some crowd-pleasing voting functionality.

I chose to use Next.js and Google Firebase, both somewhat new to me. I wanted
rapid prototyping and minimal fuss. There two tools ended up being perfect! It
was a bonus to find already existing third party packages that made it even
easier to integrate Firebase with React code.

The two main pages and what they demonstrate (stuff you can cannibalize for your
own prototyping, in other words):

- Root/index page: a Twitch.tv stream with some realtime voting buttons
  - How to consume Firestore data in a realtime way, using some community packages
  - How to create Firestore data on a button click
- Soundboard page: a kludgey audio file upload and playback page that we abandoned
  - How to do basic Google oAuth Sign In using Firebase with minimal custom UI/logic work.
  - How to use Firebase Storage (like Amazon S3)
  - **NOTE:** did you know there's no API to get back download URLs???!!! I had to make a collection in Firestore just to store download URLs!

Caveats:

- There are some edge cases with configuring the firebase library on page load
  more than once. I think the Soundboard page in particular has some issues for
  sure, though it allows sign ins, uploads, and playback.
- The Firestore rules we have to control who can do what are very basic. Consult
  Firebase docs to figure out how to properly handle them.

## RaspberryPi

Our RaspberryPi 3 B+ didn't directly control the servos –– we used a separate RC
controller with a received board that was hooked up to power and servos.

The code here enabled Twitch.tv streaming, and bootup and taunting sounds. After
a bit of exploration, implementing these as systemd services ended up being the
most practical solution: predictably launching on boot, and starting/stopping really easily on the fly.

Some of the related files have been provided. See `./bootstrap.sh` to see a
portion of the setup we did.

Some things we learned:

- Make sure to update the password, I did that on first launch
- With an ethernet cable, you can do headless SSH
- The hostname of a computer plus `.local` will resolve to that computer in the
  local network. No need to hunt for IP addresses. Also, a good reason to define
  a custom hostname. Ours was `the-chicago-machine.local` for eg.
- If you supply a properly configured `wpa_supplicant.conf` in the SD card's
  boot drive in the root directory after burning raspbian OS on it, the
  raspberry pi will automatically configure itself with those WiFi settings and
  connect to that WiFi network. Here's my config minus the password:

        country=US
        ctrl_interface=DIR=/var/run/wpa_supplicant GROUP=netdev
        update_config=1

        network={
            ssid="A Momentary Lapse Of Sanity"
            psk="the_password"
            key_mgmt=WPA-PSK
        }

- rpi ships with RealVNC already. Enable it with `raspi-config` and then connect
  with a VNC client. You'll get a full graphical desktop this way.
- `vcgencmd get_camera` to determine if camera is supported or detected.
  `raspi-config` to enable camera and reboot. `raspistill -o test.png` to test
  camera capture.
- You can force audio to come out of the audio jack with `raspi-config`
- That @#$@#$!! camera ribbon cable is the worst. But workable.
- Know how to forget a WiFi network on Debian!
