const buttonElement = document.querySelector("#button");
const videoElement = document.querySelector("#video");

// Prompt to select media stream, pass to video element, then play
(async function selectMediaStream() {
    try {
        //we are waiting to assign screen or window. which will be done by the user 
        const mediaStream = await navigator.mediaDevices.getDisplayMedia();

        // we are passing the media stream as src object
        videoElement.srcObject = mediaStream;

        // when video loaded its metadata then its call a function which plays the video
        videoElement.onloadedmetadata = () => {
            videoElement.play();
        }
    } catch (error) {
        console.log(" error ==> ", error);
    }
})()

buttonElement.addEventListener('click', async () => {
    try {
        buttonElement.disable = true;

        // Start Picture In Picture
        await videoElement.requestPictureInPicture();

        buttonElement.disable = false;
    } catch (error) {
        console.log(" error ==> ", error);
    }
});


