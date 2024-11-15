import { create } from 'zustand';

type AudioInfo = {
  audioRef: HTMLAudioElement | null;
  play: () => void;
};

export type SoundType = 'bubble' | 'bgm';

type AudioStoreInfo = {
  bubble: AudioInfo;
  bgm: AudioInfo;

  initAudioRefs: () => void;
  setAudioRef: (type: SoundType, ref: HTMLAudioElement) => void;
};

export const useAudioStore = create<AudioStoreInfo>((set) => ({
  bubble: { audioRef: null, play: () => {} },
  bgm: { audioRef: null, play: () => {} },

  initAudioRefs: () => {
    set({
      bubble: { audioRef: null, play: () => {} },
      bgm: { audioRef: null, play: () => {} },
    });
  },

  setAudioRef: (type, ref) => {
    set((state) => {
      const audioInfo = {
        audioRef: ref,
        play: () => {
          ref.play().catch((error) => {
            console.error(`${type} play error:`, error);
          });
        },
      };

      return {
        ...state,
        [type]: audioInfo,
      };
    });
  },
}));
