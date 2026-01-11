import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import React, { useState } from 'react';
import { ActivityIndicator, Alert, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { Colors } from '../constants/Colors';
import { importTrackFromUrl, Track } from '../services/TrackService';

export const LibraryView = ({ onPlay }: { onPlay: (track: Track) => void }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [url, setUrl] = useState('');
    const [loading, setLoading] = useState(false);

    const [myLibrary, setMyLibrary] = useState<Track[]>([
        { id: 'lib1', title: 'My Favorites', artist: 'Playlist • 23 songs', uri: '', artwork: 'https://picsum.photos/id/40/300/300', duration: '' },
        { id: 'lib2', title: 'Gym Mix', artist: 'Playlist • 14 songs', uri: '', artwork: 'https://picsum.photos/id/41/300/300', duration: '' },
    ]);

    const handleImport = async () => {
        if (!url) return;
        setLoading(true);
        try {
            const newTrack = await importTrackFromUrl(url, 'youtube');
            setMyLibrary(prev => [newTrack, ...prev]);
            setUrl('');
            setModalVisible(false);
            Alert.alert("Success", "Music imported successfully!");
        } catch (error) {
            Alert.alert("Error", "Could not import from this URL");
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={{ uri: 'https://i.pravatar.cc/150?u=flowfly' }} style={styles.avatar} />
                <Text style={styles.title}>Your Library</Text>
                <View style={{ flex: 1 }} />
                <Pressable onPress={() => setModalVisible(true)}>
                    <Ionicons name="add" size={32} color="white" />
                </Pressable>
            </View>

            <View style={styles.filterRow}>
                <View style={styles.pillActive}><Text style={styles.pillTextActive}>Playlists</Text></View>
                <View style={styles.pill}><Text style={styles.pillText}>Artists</Text></View>
                <View style={styles.pill}><Text style={styles.pillText}>Albums</Text></View>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 120 }}>
                <View style={styles.addRow}>
                    <View style={styles.addIconCircle}>
                        <Ionicons name="add" size={24} color="#B3B3B3" />
                    </View>
                    <Text style={styles.itemTitle}>Add artists</Text>
                </View>

                {myLibrary.map((item) => (
                    <Pressable key={item.id} style={styles.row} onPress={() => item.uri ? onPlay(item) : null}>
                        <Image source={item.artwork} style={[styles.artwork, item.artist.includes('Playlist') ? { borderRadius: 4 } : { borderRadius: 50 }]} />
                        <View style={{ flex: 1 }}>
                            <Text style={styles.itemTitle} numberOfLines={1}>{item.title}</Text>
                            <Text style={styles.itemSub}>{item.artist}</Text>
                        </View>
                        {item.id.startsWith('imported') && <Ionicons name="cloud-download-outline" size={16} color={Colors.primary} />}
                    </Pressable>
                ))}
            </ScrollView>

            {/* MODAL DE IMPORTACIÓN */}
            {modalVisible && (
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Import from Link</Text>
                        <Text style={styles.modalSub}>Paste a link from YouTube, Spotify or SoundCloud</Text>

                        <TextInput
                            style={styles.input}
                            placeholder="https://..."
                            placeholderTextColor="#555"
                            value={url}
                            onChangeText={setUrl}
                            autoCapitalize="none"
                        />

                        <View style={styles.modalButtons}>
                            <Pressable onPress={() => setModalVisible(false)} style={styles.btnCancel}>
                                <Text style={styles.btnText}>Cancel</Text>
                            </Pressable>
                            <Pressable onPress={handleImport} style={styles.btnImport} disabled={loading}>
                                {loading ? <ActivityIndicator color="black" /> : <Text style={styles.btnTextPrimary}>Import</Text>}
                            </Pressable>
                        </View>
                    </View>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, paddingHorizontal: 16, paddingTop: 50 },
    header: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
    avatar: { width: 35, height: 35, borderRadius: 17.5, marginRight: 15, backgroundColor: Colors.primary },
    title: { color: 'white', fontSize: 24, fontWeight: 'bold' },
    filterRow: { flexDirection: 'row', gap: 10, marginBottom: 20 },
    pill: { backgroundColor: '#121212', borderWidth: 1, borderColor: '#333', paddingHorizontal: 15, paddingVertical: 6, borderRadius: 20 },
    pillActive: { backgroundColor: '#2A2A2A', borderWidth: 1, borderColor: '#2A2A2A', paddingHorizontal: 15, paddingVertical: 6, borderRadius: 20 },
    pillText: { color: 'white', fontSize: 13 },
    pillTextActive: { color: 'white', fontSize: 13, fontWeight: '600' },

    row: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
    artwork: { width: 60, height: 60, marginRight: 15 },
    itemTitle: { color: 'white', fontSize: 16, fontWeight: '600', marginBottom: 2 },
    itemSub: { color: '#B3B3B3', fontSize: 13 },

    addRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
    addIconCircle: { width: 60, height: 60, borderRadius: 30, backgroundColor: '#2A2A2A', justifyContent: 'center', alignItems: 'center', marginRight: 15 },

    modalOverlay: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.7)', justifyContent: 'center', alignItems: 'center', zIndex: 100 },
    modalContent: { backgroundColor: '#2A2A2A', width: '85%', padding: 20, borderRadius: 10 },
    modalTitle: { color: 'white', fontSize: 18, fontWeight: 'bold', marginBottom: 5 },
    modalSub: { color: '#B3B3B3', fontSize: 12, marginBottom: 15 },
    input: { backgroundColor: '#121212', color: 'white', padding: 12, borderRadius: 5, marginBottom: 20, borderWidth: 1, borderColor: '#333' },
    modalButtons: { flexDirection: 'row', justifyContent: 'flex-end', gap: 10 },
    btnCancel: { padding: 10 },
    btnImport: { backgroundColor: Colors.primary, paddingVertical: 10, paddingHorizontal: 20, borderRadius: 20 },
    btnText: { color: 'white', fontWeight: '600' },
    btnTextPrimary: { color: 'black', fontWeight: 'bold' }
});