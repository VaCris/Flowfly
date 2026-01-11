import { Audio, AVPlaybackStatus } from 'expo-av';
import { useEffect, useState } from 'react';
import { Track } from '../services/TrackService';

export const useAudioPlayer = () => {
    const [sound, setSound] = useState < Audio.Sound | null > (null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [track, setTrack] = useState < Track | null > (null);
    const [position, setPosition] = useState(0);
    const [duration, setDuration] = useState(0);

    const playTrack = async (newTrack: Track) => {
        try {
            if (sound) {
                await sound.unloadAsync();
            }

            setTrack(newTrack);
            setIsPlaying(true);
            setPosition(0);
            setDuration(0);

            const { sound: newSound } = await Audio.Sound.createAsync(
                { uri: newTrack.uri },
                { shouldPlay: true }
            );

            newSound.setOnPlaybackStatusUpdate((status: AVPlaybackStatus) => {
                if (status.isLoaded) {
                    setPosition(status.positionMillis);
                    setDuration(status.durationMillis || 0);

                    if (status.didJustFinish) {
                        setIsPlaying(false);
                        newSound.setPositionAsync(0);
                    }
                }
            });

            setSound(newSound);
        } catch (error) {
            console.error("Error en playTrack:", error);
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
        position,
        duration,
        isLoading,
        togglePlayPause,
        playTrack,
    };
};