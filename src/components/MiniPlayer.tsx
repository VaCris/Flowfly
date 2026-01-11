import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Colors } from '../constants/Colors';
import { Track } from '../services/TrackService';

interface MiniPlayerProps {
    track: Track | null;
    isPlaying: boolean;
    onPlayPause: () => void;
    onPress: () => void;
    position: number;
    duration: number;
    hasBottomNav?: boolean;
}

export const MiniPlayer = ({ track, isPlaying, onPlayPause, onPress, position, duration, hasBottomNav }: MiniPlayerProps) => {
    if (!track) return null;
    const progressPercent = duration > 0 ? (position / duration) * 100 : 0;

    return (
        <Pressable onPress={onPress} style={[styles.miniPlayer, hasBottomNav && { bottom: 95 }]}>
            <View style={styles.miniProgress}>
                <View style={[styles.miniProgressFill, { width: `${progressPercent}%` }]} />
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', padding: 8 }}>
                <Image source={track.artwork} style={styles.miniImg} />
                <View style={{ flex: 1, marginLeft: 10 }}>
                    <Text style={styles.miniTitle} numberOfLines={1}>{track.title}</Text>
                    <Text style={styles.miniArtist} numberOfLines={1}>{track.artist}</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 15, marginRight: 10 }}>
                    <Ionicons name="hardware-chip-outline" size={20} color={Colors.primary} />
                    <Ionicons name="heart-outline" size={24} color="white" />
                    <Pressable onPress={(e) => { e.stopPropagation(); onPlayPause(); }}>
                        <Ionicons name={isPlaying ? "pause" : "play"} size={28} color="white" />
                    </Pressable>
                </View>
            </View>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    miniPlayer: { backgroundColor: '#382bf0', borderRadius: 6, overflow: 'hidden', shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.8, shadowRadius: 3, elevation: 5 },
    miniProgress: { height: 2, backgroundColor: 'rgba(255,255,255,0.3)' },
    miniProgressFill: { height: '100%', backgroundColor: 'white' },
    miniImg: { width: 40, height: 40, borderRadius: 4, backgroundColor: '#333' },
    miniTitle: { color: 'white', fontSize: 13, fontWeight: '600' },
    miniArtist: { color: '#ddd', fontSize: 12 },
});