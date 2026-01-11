import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors } from '../constants/Colors';
import { Track } from '../services/TrackService';

interface RightSidebarProps {
    track: Track | null;
    isPlaying: boolean;
    onToggle: () => void;
    isMobile?: boolean;
    onClose?: () => void;
    position?: number;
    duration?: number;
    onDevicePress?: () => void;
}

const formatTime = (millis: number) => {
    if (!millis) return '0:00';
    const minutes = Math.floor(millis / 60000);
    const seconds = ((millis % 60000) / 1000).toFixed(0);
    return `${minutes}:${Number(seconds) < 10 ? '0' : ''}${seconds}`;
};

export const RightSidebar = ({ track, isPlaying, onToggle, isMobile = false, onClose, position = 0, duration = 0, onDevicePress }: RightSidebarProps) => {
    if (!track) return null;

    const progressPercent = duration > 0 ? (position / duration) * 100 : 0;

    return (
        <View style={[styles.container, isMobile && styles.mobileContainer]}>

            <View style={styles.header}>
                {isMobile ? (
                    <TouchableOpacity onPress={onClose} style={styles.headerBtn}>
                        <Ionicons name="chevron-down" size={28} color={Colors.text} />
                    </TouchableOpacity>
                ) : (
                    <View style={{ width: 28 }} />
                )}

                <View style={{ alignItems: 'center', flex: 1 }}>
                    <Text style={styles.headerSubtitle}>PLAYING FROM ARTIST</Text>
                    <Text style={styles.headerTitle} numberOfLines={1}>{track.artist}</Text>
                </View>

                <TouchableOpacity style={styles.headerBtn}>
                    <Ionicons name="ellipsis-horizontal" size={24} color={Colors.text} />
                </TouchableOpacity>
            </View>

            <View style={styles.artworkContainer}>
                <Image
                    source={track.artwork}
                    style={styles.artwork}
                    contentFit="cover"
                    transition={500}
                />
            </View>

            <View style={styles.trackRow}>
                <View style={{ flex: 1, marginRight: 10 }}>
                    <Text style={styles.trackTitle} numberOfLines={1}>{track.title}</Text>
                    <Text style={styles.trackArtist} numberOfLines={1}>{track.artist}</Text>
                </View>
                <TouchableOpacity>
                    <Ionicons name="heart-outline" size={28} color={Colors.text} />
                </TouchableOpacity>
            </View>

            <View style={styles.progressContainer}>
                <View style={styles.progressBarBackground}>
                    <View style={[styles.progressBarFill, { width: `${progressPercent}%` }]} />
                </View>
                <View style={styles.timeRow}>
                    <Text style={styles.timeText}>{formatTime(position)}</Text>
                    <Text style={styles.timeText}>{formatTime(duration)}</Text>
                </View>
            </View>

            <View style={styles.controlsContainer}>
                <TouchableOpacity>
                    <Ionicons name="shuffle" size={24} color={Colors.primary} />
                </TouchableOpacity>

                <TouchableOpacity>
                    <Ionicons name="play-skip-back" size={35} color={Colors.text} />
                </TouchableOpacity>

                <TouchableOpacity onPress={onToggle} style={styles.playBtnCircle}>
                    <Ionicons name={isPlaying ? "pause" : "play"} size={35} color="black" style={{ marginLeft: isPlaying ? 0 : 4 }} />
                </TouchableOpacity>

                <TouchableOpacity>
                    <Ionicons name="play-skip-forward" size={35} color={Colors.text} />
                </TouchableOpacity>

                <TouchableOpacity>
                    <Ionicons name="repeat" size={24} color={Colors.textDim} />
                </TouchableOpacity>
            </View>

            <View style={styles.bottomRow}>
                <TouchableOpacity onPress={onDevicePress} style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                    <Ionicons name="hardware-chip-outline" size={20} color={Colors.primary} />
                    <Text style={{ color: Colors.primary, fontSize: 12, fontWeight: '600' }}>Devices</Text>
                </TouchableOpacity>

                <TouchableOpacity>
                    <Ionicons name="list" size={22} color={Colors.text} />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: 350,
        backgroundColor: '#121212',
        padding: 25,
        height: '100%',
        borderLeftWidth: 1,
        borderLeftColor: '#1F1F1F',
        justifyContent: 'space-between'
    },
    mobileContainer: {
        width: '100%',
        borderLeftWidth: 0,
        paddingTop: 50,
        paddingHorizontal: 25,
        backgroundColor: '#121212',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 20,
    },
    headerBtn: {
        padding: 5,
        minWidth: 40,
        alignItems: 'center',
    },
    headerSubtitle: {
        color: Colors.textDim,
        fontSize: 10,
        letterSpacing: 1,
        fontWeight: '600',
        textTransform: 'uppercase',
    },
    headerTitle: {
        color: Colors.text,
        fontSize: 12,
        fontWeight: 'bold',
    },
    artworkContainer: {
        alignItems: 'center',
        marginBottom: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.4,
        shadowRadius: 12,
        elevation: 10,
    },
    artwork: {
        width: '100%',
        aspectRatio: 1,
        borderRadius: 8,
        backgroundColor: '#1F1F1F',
    },
    trackRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    trackTitle: {
        color: Colors.text,
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    trackArtist: {
        color: Colors.textDim,
        fontSize: 16,
    },
    progressContainer: {
        width: '100%',
        marginBottom: 10,
    },
    progressBarBackground: {
        height: 4,
        backgroundColor: '#333',
        borderRadius: 2,
        marginBottom: 8,
        overflow: 'hidden'
    },
    progressBarFill: {
        height: '100%',
        backgroundColor: 'white',
        borderRadius: 2,
    },
    timeRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    timeText: {
        color: Colors.textDim,
        fontSize: 12,
        fontVariant: ['tabular-nums'],
    },
    controlsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    playBtnCircle: {
        width: 65,
        height: 65,
        borderRadius: 32.5,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    },
    bottomRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 10,
        paddingBottom: 20
    }
});