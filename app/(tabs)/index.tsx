import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useCallback, useEffect, useState } from 'react';
import {
  FlatList,
  Modal,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useWindowDimensions,
  View
} from 'react-native';

import { RightSidebar } from '../../src/components/RightSidebar';
import { Sidebar } from '../../src/components/Sidebar';
import { Colors } from '../../src/constants/Colors';
import { useAudioPlayer } from '../../src/hooks/useAudioPlayer';
import { fetchRecentTracks, Track } from '../../src/services/TrackService';

import { AlbumDetailView } from '../../src/components/AlbumDetail';
import { DevicePickerView } from '../../src/components/DevicePicker';
import { FilterPill, GridCard, SquareCard } from '../../src/components/HomeWidgets';
import { LibraryView } from '../../src/components/LibraryView';
import { MiniPlayer } from '../../src/components/MiniPlayer';
import { SearchView } from '../../src/components/SearchView';

const PlaceholderView = ({ title, onOpenSidebar }: { title: string, onOpenSidebar: () => void }) => (
  <View style={{ flex: 1, paddingTop: 50, paddingHorizontal: 16 }}>
    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
      <Pressable onPress={onOpenSidebar} style={styles.profileIcon}>
        <Text style={{ color: 'black', fontWeight: 'bold' }}>F</Text>
      </Pressable>
      <Text style={{ color: 'white', fontSize: 24, fontWeight: 'bold', marginLeft: 15 }}>{title}</Text>
    </View>
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', opacity: 0.5 }}>
      <Ionicons name="musical-notes-outline" size={80} color="#555" />
      <Text style={{ color: 'white', marginTop: 20, fontSize: 18, fontWeight: '600' }}>Empty List</Text>
      <Text style={{ color: '#888', marginTop: 5 }}>Go ahead and add some music!</Text>
    </View>
  </View>
);

