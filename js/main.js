//init SpeechSynth API
const synth =window.speechSynthesis;

//DOM Elements 
const textform =document.querySelector('form');
const textInput =document.querySelector('#text-input');
const voiceSelect =document.querySelector('#voice-select');
const rate =document.querySelector('#rate');
const rateValue =document.querySelector('#rate-value');
const pitch =document.querySelector('#pitch');
const pitchValue =document.querySelector('#pitch-value');
const body=document.querySelector('body');

// init voice array
let voices=[];

const getVoices = () =>{
    voices = synth.getVoices();
    //LOOP Thorugh voices and create option for all
    voices.forEach(voice =>{
        //create option for element 
        const option  = document.createElement('option');
        // fill option with voices and language 
        option.textContent=voice.name + '(' + voice.lang + ')';
        option.setAttribute('data-lang',voice.lang);
        option.setAttribute('data-name',voice.name);
        // to see option tag : console.log(option)
        // to append the child (option tag  ) in the select tag (voiceSelect)
        voiceSelect.appendChild(option);
    });
}



getVoices();
if (synth.onvoiceschanged!==undefined){
    synth.onvoiceschanged=getVoices;
}
console.log(voiceSelect);

//speak 
const speak = () =>{
    console.log(voiceSelect.selectedOptions[0]);
//check if speaking 
if(synth.speaking ){
    synth.cancel();
    console.error('Already speaking...');
    return;
}

if (textInput.value===""){
    window.alert("Atleast Write Something Fucker!!");
}
if (textInput.value!==''){

    body.style.background="#141414 url('img/wave.gif')";
    body.style.backgroundRepeat='repeat-x ';
    body.style.backgroundSize="100% 100%";
    // Get Speak Text 
    const speakText = new SpeechSynthesisUtterance(textInput.value);
    //speak end
    speakText.onend = e =>{
        console.log('Done speaking');
        body.style.background="#141414";
  }

  //speak error 
  speakText.onerror = e =>{
      console.error('Something went wrong');
      
    }
    // Selected voice 
    const  selectedVoice = voiceSelect.selectedOptions[0].getAttribute('data-name');
   
    //  loop through the voices 
    voices.forEach(voice=>{
        if (voice.name===selectedVoice){
            speakText.voice=voice;
        }
    });
   
    
    //set pitch and rate 
    speakText.rate = rate.value;
    speakText.pitch=pitch.value;
    //speak bcz everything is ready now
    synth.speak(speakText);

 }
}

//EVENT lISTENER

//Text Form Submit when user hits the submit button
textform.addEventListener('submit',e=>{
    e.preventDefault();
    speak();
    textInput.blur();
});

//changing the rateValue on screen to the value by user 
rate.addEventListener('change',e=>rateValue.textContent=rate.value);

//changing the pitchValue on screen to the value by user 
pitch.addEventListener('change',e=>pitchValue.textContent=pitch.value);

//voice select change
voiceSelect.addEventListener('change',e=>speak());