import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors } from '../constants/Colors';
import { Track } from '../services/TrackService';

interface RightSidebarProps {
    track: Track | null;
    isPlaying: boolean;
    onToggle: () => void;
}

export const RightSidebar = ({ track, isPlaying, onToggle }: RightSidebarProps) => {
    return (
        <View style={styles.container}>

            <View style={styles.profileHeader}>
                <Image
                    source={{ uri: 'https://i.pravatar.cc/150?img=33' }}
                    style={styles.avatar}
                />
                <View style={{ flex: 1 }}>
                    <Text style={styles.userName}>Vidal</Text>
                    <Text style={styles.userRole}>Account</Text>
                </View>
                <Ionicons name="notifications-outline" size={20} color={Colors.text} />
            </View>

            {track ? (
                <View style={styles.playerCard}>
                    <View style={styles.playerHeader}>
                        <Text style={styles.playerTitle}>Now Playing</Text>
                        <Ionicons name="ellipsis-horizontal" size={20} color={Colors.textDim} />
                    </View>

                    <Image source={{ uri: track.artwork }} style={styles.artwork} />

                    <View style={styles.trackMeta}>
                        <Text style={styles.songTitle} numberOfLines={1}>{track.title}</Text>
                        <Text style={styles.artistName}>{track.artist}</Text>
                    </View>

                    <View style={styles.progressRow}>
                        <Text style={styles.timeText}>1:42</Text>
                        <Text style={styles.timeText}>-3:51</Text>
                    </View>
                    <View style={styles.progressBarBg}>
                        <View style={styles.progressBarFill} />
                    </View>

                    <View style={styles.controlsRow}>
                        <Ionicons name="shuffle-outline" size={20} color={Colors.textDim} />
                        <Ionicons name="play-skip-back" size={24} color={Colors.text} />

                        <TouchableOpacity onPress={onToggle}>
                            <Ionicons
                                name={isPlaying ? "pause-circle-sharp" : "play-circle-sharp"}
                                size={50}
                                color={Colors.text}
                            />
                        </TouchableOpacity>

                        <Ionicons name="play-skip-forward" size={24} color={Colors.text} />
                        <Ionicons name="repeat-outline" size={20} color={Colors.textDim} />
                    </View>
                </View>
            ) : null}


            <LinearGradient
                colors={[Colors.gradientPurple, Colors.gradientBlue]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.likedCard}
            >
                <View style={styles.likedHeader}>
                    <Text style={styles.likedTitle}>Liked</Text>
                    <Text style={styles.likedTitle}>Songs</Text>
                </View>
                <View style={styles.likedFooter}>
                    <Text style={styles.likedCount}>100 Songs</Text>
                </View>
                {/* Gráfico de fondo simulado con opacidad */}
                <Ionicons name="heart" size={120} color="white" style={styles.bgIcon} />
            </LinearGradient>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: 320,
        backgroundColor: Colors.background,
        padding: 25,
        height: '100%',
        borderLeftWidth: 1,
        borderLeftColor: '#1F1F1F',
    },
    // Perfil
    profileHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 30,
        gap: 12,
    },
    avatar: { width: 40, height: 40, borderRadius: 20, borderWidth: 2, borderColor: Colors.primary },
    userName: { color: Colors.text, fontWeight: 'bold', fontSize: 14 },
    userRole: { color: Colors.textDim, fontSize: 11 },

    // Player Card
    playerCard: {
        marginBottom: 30,
    },
    playerHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 15,
    },
    playerTitle: { color: Colors.text, fontWeight: '600' },
    artwork: {
        width: '100%',
        height: 200,
        borderRadius: 15,
        marginBottom: 15,
    },
    trackMeta: { marginBottom: 10 },
    songTitle: { color: Colors.text, fontSize: 18, fontWeight: 'bold', marginBottom: 2 },
    artistName: { color: Colors.textDim, fontSize: 14 },

    progressRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 },
    timeText: { color: Colors.textDim, fontSize: 10 },
    progressBarBg: { width: '100%', height: 4, backgroundColor: '#333', borderRadius: 2, marginBottom: 20 },
    progressBarFill: { width: '40%', height: '100%', backgroundColor: Colors.text, borderRadius: 2 },

    controlsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    // Liked Card
    likedCard: {
        flex: 1,
        maxHeight: 180,
        borderRadius: 20,
        padding: 20,
        justifyContent: 'space-between',
        overflow: 'hidden',
        position: 'relative',
    },
    likedHeader: {},
    likedTitle: { color: Colors.text, fontSize: 24, fontWeight: 'bold' },
    likedFooter: {},
    likedCount: { color: Colors.text, fontSize: 13, opacity: 0.8 },
    bgIcon: { position: 'absolute', bottom: -30, right: -30, opacity: 0.2 }
});