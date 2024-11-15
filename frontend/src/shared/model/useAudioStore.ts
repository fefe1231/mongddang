import { create } from 'zustand';

type AudioInfo = {
  audioRef: HTMLAudioElement | null;
  play: () => void;
  toggleMute: () => void;
};

export type SoundType = 'bubble' | 'bgm';

type AudioStoreInfo = {
  bgm: AudioInfo;
  bubble: AudioInfo;

  setAudioRef: (type: SoundType, ref: HTMLAudioElement) => void;

  toggleMuteBgm: () => void;

  toggleMuteEffect: () => void;
};

export const useAudioStore = create<AudioStoreInfo>((set, get) => ({
  bgm: { audioRef: null, play: () => {}, toggleMute: () => {} },
  bubble: {
    audioRef: null,
    play: () => {},
    toggleMute: () => {},
    isMuted: false,
  },

  setAudioRef: (type, ref) => {
    set((state) => {
      const audioInfo = {
        audioRef: ref,
        play: () => {
          ref.play();
        },
        toggleMute: () => {
          if (ref.volume === 0) {
            ref.volume = 1;
          } else {
            ref.volume = 0;
          }
        },
      };

      return {
        ...state,
        [type]: audioInfo,
      };
    });
  },

  toggleMuteBgm: () => {
    get().bgm.toggleMute();
  },

  toggleMuteEffect: () => {
    get().bubble.toggleMute();
  },
}));
