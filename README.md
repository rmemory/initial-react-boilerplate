A basic template to setup a React based project, using Webpack

Note on Linux: you *must* run this to enable hot module replacement:

 echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p
