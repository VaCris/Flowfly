import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect } from 'react';
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, useWindowDimensions, View } from 'react-native';

import { RightSidebar } from '../../src/components/RightSidebar';
import { Sidebar } from '../../src/components/Sidebar';
import { Colors } from '../../src/constants/Colors';
import { useAudioPlayer } from '../../src/hooks/useAudioPlayer';
import { fetchTrack } from '../../src/services/TrackService';

export default function HomeScreen() {
  const { width } = useWindowDimensions();
  const { track, isPlaying, initTrack, togglePlayPause } = useAudioPlayer();
  const isDesktop = width > 1000;

  useEffect(() => {
    initTrack(fetchTrack);
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {isDesktop && <Sidebar />}

        <View style={styles.mainContent}>
          <ScrollView contentContainerStyle={{ paddingBottom: 50 }}>

            <View style={styles.topHeader}>
              <Ionicons name="chevron-back" size={24} color={Colors.textDim} style={styles.backBtn} />
            </View>

            <Text style={styles.pageTitle}>Made for you</Text>

            <LinearGradient
              colors={[Colors.gradientOrange, Colors.primary]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.heroCard}
            >
              <View>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5, marginBottom: 10 }}>
                  <Ionicons name="musical-note" size={18} color="white" />
                  <Text style={{ color: 'white', opacity: 0.9 }}>Music</Text>
                </View>
                <Text style={styles.heroTitle}>Favorites</Text>
                <Text style={styles.heroTitle}>Mix</Text>
              </View>
            </LinearGradient>

            <Text style={styles.sectionTitle}>Recently Played</Text>

            <View style={styles.tableHeader}>
              <Text style={[styles.headerText, { flex: 1 }]}># Song</Text>
              <Text style={styles.headerText}># Duration</Text>
              <View style={{ width: 80 }} />
            </View>

            <View style={styles.songRow}>
              <Image source={{ uri: 'https://i.scdn.co/image/ab67616d0000b2738863bc11d2aa12b54f5aeb36' }} style={styles.rowImg} />
              <View style={styles.rowInfo}>
                <Text style={styles.rowTitle}>Blinding Lights</Text>
                <Text style={styles.rowArtist}>The Weeknd</Text>
              </View>
              <Text style={styles.rowDuration}>04:01</Text>

              <View style={styles.rowActions}>
                <Ionicons name="heart" size={20} color="white" style={{ marginRight: 15 }} />
                <View style={styles.playBtnSmall}>
                  <Ionicons name="play" size={14} color="white" />
                </View>
              </View>
            </View>

            {/* Fila de ejemplo 2 */}
            <View style={styles.songRow}>
              <Image source={{ uri: 'https://i.scdn.co/image/ab67616d0000b273212d776c31027c511f0ee3bc' }} style={styles.rowImg} />
              <View style={styles.rowInfo}>
                <Text style={styles.rowTitle}>Show me</Text>
                <Text style={styles.rowArtist}>Chris Brown</Text>
              </View>
              <Text style={styles.rowDuration}>04:01</Text>

              <View style={styles.rowActions}>
                <Ionicons name="heart" size={20} color="white" style={{ marginRight: 15 }} />
                <View style={styles.playBtnSmall}>
                  <Ionicons name="play" size={14} color="white" />
                </View>
              </View>
            </View>

          </ScrollView>
        </View>

        {/* COLUMNA 3: Right Sidebar (Perfil + Player + Liked) */}
        {isDesktop && (
          <RightSidebar track={track} isPlaying={isPlaying} onToggle={togglePlayPause} />
        )}

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: Colors.background },
  container: { flex: 1, flexDirection: 'row' },

  // Centro
  mainContent: { flex: 1, padding: 40 },
  topHeader: { marginBottom: 20 },
  backBtn: { backgroundColor: '#1F1F1F', borderRadius: 15, padding: 5, alignSelf: 'flex-start' },
  pageTitle: { color: Colors.text, fontSize: 32, fontWeight: '700', marginBottom: 25 },

  heroCard: {
    width: '100%', height: 250, borderRadius: 25, padding: 30, justifyContent: 'center', marginBottom: 40,
  },
  heroTitle: { color: 'white', fontSize: 38, fontWeight: '800' },

  sectionTitle: { color: Colors.text, fontSize: 18, fontWeight: '700', marginBottom: 15 },

  // Tabla
  tableHeader: { flexDirection: 'row', marginBottom: 15, paddingHorizontal: 10 },
  headerText: { color: Colors.textDim, fontSize: 12, textTransform: 'uppercase', letterSpacing: 1 },

  songRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 15, padding: 10, borderRadius: 10 },
  rowImg: { width: 45, height: 45, borderRadius: 8, marginRight: 15 },
  rowInfo: { flex: 1 },
  rowTitle: { color: Colors.text, fontWeight: '600', fontSize: 15 },
  rowArtist: { color: Colors.textDim, fontSize: 13 },
  rowDuration: { color: Colors.textDim, width: 60, textAlign: 'left' },

  rowActions: { flexDirection: 'row', alignItems: 'center', width: 80, justifyContent: 'flex-end' },
  playBtnSmall: {
    width: 30, height: 30, borderRadius: 15, backgroundColor: Colors.primary,
    justifyContent: 'center', alignItems: 'center',
    shadowColor: Colors.primary, shadowOpacity: 0.5, shadowRadius: 5
  }
});