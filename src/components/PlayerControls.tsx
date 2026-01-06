import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors } from '../constants/Colors';
import { Track } from '../services/TrackService';

interface PlayerControlsProps {
    track: Track | null;
    isPlaying: boolean;
    onToggle: () => void;
}

export const PlayerControls = ({ track, isPlaying, onToggle }: PlayerControlsProps) => {
    if (!track) return null;

    return (
        <View style={styles.container}>
            <View style={styles.profileHeader}>
                <Image
                    source={{ uri: 'https://i.pravatar.cc/150?img=11' }}
                    style={styles.avatar}
                />
                <View>
                    <Text style={styles.userName}>Vidal</Text>
                    <Text style={styles.userTag}>Premium</Text>
                </View>
                <Ionicons name="notifications-outline" size={24} color={Colors.text} style={{ marginLeft: 'auto' }} />
            </View>

            <View style={styles.card}>
                <View style={styles.cardHeader}>
                    <Text style={styles.playingText}>Now Playing</Text>
                    <Ionicons name="ellipsis-horizontal" size={20} color={Colors.textDim} />
                </View>

                <Image source={{ uri: track.artwork }} style={styles.artwork} />

                <View style={styles.trackInfo}>
                    <Text style={styles.title} numberOfLines={1}>{track.title}</Text>
                    <Text style={styles.artist}>{track.artist}</Text>
                </View>

                <View style={styles.progressContainer}>
                    <Text style={styles.timeText}>1:42</Text>
                    <View style={styles.progressBar}>
                        <View style={styles.progressFill} />
                    </View>
                    <Text style={styles.timeText}>3:51</Text>
                </View>

                <View style={styles.controls}>
                    <Ionicons name="play-skip-back" size={24} color={Colors.text} />

                    <TouchableOpacity onPress={onToggle} style={styles.playBtnWrapper}>
                        <View style={styles.playBtn}>
                            <Ionicons
                                name={isPlaying ? "pause" : "play"}
                                size={24}
                                color="white"
                                style={{ marginLeft: isPlaying ? 0 : 2 }}
                            />
                        </View>
                    </TouchableOpacity>

                    <Ionicons name="play-skip-forward" size={24} color={Colors.text} />
                </View>
            </View>

            <View style={[styles.card, styles.miniCard]}>
                <View style={styles.iconBox}>
                    <Ionicons name="heart" size={24} color="white" />
                </View>
                <View>
                    <Text style={styles.title}>Liked Songs</Text>
                    <Text style={styles.artist}>120 Songs</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 24,
        height: '100%',
        backgroundColor: '#050505',
    },
    profileHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        marginBottom: 40,
    },
    avatar: { width: 40, height: 40, borderRadius: 20 },
    userName: { color: Colors.text, fontWeight: 'bold', fontSize: 14 },
    userTag: { color: Colors.textDim, fontSize: 12 },

    card: {
        backgroundColor: Colors.surface,
        borderRadius: 24,
        padding: 20,
        marginBottom: 20,
    },
    miniCard: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 15,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 15,
    },
    playingText: { color: Colors.text, fontWeight: 'bold' },
    artwork: {
        width: '100%',
        height: 220,
        borderRadius: 16,
        marginBottom: 15,
    },
    trackInfo: { alignItems: 'center', marginBottom: 20 },
    title: { color: Colors.text, fontSize: 18, fontWeight: 'bold', marginBottom: 4 },
    artist: { color: Colors.textDim, fontSize: 14 },

    progressContainer: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 20 },
    timeText: { color: Colors.textDim, fontSize: 10 },
    progressBar: { flex: 1, height: 4, backgroundColor: '#333', borderRadius: 2 },
    progressFill: { width: '40%', height: '100%', backgroundColor: Colors.text, borderRadius: 2 },

    controls: { flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' },
    playBtnWrapper: {
        shadowColor: Colors.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.5,
        shadowRadius: 8,
    },
    playBtn: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: Colors.primary,
        justifyContent: 'center',
        alignItems: 'center'
    },

    iconBox: {
        width: 50,
        height: 50,
        borderRadius: 12,
        backgroundColor: Colors.primary,
        justifyContent: 'center',
        alignItems: 'center'
    }
});