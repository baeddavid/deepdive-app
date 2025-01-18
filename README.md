# deepdive-app

This is the frontend of DeepDive.

## overview

much of the architecture is explained in deepdive-server's [README](https://github.com/bkdevs/deepdive-server)

the front-end is pretty simple.
* it's built in React, styled with Antd and tailwind
* each session created has a websocket connection per to the backend (see the .env.development for the two URLs)
* the editors map to the viz spec object created in JSON pretty directly, which we dump from the python definition and validate against here to have some semblance of strict typing
* most of the logic is pretty straightforward with the exception of [viz response](https://github.com/bkdevs/deepdive-app/blob/main/src/components/viz/viz_response.js) which does ome magic 

