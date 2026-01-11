import { Image } from 'expo-image';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Colors } from '../constants/Colors';
import { Track } from '../services/TrackService';

export const FilterPill = ({ label, active = false }: { label: string, active?: boolean }) => (
    <View style={[styles.pill, active && styles.pillActive]}>
        <Text style={[styles.pillText, active && styles.pillTextActive]}>{label}</Text>
    </View>
);

export const GridCard = ({ item, onPress }: { item: Track, onPress: () => void }) => (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.gridCard, { opacity: pressed ? 0.9 : 1 }]}>
        <Image source={item.artwork} style={styles.gridImg} contentFit="cover" />
        <View style={styles.gridTextContainer}>
            <Text style={styles.gridTitle} numberOfLines={2}>{item.title}</Text>
        </View>
    </Pressable>
);

export const SquareCard = ({ item, onPress, title, subtitle, img }: { item?: Track, onPress: () => void, title?: string, subtitle?: string, img?: string }) => (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.squareCard, { opacity: pressed ? 0.9 : 1 }]}>
        <Image source={img || item?.artwork} style={[styles.squareImg, !item && { borderRadius: 100 }]} contentFit="cover" />
        <Text style={styles.squareTitle} numberOfLines={1}>{title || item?.artist}</Text>
        <Text style={styles.squareSubtitle} numberOfLines={1}>{subtitle || (item ? `Album • ${item.title}` : '')}</Text>
    </Pressable>
);

const styles = StyleSheet.create({
    pill: { backgroundColor: '#2A2A2A', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20 },
    pillActive: { backgroundColor: Colors.primary },
    pillText: { color: 'white', fontSize: 13, fontWeight: '500' },
    pillTextActive: { color: 'black', fontWeight: '600' },
    gridCard: { backgroundColor: '#2A2A2A', borderRadius: 4, flexDirection: 'row', alignItems: 'center', overflow: 'hidden', height: 56 },
    gridImg: { width: 56, height: 56 },
    gridTextContainer: { flex: 1, paddingHorizontal: 8, justifyContent: 'center' },
    gridTitle: { color: 'white', fontSize: 12, fontWeight: '700' },
    squareCard: { marginRight: 16, width: 140 },
    squareImg: { width: 140, height: 140, borderRadius: 8, marginBottom: 8, backgroundColor: '#333' },
    squareTitle: { color: 'white', fontSize: 13, fontWeight: '600', marginBottom: 2 },
    squareSubtitle: { color: '#B3B3B3', fontSize: 12 },
});