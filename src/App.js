import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import stripe from './assets/LedStripev1.png';
import bulb from './assets/Lightbulb1.png';
import bulb2 from './assets/LightBulb2.png';
import stripe2 from './assets/LightStripv2.png';
import { CirclePicker } from 'react-color';
import * as ColorConverter from './color-converter';
import Slider, { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';
import smartplug_on from './assets/smartplug_on.png';
import smartplug_off from './assets/smartplug_off.png'
import bridgegif from './assets/bridgegif.gif'
import general_off from './assets/general.png'
import general_on from './assets/general_on.png'

const Image = (props) => {
  console.log(props);
  const [image, setImage] = useState(props.type1 === 'LCL001'  || props.type1 === 'LST002' || props.type1 === 'LST001' ? stripe2 : (props.type1 === 'LOM001' ? smartplug_off : (props.type1 === 'LWA001' || props.type1 === 'LCT001' || props.type1 === 'LCT007' || props.type1 === 'LCT010' || props.type1 === 'LCT014' || props.type1 === 'LCT015' || props.type1 === 'LCT016' || props.type1 === 'LWB004' || props.type1 === 'LWB006' || props.type1 === 'LWB007' || props.type1 === 'LWB010' || props.type1 === 'LWB014' || props.type1 === 'LTW001' || props.type1 === 'LTW004' || props.type1 === 'LTW010' || props.type1 === 'LTW015'? bulb : general_off)));
  useEffect(() => {
    if (props.type1 == ('LCL001' || 'LST002' || 'LST001') && props.imageState === false) {
      setImage(stripe2);
    } else if (props.type1 == ('LWA001' || 'LCT001' || 'LCT007' || 'LCT010' || 'LCT014' || 'LCT015' || 'LCT016' || 'LWB004' || 'LWB006' || 'LWB007' || 'LWB010' || 'LWB014' || 'LTW001' || 'LTW004' || 'LTW010' || 'LTW015' ) && props.imageState === false) {
      setImage(bulb);
    } else if (props.type1 == ('LWA001' || 'LCT001' || 'LCT007' || 'LCT010' || 'LCT014' || 'LCT015' || 'LCT016' || 'LWB004' || 'LWB006' || 'LWB007' || 'LWB010' || 'LWB014' || 'LTW001' || 'LTW004' || 'LTW010' || 'LTW015' ) && props.imageState === true) {
      setImage(bulb2);
    } else if (props.type1 == ('LCL001' || 'LST002' || 'LST001') && props.imageState === true) {
      setImage(stripe);
    }
    else if (props.type1 == 'LOM001' && props.imageState === true) {
      setImage(smartplug_on)
    }
    else if (props.type1 == 'LOM001' && props.imageState === false) {
      setImage(smartplug_off)
    } 
    else if (props.imageState === false) {
      setImage(general_off)
    }
    else if (props.imageState === true) {
      setImage(general_on)
    }
  }, [props.imageState]);
  return <img className='light-image' src={image} />;
};
const Light = (props) => {
  const [image, setImage] = useState('');
  const [lightDetails, setLightDetails] = useState(100);

  useEffect(() => {
    axios
    .get(
      `${props.url}/lights/${props.number}`
    )
    .then((result) => {
      setLightDetails(result.data.state.bri);
      console.log(result.data.state, '!!!!');
      if(result.data.state.on === true) {
        setImage(true);
      }
    });
  }, [])
  const turnLightOn = (number) => {
    axios
      .put(
        `${props.url}/lights/${props.number}/state`,
        { on: true }
      )
      .then((result) => {
        console.log(result.data);
        setImage(true);
      });
  };
  const turnLightOff = () => {
    axios
      .put(
        `${props.url}/lights/${props.number}/state`,
        { on: false }
      )
      .then((result) => {
        console.log(result.data);
        setImage(false);
      });
  };

  const changeColor = (color, event)=> {
    console.log(color)
    const newcolor = ColorConverter.rgb_to_cie(color.rgb.r, color.rgb.g, color.rgb.b);
    console.log(newcolor)
    const x = newcolor[0].toString();
    const y = newcolor[1].toString();
    axios
    .put(
      `${props.url}/lights/${props.number}/state`,
      { xy: [Number(x.slice(0, 4)), Number(y.slice(0,4)) ] }
    )
    .then((result) => {
      console.log(result.data);
    });
};

  const changeSliderValue = (e) => {
    console.log(e)
    setLightDetails(e)
    axios
    .put(
      `${props.url}/lights/${props.number}/state`,
      { bri: e }
    )
    .then((result) => {
      console.log(result.data);
    });
  }


  return (
    <div className="single-light-item">
      <Image
        type1={props.modelid}
        state={props.state}
        imageState={image}
      ></Image>
      <h2>{props.name}</h2>
      <button onClick={turnLightOn} type='button'>
        {' '}
        ON{' '}
      </button>
      <button onClick={turnLightOff} type='button'>
        {' '}
        OFF{' '}
      </button>
      <div className="tweaker">
        {props.modelid == 'LCL001'? 
        <div>
          <p>Brightness</p>
        <Slider min={1} max={"245"} lightDetails={lightDetails} onChange={changeSliderValue} defaultValue={lightDetails} value={lightDetails} railStyle={{width: '200px'}} trackStyle={{backgroundColor: 'rgba(253, 212, 2, .7)', width: '150px'}} handleStyle={{border: 'transparent 2px solid'}}></Slider>
        <p>Color</p>
        <CirclePicker onChangeComplete={changeColor}></CirclePicker>
        </div> : ( props.modelid == 'LWA001' ? 
        <div>
        <p>Brightness</p>
        <Slider min={1} max={"245"} onChange={changeSliderValue} defaultValue={lightDetails} value={lightDetails} railStyle={{width: '200px'}} trackStyle={{backgroundColor: 'rgba(253, 212, 2, .7)', width: '150px'}} handleStyle={{border: 'transparent 2px solid'}}></Slider>
        </div>: null)
        }
      </div>
    </div>
  );
};

function App() {
  const [lights, setLights] = useState([]);
  const [activeLight, setActiveLight]= useState('');
  const [apiUrl, setApiUrl] = useState(false);
  const [apiUrlValue, setApiUrlValue] = useState('');
  const [showBridgeInstruction, setShowBridgeInstruction] = useState(false);

  useEffect(() => {
    const url = window.localStorage.getItem('bridgeurl');
    if(url) {
      setApiUrl(true);
      setApiUrlValue(url);
      axios
        .get(
          `${url}/lights`
        )
        .then((result) => {
          console.log(result.data);
          var array = Object.keys(result.data).map((key) => [
            Number(key),
            result.data[key]
          ]);
          setLights(array);
          console.log(array);
        });
    }
  }, [apiUrl]);

  const changeLight = (e) => {
    const untrimmed = e.target.getAttribute('data-value')
    if(untrimmed == null) {
      return;
    } else {
    console.log(untrimmed)
    setActiveLight(untrimmed)
    }
  }

  const changeLightOfIconClick = (e) => {
    const parentValue = e.currentTarget.parentNode.getAttribute('data-value');
    setActiveLight(parentValue)
  }

  const findBridge = () => {
    axios.get('https://discovery.meethue.com').then(res => {
      console.log(res.data)
      axios.post(`http://${res.data[0].internalipaddress}/api`, {"devicetype": "Luxhue#desktop luxhue1"}).then(response => {
        console.log(response);
    if(response.data[0].error) {
      console.log(response.data[0])
      setShowBridgeInstruction(true);
    } else if (response.data[0].success) {
      window.localStorage.setItem('bridgeurl', `http://${res.data[0].internalipaddress}/api/${response.data[0].success.username}`);
      setApiUrl(true);
      setShowBridgeInstruction(false);
    }
      })
    })
  }

  return (
    <div className='App'>
      <div className={`${!apiUrl ? "" : "main-container"}`}>
      { apiUrl ?
      <div className="menu-container">
       
        <h4 className="menu-header">Your Lights</h4>
      {lights.map((e)=> {
        return (
          <div className={`menu-item ${activeLight == e[1].name ? 'active-item' : ''}`} data-value={e[1].name} onClick={changeLight}>
            {e[1].modelid == ('LCL001' || 'LST002' || 'LST001') ?           <svg onClick={changeLightOfIconClick} width="32px" height="32px" viewBox="0 0 32 32" version="1.1">
    <g stroke="gray" stroke-width="1" fill="none" fill-rule="evenodd">
        <g fill="#1c1e24">
            <path d="M8.4395,16.668 C8.9795,16.552 9.5115,16.895 9.6285,17.435 C9.7455,17.974 9.4025,18.506 8.8625,18.623 C8.3225,18.74 7.7905,18.397 7.6735,17.857 C7.5565,17.317 7.9005,16.785 8.4395,16.668 M13.3275,15.611 C13.8665,15.495 14.3985,15.838 14.5155,16.377 C14.6325,16.917 14.2895,17.449 13.7505,17.566 C13.2105,17.683 12.6775,17.34 12.5605,16.8 C12.4445,16.261 12.7875,15.729 13.3275,15.611 M18.2135,14.555 C18.7535,14.438 19.2865,14.781 19.4025,15.32 C19.5195,15.86 19.1765,16.393 18.6365,16.51 C18.0965,16.626 17.5645,16.283 17.4485,15.743 C17.3315,15.203 17.6735,14.671 18.2135,14.555 M23.1005,13.498 C23.6405,13.381 24.1725,13.724 24.2905,14.264 C24.4065,14.804 24.0635,15.336 23.5235,15.453 C22.9835,15.569 22.4515,15.227 22.3355,14.687 C22.2175,14.147 22.5615,13.614 23.1005,13.498 M10.6695,20.639 L25.4735,17.444 C26.5535,17.211 27.2405,16.147 27.0065,15.067 C26.4495,12.484 23.9035,10.842 21.3205,11.399 L6.5165,14.594 C5.4365,14.827 4.7505,15.891 4.9835,16.971 C5.5415,19.554 8.0865,21.196 10.6695,20.639 M25,26 C24.447,26 24,25.553 24,25 C24,24.447 24.447,24 25,24 C25.553,24 26,24.447 26,25 C26,25.553 25.553,26 25,26 M20,26 C19.447,26 19,25.553 19,25 C19,24.447 19.447,24 20,24 C20.553,24 21,24.447 21,25 C21,25.553 20.553,26 20,26 M15,26 C14.447,26 14,25.553 14,25 C14,24.447 14.447,24 15,24 C15.553,24 16,24.447 16,25 C16,25.553 15.553,26 15,26 M10,26 C9.447,26 9,25.553 9,25 C9,24.447 9.447,24 10,24 C10.553,24 11,24.447 11,25 C11,25.553 10.553,26 10,26 M27,22 L9,22 C5,22 4,19 4,18 L4,23 C4,25.762 6.238,28 9,28 L27,28 C27.553,28 28,27.553 28,27 L28,23 C28,22.447 27.553,22 27,22 M22,8 C21.447,8 21,7.553 21,7 C21,6.447 21.447,6 22,6 C22.553,6 23,6.447 23,7 C23,7.553 22.553,8 22,8 M17,8 C16.447,8 16,7.553 16,7 C16,6.447 16.447,6 17,6 C17.553,6 18,6.447 18,7 C18,7.553 17.553,8 17,8 M12,8 C11.447,8 11,7.553 11,7 C11,6.447 11.447,6 12,6 C12.553,6 13,6.447 13,7 C13,7.553 12.553,8 12,8 M7,8 C6.447,8 6,7.553 6,7 C6,6.447 6.447,6 7,6 C7.553,6 8,6.447 8,7 C8,7.553 7.553,8 7,8 M23,4 L5,4 C4.447,4 4,4.447 4,5 L4,9 C4,9.553 4.447,10 5,10 L23,10 C27,10 28,13 28,14 L28,9 C28,6.238 25.762,4 23,4"></path>
        </g>
    </g>
</svg>
: (e[1].modelid === 'LOM001' ?
 <svg width="32px" height="32px" viewBox="0 0 32 32" version="1.1">
<g stroke="#1c1e24" stroke-width="1" fill="none" fill-rule="evenodd">
    <g fill="gray">
        <path d="M25,9 L21,9 L21,5 C21,4.447 20.553,4 20,4 C19.447,4 19,4.447 19,5 L19,9 L13,9 L13,5 C13,4.447 12.553,4 12,4 C11.447,4 11,4.447 11,5 L11,9 L7,9 C6.447,9 6,9.447 6,10 C6,10.553 6.447,11 7,11 L8,11 L8,15 C8,18.727 10.552,21.849 14,22.738 L14,26 C14,27.104 14.896,28 16,28 C17.104,28 18,27.104 18,26 L18,22.738 C21.448,21.849 24,18.727 24,15 L24,11 L25,11 C25.553,11 26,10.553 26,10 C26,9.447 25.553,9 25,9"></path>
    </g>
</g>
</svg> : <svg onClick={changeLightOfIconClick} width="32px" height="32px" viewBox="0 0 32 32" version="1.1">
<g stroke="gray" stroke-width="1" fill="none" fill-rule="evenodd">
    <g fill="#1c1e24">
        <path d="M9.5732,13.208 C11.4602,13.805 14.2122,14 16.0002,14 C17.7882,14 20.5402,13.805 22.4272,13.208 C21.6592,15.226 20.3272,16.119 20.0102,18 C19.8722,18.819 19.7552,19.963 19.8332,20.801 C19.8822,21.334 19.4762,21.802 18.9432,21.856 C18.0792,21.945 17.0972,22 16.0002,22 C14.9022,22 13.9212,21.945 13.0562,21.856 C12.5232,21.802 12.1182,21.334 12.1672,20.801 C12.2452,19.963 12.1282,18.819 11.9902,18 C11.6732,16.119 10.3412,15.226 9.5732,13.208 Z M13,22.8623 C14.041,22.9633 15.187,23.0003 16,23.0003 C16.813,23.0003 17.959,22.9633 19,22.8623 L18.499,25.9703 C18.473,26.1883 18.367,26.3903 18.199,26.5433 L17.732,26.9673 C17.701,26.9963 17.672,27.0273 17.645,27.0593 L17.151,27.6423 C16.961,27.8683 16.672,28.0003 16.365,28.0003 L16,28.0003 L15.635,28.0003 C15.328,28.0003 15.039,27.8683 14.849,27.6423 L14.355,27.0593 C14.328,27.0273 14.299,26.9963 14.268,26.9673 L13.801,26.5433 C13.633,26.3903 13.527,26.1883 13.501,25.9703 L13,22.8623 Z M16,4 C19.853,4 23,7.332 23,10.5 C23,10.789 22.945,11.043 22.915,11.305 C22.884,11.561 22.841,11.775 22.788,12.012 C21.698,12.472 19.384,13 16,13 C12.616,13 10.302,12.472 9.212,12.012 C9.159,11.775 9.116,11.561 9.085,11.305 C9.055,11.043 9,10.789 9,10.5 C9,7.332 12.147,4 16,4 Z"></path>
    </g>
</g>
</svg>)  }
  
            {e[1].name}
            </div>
        )
      })}
      </div> : null
}
      <div className="light-info-container">

        
        {
        lights.map((e) => {
          if(e[1].name === activeLight)
          return (
            <Light
              key={e[1].uniqueid}
              number={e[0]}
              name={e[1].name}
              modelid={e[1].modelid}
              state={e[1].state.on}
              url={apiUrlValue}
            ></Light>
          );
        })}
            {!activeLight && apiUrl ? 
           (
            <div>
              <h1>   Congrats!</h1>
              <h1> Your setup is all ready.</h1>
              <h2>You'll find all your connected lights from the panel on left.</h2>
                <h3>Choose a light from left panel to get started.</h3>
              </div>
          ): (!activeLight && localStorage.getItem('ip') === null ? <div>
          {showBridgeInstruction ? <div>
            <img src={bridgegif} className="huebridge-gif" alt="Hue bridge image"/>
          <p>Please press the button on your Philips Hue Bridge.</p>
          <button className="button-fancy" onClick={findBridge}>Okay, already pressed!</button>
          </div>: 
          <div className="absolute-center">
             <h1>   Welcome to</h1>
              <h1> Luxhue! </h1>
              <h2>Let's get started by connecting to your Philips Hue Bridge.</h2>
          <button className="button-fancy" onClick={findBridge}> Connect to your Bridge</button>
          </div>}
          </div>
           : null)}
        </div>
      </div>
    </div>
  );
}

export default App;
