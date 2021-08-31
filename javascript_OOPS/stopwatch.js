//Stopwatch object
// members
// duration(prop)
// reset,start,stop(method)
// rules
// cannot call start or stop twice in a row
// start(); -> start() should give an error
// stop(); -> stop() should give an error
// reset(); reset the duration counted to 0
// duration() should tell the time lapsed between the start and stop were called
// make sure the user cannot directly change the duration directly so make directly private

function Stopwatch(){
  let duration = 0;
  let isRunning;
  let startTime,endTime =0;
  this.start = () =>{
    if(isRunning){
      throw new Error('Stopwatch is already running');
    }
    isRunning = true;
    startTime = new Date();

  };
  this.stop = () =>{
    if(!isRunning){
      throw new Error('Stopwatch is already stopped');
    }
    isRunning=false;
    endTime = new Date();
    // 1s=1000ms so 1ms=1/1000 s
    const seconds = (endTime.getTime()-startTime.getTime())/1000;
    duration += seconds;

  };
  this.reset = () => {
    startTime,endTime=null;
    isRunning=false;
    duration = 0;
    console.log('Stopwatch was reset to 0');
  };
  Object.defineProperty(this,'duration',{
    get:() => {
      return duration;
    }
  });
}

// enter these in browser when you open index.html
// const sw = new StopWatch();
// sw.start();
// sw.stop();
// sw.duration();
// sw.reset();
