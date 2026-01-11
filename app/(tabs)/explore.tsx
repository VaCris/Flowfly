import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { ActivityIndicator, Alert, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, useWindowDimensions, View } from 'react-native';

import { RightSidebar } from '../../src/components/RightSidebar';
import { Sidebar } from '../../src/components/Sidebar';
import { Colors } from '../../src/constants/Colors';
import { useAudioPlayer } from '../../src/hooks/useAudioPlayer';
import { importTrackFromUrl } from '../../src/services/TrackService';

export default function ImportScreen() {
  const { width } = useWindowDimensions();
  const isDesktop = width > 1000;

  const { track, isPlaying, playTrack, togglePlayPause } = useAudioPlayer();

  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState<'spotify' | 'youtube' | 'apple'>('spotify');

  const handleImport = async () => {
    if (!url.trim()) {
      Alert.alert("Error", "Please paste a valid URL");
      return;
    }

    setIsLoading(true);
    try {
      const newTrack = await importTrackFromUrl(url, selectedPlatform);

      await playTrack(newTrack);
      setUrl('');
      Alert.alert("Success", `Imported: ${newTrack.title}`);
    } catch (error) {
      Alert.alert("Error", "Could not import song. Try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>

        {isDesktop && <Sidebar />}

        <View style={styles.mainContent}>
          <ScrollView contentContainerStyle={{ paddingBottom: 50 }}>

            <Text style={styles.pageTitle}>Import Music</Text>
            <Text style={styles.subtitle}>Paste a link from your favorite platform to play it here.</Text>

            <View style={styles.importCard}>

              <View style={styles.platformRow}>
                <TouchableOpacity
                  style={[styles.platformBtn, selectedPlatform === 'spotify' && styles.platformActive]}
                  onPress={() => setSelectedPlatform('spotify')}
                >
                  <Ionicons name="musical-notes" size={24} color={selectedPlatform === 'spotify' ? 'white' : Colors.textDim} />
                  <Text style={[styles.platformText, selectedPlatform === 'spotify' && { color: 'white' }]}>Spotify</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.platformBtn, selectedPlatform === 'youtube' && styles.platformActive, selectedPlatform === 'youtube' && { backgroundColor: '#FF0000' }]}
                  onPress={() => setSelectedPlatform('youtube')}
                >
                  <Ionicons name="logo-youtube" size={24} color={selectedPlatform === 'youtube' ? 'white' : Colors.textDim} />
                  <Text style={[styles.platformText, selectedPlatform === 'youtube' && { color: 'white' }]}>YouTube</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.inputContainer}>
                <Ionicons name="link" size={20} color={Colors.textDim} style={{ marginRight: 10 }} />
                <TextInput
                  placeholder="Paste song or playlist link..."
                  placeholderTextColor={Colors.textDim}
                  style={styles.input}
                  value={url}
                  onChangeText={setUrl}
                />
                {url.length > 0 && (
                  <TouchableOpacity onPress={() => setUrl('')}>
                    <Ionicons name="close-circle" size={20} color={Colors.textDim} />
                  </TouchableOpacity>
                )}
              </View>

              <TouchableOpacity
                style={styles.importBtn}
                onPress={handleImport}
                disabled={isLoading}
              >
                <LinearGradient
                  colors={[Colors.gradientOrange, Colors.primary]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.gradientBtn}
                >
                  {isLoading ? (
                    <ActivityIndicator color="white" />
                  ) : (
                    <Text style={styles.importBtnText}>Import & Play</Text>
                  )}
                </LinearGradient>
              </TouchableOpacity>

            </View>

            <View style={styles.infoSection}>
              <Text style={styles.sectionTitle}>How it works</Text>
              <View style={styles.stepRow}>
                <View style={styles.stepCircle}><Text style={styles.stepNum}>1</Text></View>
                <Text style={styles.stepText}>Copy the link of a song from Spotify or YouTube.</Text>
              </View>
              <View style={styles.stepRow}>
                <View style={styles.stepCircle}><Text style={styles.stepNum}>2</Text></View>
                <Text style={styles.stepText}>Paste it above and select the platform.</Text>
              </View>
              <View style={styles.stepRow}>
                <View style={styles.stepCircle}><Text style={styles.stepNum}>3</Text></View>
                <Text style={styles.stepText}>Flowfly will convert and play it instantly.</Text>
              </View>
            </View>

          </ScrollView>
        </View>

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
  mainContent: { flex: 1, padding: 40 },

  pageTitle: { color: Colors.text, fontSize: 32, fontWeight: '700', marginBottom: 10 },
  subtitle: { color: Colors.textDim, fontSize: 16, marginBottom: 40 },

  importCard: {
    backgroundColor: '#1F1F1F',
    borderRadius: 20,
    padding: 30,
    marginBottom: 40,
  },

  platformRow: { flexDirection: 'row', gap: 15, marginBottom: 25 },
  platformBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 8,
    paddingVertical: 10, paddingHorizontal: 20,
    borderRadius: 30,
    backgroundColor: '#2A2A2A',
    borderWidth: 1, borderColor: '#333'
  },
  platformActive: { backgroundColor: '#1DB954', borderColor: 'transparent' },
  platformText: { color: Colors.textDim, fontWeight: '600' },

  inputContainer: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: '#2A2A2A',
    borderRadius: 15,
    paddingHorizontal: 15,
    height: 60,
    marginBottom: 25,
    borderWidth: 1, borderColor: '#333'
  },
  input: { flex: 1, color: Colors.text, fontSize: 16, height: '100%' },

  importBtn: { height: 55, borderRadius: 30, overflow: 'hidden' },
  gradientBtn: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  importBtnText: { color: 'white', fontSize: 18, fontWeight: 'bold' },

  infoSection: { marginTop: 20 },
  sectionTitle: { color: Colors.text, fontSize: 20, fontWeight: 'bold', marginBottom: 20 },
  stepRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  stepCircle: {
    width: 30, height: 30, borderRadius: 15, backgroundColor: '#333',
    justifyContent: 'center', alignItems: 'center', marginRight: 15
  },
  stepNum: { color: Colors.primary, fontWeight: 'bold' },
  stepText: { color: Colors.textDim, fontSize: 15 },
});