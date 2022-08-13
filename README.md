# minecraft-downloader-core
A minecraft downloader written in node.js

# What is this?
It is an automated downloader for minecraft. Currently only works for vanilla mc and release versions. Snapshots, fabric and forge compatibility will follow soon.

# How to use it?
First download the package from the releases section. Open terminal/cmd in the download directory, where the file is present.

Unzip the package and type npm install and wait for the process to finish.


Run node question.js which will ask you to enter the version number(for example 1.19) and type, which will be either "release" or "snapshot" (cave sensitive).
Works only for release now.

The script will log the inputs and then close.
After that run node main.js to update the configurations.

The other parts of the downloader are in the components folder.

The general order would be to run app.js>mc_downloader.js>libraries.js>assets.js

Following this order will generate a .minecraft folder containing all required files

Some parts of the downloader (like assets.js) have been purposely slowed down to prevent process hanging and that all files are downloaded in the correct order.



# Features
Works on Windows and Linux as well.

Has an inbuilt file checker to check file integrity of assets after download.
