export interface Track {
    id: string;
    title: string;
    artist: string;
    uri: string;
    artwork: string;
}

export const fetchTrack = async (): Promise<Track> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                id: '1',
                title: 'SoundHelix Song 1',
                artist: 'SoundHelix Library',
                uri: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
                artwork: 'https://via.placeholder.com/300'
            });
        }, 1500);
    });
};