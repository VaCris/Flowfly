import { Audio } from 'expo-av';
import { useEffect, useState } from 'react';

export const useAudioPlayer = () => {
    const [sound, setSound] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [track, setTrack] = useState(null);

    const initTrack = async (fetcher) => {
        setIsLoading(true);
        try {
            const data = await fetcher();
            setTrack(data);
            await loadAudio(data.uri);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    const loadAudio = async (uri) => {
        try {
            const { sound: newSound } = await Audio.Sound.createAsync(
                { uri },
                { shouldPlay: false }
            );

            newSound.setOnPlaybackStatusUpdate((status) => {
                if (status.didJustFinish) {
                    setIsPlaying(false);
                    newSound.setPositionAsync(0);
                }
            });

            setSound(newSound);
        } catch (error) {
            console.error(error);
        }
    };

    const togglePlayPause = async () => {
        if (!sound) return;

        if (isPlaying) {
            await sound.pauseAsync();
            setIsPlaying(false);
        } else {
            await sound.playAsync();
            setIsPlaying(true);
        }
    };

    useEffect(() => {
        return sound
            ? () => {
                sound.unloadAsync();
            }
            : undefined;
    }, [sound]);

    return {
        track,
        isPlaying,
        isLoading,
        initTrack,
        togglePlayPause,
    };
};