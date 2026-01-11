import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { Track } from '../services/TrackService';

interface AlbumDetailProps {
    item: any;
    onBack: () => void;
    onPlay: () => void;
    isPlaying: boolean;
    currentTrack: Track | null;
}

export const AlbumDetailView = ({ item, onBack, onPlay, isPlaying, currentTrack }: AlbumDetailProps) => {
    const isCurrentSong = currentTrack?.id === item.id;
    const showPause = isCurrentSong && isPlaying;

    const getImageSource = () => {
        if (item.artwork) return item.artwork;
        if (item.cover) return item.cover;
        return 'https://picsum.photos/id/10/300/300';
    };

    return (
        <ScrollView style={{ flex: 1, backgroundColor: '#121212' }} showsVerticalScrollIndicator={false}>
            <LinearGradient colors={['#b91d1d', '#121212']} style={{ padding: 20, paddingTop: 60 }}>

                <Pressable onPress={onBack} style={{ marginBottom: 20 }}>
                    <Ionicons name="chevron-back" size={28} color="white" />
                </Pressable>

                <View style={{ alignItems: 'center', marginBottom: 20 }}>
                    <Image
                        source={getImageSource()}
                        style={{ width: 220, height: 220, borderRadius: 4, shadowColor: "#000", shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.5, shadowRadius: 20 }}
                        contentFit="cover"
                        transition={500}
                    />
                </View>

                <Text style={{ color: 'white', fontSize: 24, fontWeight: 'bold', marginBottom: 5 }}>
                    {item.title || "1 (Remastered)"}
                </Text>

                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                    <Image
                        source={{ uri: 'https://i.pravatar.cc/150' }}
                        style={{ width: 24, height: 24, borderRadius: 12, marginRight: 8 }}
                        contentFit="cover"
                    />
                    <Text style={{ color: 'white', fontWeight: 'bold' }}>
                        {item.artist || item.owner || "The Beatles"}
                    </Text>
                </View>

                <Text style={{ color: '#B3B3B3', fontSize: 12 }}>Album • 2000</Text>

                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 10 }}>
                    <View style={{ flexDirection: 'row', gap: 20 }}>
                        <Ionicons name="heart-outline" size={28} color="white" />
                        <Ionicons name="arrow-down-circle-outline" size={28} color="white" />
                        <Ionicons name="ellipsis-horizontal" size={24} color="#B3B3B3" />
                    </View>

                    <Pressable
                        onPress={onPlay}
                        style={{
                            width: 56,
                            height: 56,
                            borderRadius: 28,
                            backgroundColor: '#1DB954',
                            justifyContent: 'center',
                            alignItems: 'center',
                            transform: [{ scale: showPause ? 1.05 : 1 }]
                        }}
                    >
                        <Ionicons
                            name={showPause ? "pause" : "play"}
                            size={28}
                            color="black"
                            style={{ marginLeft: showPause ? 0 : 4 }}
                        />
                    </Pressable>
                </View>
            </LinearGradient>

            <View style={{ padding: 16, paddingBottom: 120 }}>
                {[1, 2, 3, 4, 5].map((i) => (
                    <View key={i} style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                        <View>
                            <Text style={{ color: (isCurrentSong && i === 1) ? '#1DB954' : 'white', fontSize: 16, fontWeight: '500', marginBottom: 4 }}>
                                {isCurrentSong && i === 1 ? item.title : `Song Title ${i}`}
                            </Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <View style={{ backgroundColor: '#B3B3B3', paddingHorizontal: 4, borderRadius: 2, marginRight: 6 }}>
                                    <Text style={{ color: 'black', fontSize: 9, fontWeight: 'bold' }}>LYRICS</Text>
                                </View>
                                <Text style={{ color: '#B3B3B3', fontSize: 13 }}>{item.artist || "Artist Name"}</Text>
                            </View>
                        </View>
                        <Ionicons name="ellipsis-horizontal" size={20} color="#B3B3B3" />
                    </View>
                ))}
            </View>
        </ScrollView>
    );
}