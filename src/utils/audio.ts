/**
 * Web Audio API synthesizer for serene chime sounds, level-up fanfares,
 * timer notifications, and calming background spa soundscapes.
 */

let audioCtx: AudioContext | null = null;
let ambientOsc1: OscillatorNode | null = null;
let ambientOsc2: OscillatorNode | null = null;
let ambientNoise: AudioNode | null = null;
let ambientGain: GainNode | null = null;
let isAmbientPlaying = false;
let currentAmbientType: 'bowl' | 'rain' | 'waves' | 'om' = 'bowl';
let ambientVolume = 0.3;

function getAudioContext(): AudioContext {
  if (!audioCtx) {
    const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    audioCtx = new AudioCtxClass();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export function playSound(freq: number, duration: number, type: OscillatorType = 'sine', gainVal: number = 0.12) {
  try {
    const ctx = getAudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    
    gain.gain.setValueAtTime(gainVal, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.start();
    osc.stop(ctx.currentTime + duration);
  } catch {
    // Graceful fallback
  }
}

export function playClickSound() {
  playSound(720, 0.06, 'sine', 0.08);
}

export function playStartGameSound() {
  const ctx = getAudioContext();
  const now = ctx.currentTime;
  
  // Magical uplifting chord sequence for game start
  const notes = [
    { freq: 440, time: 0, dur: 0.18, type: 'sine' as OscillatorType },
    { freq: 554.37, time: 0.08, dur: 0.18, type: 'triangle' as OscillatorType },
    { freq: 659.25, time: 0.16, dur: 0.22, type: 'sine' as OscillatorType },
    { freq: 880, time: 0.24, dur: 0.35, type: 'triangle' as OscillatorType },
    { freq: 1108.73, time: 0.32, dur: 0.5, type: 'sine' as OscillatorType }
  ];

  notes.forEach(({ freq, time, dur, type }) => {
    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, now + time);
      gain.gain.setValueAtTime(0.14, now + time);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + time + dur);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + time);
      osc.stop(now + time + dur);
    } catch {}
  });
}

export function playSuccessSound() {
  const ctx = getAudioContext();
  const now = ctx.currentTime;
  
  // Harmonic C Major chord chime (C5, E5, G5, C6)
  const notes = [523.25, 659.25, 783.99, 1046.50];
  notes.forEach((freq, idx) => {
    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now + idx * 0.09);
      gain.gain.setValueAtTime(0.1, now + idx * 0.09);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.09 + 0.45);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + idx * 0.09);
      osc.stop(now + idx * 0.09 + 0.45);
    } catch {}
  });
}

export function playLevelUpSound() {
  const ctx = getAudioContext();
  const now = ctx.currentTime;
  
  // Celebratory ascending fanfare with rich harmonic overtone
  const notes = [
    { freq: 440.0, time: 0.0, dur: 0.15 },
    { freq: 554.37, time: 0.12, dur: 0.15 },
    { freq: 659.25, time: 0.24, dur: 0.2 },
    { freq: 880.0, time: 0.38, dur: 0.6 }
  ];

  notes.forEach(({ freq, time, dur }) => {
    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + time);
      gain.gain.setValueAtTime(0.15, now + time);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + time + dur);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + time);
      osc.stop(now + time + dur);
    } catch {}
  });
}

export function playTimerFinishChime() {
  const ctx = getAudioContext();
  const now = ctx.currentTime;
  
  // Singing bowl bell resonance
  [432, 864, 1296].forEach((freq, i) => {
    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = i === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(freq, now);
      gain.gain.setValueAtTime(0.18 / (i + 1), now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.5);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 2.5);
    } catch {}
  });
}

export function triggerHaptic(duration = 100) {
  try {
    if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      navigator.vibrate(duration);
    }
  } catch {}
}

// Ambient relaxation sound engine using Web Audio API synthesis
export function startAmbientSound(type: 'bowl' | 'rain' | 'waves' | 'om' = 'bowl', volume = 0.25) {
  stopAmbientSound();
  currentAmbientType = type;
  ambientVolume = volume;
  
  try {
    const ctx = getAudioContext();
    ambientGain = ctx.createGain();
    ambientGain.gain.setValueAtTime(volume * 0.4, ctx.currentTime);
    ambientGain.connect(ctx.destination);

    if (type === 'bowl' || type === 'om') {
      const baseFreq = type === 'bowl' ? 108 : 136.1; // 136.1 Hz = Om frequency
      ambientOsc1 = ctx.createOscillator();
      ambientOsc2 = ctx.createOscillator();
      
      ambientOsc1.type = 'sine';
      ambientOsc1.frequency.setValueAtTime(baseFreq, ctx.currentTime);

      ambientOsc2.type = 'sine';
      ambientOsc2.frequency.setValueAtTime(baseFreq * 2.01, ctx.currentTime); // gentle binaural beat

      const oscGain1 = ctx.createGain();
      const oscGain2 = ctx.createGain();
      oscGain1.gain.value = 0.6;
      oscGain2.gain.value = 0.2;

      ambientOsc1.connect(oscGain1);
      ambientOsc2.connect(oscGain2);
      oscGain1.connect(ambientGain);
      oscGain2.connect(ambientGain);

      ambientOsc1.start();
      ambientOsc2.start();
    } else if (type === 'rain' || type === 'waves') {
      // White/Pink noise buffer
      const bufferSize = ctx.sampleRate * 2;
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      let b0 = 0, b1 = 0, b2 = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        output[i] = (b0 + b1 + b2) * 0.15;
      }

      const whiteNoise = ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;
      whiteNoise.loop = true;

      // Lowpass filter for smooth rainfall or wave feeling
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.value = type === 'rain' ? 900 : 450;

      whiteNoise.connect(filter);
      filter.connect(ambientGain);
      whiteNoise.start();
      ambientNoise = whiteNoise;
    }

    isAmbientPlaying = true;
  } catch {
    isAmbientPlaying = false;
  }
}

export function stopAmbientSound() {
  try {
    if (ambientOsc1) {
      ambientOsc1.stop();
      ambientOsc1.disconnect();
      ambientOsc1 = null;
    }
    if (ambientOsc2) {
      ambientOsc2.stop();
      ambientOsc2.disconnect();
      ambientOsc2 = null;
    }
    if (ambientNoise && 'stop' in ambientNoise) {
      (ambientNoise as AudioBufferSourceNode).stop();
      ambientNoise.disconnect();
      ambientNoise = null;
    }
    if (ambientGain) {
      ambientGain.disconnect();
      ambientGain = null;
    }
  } catch {}
  isAmbientPlaying = false;
}

export function setAmbientSoundVolume(volume: number) {
  ambientVolume = volume;
  if (ambientGain && audioCtx) {
    try {
      ambientGain.gain.setValueAtTime(volume * 0.4, audioCtx.currentTime);
    } catch {}
  }
}

export function getAmbientStatus() {
  return {
    isPlaying: isAmbientPlaying,
    type: currentAmbientType,
    volume: ambientVolume
  };
}
