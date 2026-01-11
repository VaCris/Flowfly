import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { Playlist, searchData, User } from '../services/TrackService';

export const SearchView = ({ onPlay }: { onPlay: () => void }) => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<{ users: User[], playlists: Playlist[] }>({ users: [], playlists: [] });

    useEffect(() => {
        const delayDebounceFn = setTimeout(async () => {
            const data = await searchData(query);
            setResults(data);
        }, 300);
        return () => clearTimeout(delayDebounceFn);
    }, [query]);

    return (
        <View style={{ flex: 1, paddingTop: 50, paddingHorizontal: 16 }}>
            <Text style={styles.pageTitle}>Search</Text>
            <View style={styles.searchBar}>
                <Ionicons name="search" size={24} color="#000" />
                <TextInput
                    placeholder="Artists, songs, or playlists"
                    placeholderTextColor="#555"
                    style={styles.searchInput}
                    value={query}
                    onChangeText={setQuery}
                />
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 150 }}>
                {query === '' ? (
                    <View style={{ marginTop: 10 }}>
                        <Text style={styles.sectionTitle}>Recent searches</Text>
                        <View style={styles.resultRow}>
                            <Image source={{ uri: 'https://i.pravatar.cc/150?u=a042581f4e29026704d' }} style={[styles.resultImg, { borderRadius: 50 }]} />
                            <View style={{ flex: 1 }}>
                                <Text style={styles.resultTitle}>FKA twigs</Text>
                                <Text style={styles.resultSub}>Artist</Text>
                            </View>
                            <Ionicons name="close" size={20} color="#B3B3B3" />
                        </View>
                    </View>
                ) : (
                    <View style={{ marginTop: 20 }}>
                        {results.users.map(u => (
                            <View key={u.id} style={styles.resultRow}>
                                <Image source={u.avatar} style={[styles.resultImg, { borderRadius: 50 }]} />
                                <View>
                                    <Text style={styles.resultTitle}>{u.name}</Text>
                                    <Text style={styles.resultSub}>Artist</Text>
                                </View>
                            </View>
                        ))}
                        {results.playlists.map(p => (
                            <View key={p.id} style={styles.resultRow}>
                                <Image source={p.cover} style={styles.resultImg} />
                                <View>
                                    <Text style={styles.resultTitle}>{p.title}</Text>
                                    <Text style={styles.resultSub}>Playlist • {p.owner}</Text>
                                </View>
                            </View>
                        ))}
                    </View>
                )}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    pageTitle: { color: 'white', fontSize: 32, fontWeight: '700', marginBottom: 20 },
    searchBar: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'white', borderRadius: 8, paddingHorizontal: 12, height: 48, marginBottom: 20 },
    searchInput: { flex: 1, marginLeft: 10, fontSize: 16, color: 'black' },
    sectionTitle: { color: 'white', fontSize: 22, fontWeight: '700', marginBottom: 16 },
    resultRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
    resultImg: { width: 50, height: 50, borderRadius: 4, marginRight: 12 },
    resultTitle: { color: 'white', fontSize: 16, fontWeight: '600' },
    resultSub: { color: '#B3B3B3', fontSize: 14 },
});