export default function HomeScreen() {
  const { width, height } = useWindowDimensions();
  const isDesktop = width >= 1024;
  const isTabletOrWebSplit = width >= 600 && width < 1024;

  const [activeTab, setActiveTab] = useState('home');
  const [selectedItem, setSelectedItem] = useState<any>(null);

  const [isSidebarVisible, setSidebarVisible] = useState(false);
  const [isRightSidebarVisible, setRightSidebarVisible] = useState(false);
  const [isDevicePickerVisible, setDevicePickerVisible] = useState(false);

  const [recentTracks, setRecentTracks] = useState<Track[]>([]);

  const { track, isPlaying, playTrack, togglePlayPause, position, duration } = useAudioPlayer();

  useEffect(() => { loadData(); }, []);

  const loadData = async () => {
    const data = await fetchRecentTracks();
    setRecentTracks(data);
  };

  const handlePlayTrack = useCallback((item: Track) => {
    if (track?.id === item.id) {
      togglePlayPause();
    } else {
      playTrack(item);
    }
  }, [playTrack, togglePlayPause, track]);

  const openDetail = (item: any) => { setSelectedItem(item); };

  const contentPaddingTop = Platform.OS === 'web' ? 20 : 0;
  const contentMaxWidth = isDesktop ? 1600 : '100%';

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#121212" />

      <View style={styles.container}>
        {(isDesktop || (Platform.OS === 'web' && isTabletOrWebSplit)) && (
          <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
        )}

        {!isDesktop && !(Platform.OS === 'web' && isTabletOrWebSplit) && (
          <Modal
            animationType="fade"
            transparent
            visible={isSidebarVisible}
            onRequestClose={() => setSidebarVisible(false)}
            statusBarTranslucent={true}
          >
            <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.8)' }}>
              <Sidebar isMobile onClose={() => setSidebarVisible(false)} activeTab={activeTab} onTabChange={setActiveTab} />
            </View>
          </Modal>
        )}

        <View style={styles.mainContent}>
          <View style={[styles.webWrapper, { maxWidth: contentMaxWidth, paddingTop: contentPaddingTop }]}>

            {selectedItem ? (
              <AlbumDetailView
                item={selectedItem}
                onBack={() => setSelectedItem(null)}
                onPlay={() => handlePlayTrack(selectedItem)}
                isPlaying={isPlaying}
                currentTrack={track}
              />
            ) : (
              <>
                {activeTab === 'home' && (
                  <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 180, paddingHorizontal: 16 }}>
                    <View style={styles.headerRow}>
                      {(!isDesktop && !(Platform.OS === 'web' && isTabletOrWebSplit)) && (
                        <Pressable onPress={() => setSidebarVisible(true)} style={styles.profileIcon}>
                          <Text style={{ color: 'black', fontWeight: 'bold' }}>F</Text>
                        </Pressable>
                      )}
                      <View style={styles.filterContainer}>
                        <FilterPill label="All" active />
                        <FilterPill label="Music" />
                        <FilterPill label="Podcasts" />
                      </View>
                    </View>

                    <View style={styles.gridContainer}>
                      {recentTracks.slice(0, 6).map((item) => (
                        <View key={item.id} style={{
                          width: isDesktop ? '32%' : (isTabletOrWebSplit ? '48%' : '48%'),
                          marginBottom: 8
                        }}>
                          <GridCard item={item} onPress={() => openDetail(item)} />
                        </View>
                      ))}
                    </View>

                    <Text style={styles.sectionTitle}>New Releases</Text>
                    <FlatList
                      horizontal
                      data={recentTracks}
                      keyExtractor={item => item.id}
                      showsHorizontalScrollIndicator={false}
                      renderItem={({ item }) => <SquareCard item={item} onPress={() => openDetail(item)} />}
                      style={{ marginBottom: 30 }}
                    />

                    <Text style={styles.sectionTitle}>Jump back in</Text>
                    <FlatList
                      horizontal
                      data={[...recentTracks].reverse()}
                      keyExtractor={item => item.id + 'rev'}
                      showsHorizontalScrollIndicator={false}
                      renderItem={({ item }) => <SquareCard item={item} title="Daily Mix 1" onPress={() => openDetail(item)} />}
                    />
                  </ScrollView>
                )}

                {activeTab === 'search' && (
                  <View style={{ flex: 1 }}>
                    {(!isDesktop && !(Platform.OS === 'web' && isTabletOrWebSplit)) && (
                      <View style={styles.floatingMenuBtn}>
                        <Pressable onPress={() => setSidebarVisible(true)}>
                          <Ionicons name="menu" size={28} color={Colors.text} />
                        </Pressable>
                      </View>
                    )}
                    <SearchView onPlay={() => { }} />
                  </View>
                )}

                {activeTab === 'library' && (
                  <View style={{ flex: 1 }}>
                    {(!isDesktop && !(Platform.OS === 'web' && isTabletOrWebSplit)) && (
                      <View style={styles.floatingMenuBtn}>
                        <Pressable onPress={() => setSidebarVisible(true)}>
                          <Ionicons name="menu" size={28} color={Colors.text} />
                        </Pressable>
                      </View>
                    )}
                    <LibraryView onPlay={handlePlayTrack} />
                  </View>
                )}

                {activeTab === 'liked' && <PlaceholderView title="Liked Songs" onOpenSidebar={() => setSidebarVisible(true)} />}
                {activeTab === 'create' && <PlaceholderView title="Create Playlist" onOpenSidebar={() => setSidebarVisible(true)} />}
              </>
            )}
          </View>

          {!selectedItem && (
            <LinearGradient colors={['rgba(0,0,0,0.6)', 'transparent']} style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 100, pointerEvents: 'none' }} />
          )}

          {!isDesktop && track && (
            <View style={[styles.miniPlayerContainer, Platform.OS === 'web' && { bottom: 20, maxWidth: 500, alignSelf: 'center' }]}>
              <MiniPlayer
                track={track}
                isPlaying={isPlaying}
                onPlayPause={togglePlayPause}
                onPress={() => setRightSidebarVisible(true)}
                position={position}
                duration={duration}
                hasBottomNav={!isDesktop && !(Platform.OS === 'web')}
              />
            </View>
          )}

          {!isDesktop && Platform.OS !== 'web' && !selectedItem && (
            <View style={styles.bottomNav}>
              <Pressable style={styles.navItem} onPress={() => setActiveTab('home')}>
                <Ionicons name={activeTab === 'home' ? "home" : "home-outline"} size={26} color="white" />
                <Text style={[styles.navLabel, activeTab === 'home' && { color: 'white' }]}>Home</Text>
              </Pressable>
              <Pressable style={styles.navItem} onPress={() => setActiveTab('search')}>
                <Ionicons name={activeTab === 'search' ? "search" : "search-outline"} size={26} color="white" />
                <Text style={[styles.navLabel, activeTab === 'search' && { color: 'white' }]}>Search</Text>
              </Pressable>
              <Pressable style={styles.navItem} onPress={() => setActiveTab('library')}>
                <Ionicons name={activeTab === 'library' ? "library" : "library-outline"} size={26} color="white" />
                <Text style={[styles.navLabel, activeTab === 'library' && { color: 'white' }]}>Library</Text>
              </Pressable>
            </View>
          )}
        </View>

        {isDesktop ? (
          <RightSidebar track={track} isPlaying={isPlaying} onToggle={togglePlayPause} position={position} duration={duration} />
        ) : (
          <>
            <Modal
              animationType="slide"
              visible={isRightSidebarVisible}
              onRequestClose={() => setRightSidebarVisible(false)}
              statusBarTranslucent={true}
              transparent={Platform.OS === 'web'}
            >
              <View style={Platform.OS === 'web' ? styles.webModalCenter : { flex: 1 }}>
                <RightSidebar
                  track={track}
                  isPlaying={isPlaying}
                  onToggle={togglePlayPause}
                  isMobile
                  onClose={() => setRightSidebarVisible(false)}
                  position={position}
                  duration={duration}
                  onDevicePress={() => setDevicePickerVisible(true)}
                />
              </View>
            </Modal>
            <Modal animationType="slide" visible={isDevicePickerVisible} onRequestClose={() => setDevicePickerVisible(false)} statusBarTranslucent={true} transparent>
              <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' }}>
                <DevicePickerView onClose={() => setDevicePickerVisible(false)} />
              </View>
            </Modal>
          </>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#121212', paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 },
  container: { flex: 1, flexDirection: 'row' },
  mainContent: { flex: 1, position: 'relative' },
  webWrapper: { flex: 1, width: '100%', alignSelf: 'center' },

  headerRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 20, gap: 12 },
  profileIcon: { width: 35, height: 35, borderRadius: 17.5, backgroundColor: Colors.primary, justifyContent: 'center', alignItems: 'center' },
  floatingMenuBtn: { position: 'absolute', top: 50, right: 20, zIndex: 10 },
  filterContainer: { flexDirection: 'row', gap: 8 },

  gridContainer: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginBottom: 24 },
  sectionTitle: { color: 'white', fontSize: 22, fontWeight: '700', marginBottom: 16 },

  miniPlayerContainer: { position: 'absolute', bottom: 10, left: 8, right: 8, borderRadius: 8, zIndex: 50 },

  bottomNav: {
    flexDirection: 'row', backgroundColor: 'rgba(0,0,0,0.95)', height: 90, borderTopWidth: 0,
    position: 'absolute', bottom: 0, left: 0, right: 0,
    paddingBottom: Platform.OS === 'ios' ? 25 : 15, paddingTop: 10,
    justifyContent: 'space-around', alignItems: 'center', zIndex: 40
  },
  navItem: { alignItems: 'center', justifyContent: 'center' },
  navLabel: { color: '#B3B3B3', fontSize: 10, marginTop: 4 },

  webModalCenter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.8)',
    paddingVertical: 40
  }
});