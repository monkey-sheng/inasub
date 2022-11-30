# Inasub

The WIP app is [here](https://monkey-sheng.github.io/inasub/) at GitHub pages.

#### What is it?

Inasub stands for It’s Not AegiSUB, the “de facto” software used by hobbyist subtitle translators. Cross platform support has not been great, and barely maintained (sadly, the [official site](http://aegisub.org/) has been down for a long while now). Inasub wants to be just as useful and trustworthy as Aegisub, while improving on various functionalities and QoL features. ***It is still being actively developed!***

#### How does Inasub do it?

It relies on two core modules for rendering, libass (compiled into wasm to run in the browser) for subtitles, and the customizable waveform renderer, wavesurfer.

Behind the scenes, there is a parser for .ass subtitle files, a module powering all the editing features, a module for syncing video, audio and subtitles, a module responsible for managing storage IO within a browser context, and finally of course, the front end rendering - this is where everything else gets weaved, and is currently being worked on.