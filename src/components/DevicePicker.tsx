import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Colors } from '../constants/Colors';

export const DevicePickerView = ({ onClose }: { onClose: () => void }) => {
    return (
        <View style={styles.deviceContainer}>
            <View style={styles.deviceHeader}>
                <View style={{ flex: 1 }} />
                <Text style={styles.deviceTitle}>Listening on</Text>
                <Pressable onPress={onClose} style={{ flex: 1, alignItems: 'flex-end' }}>
                    <Ionicons name="close" size={24} color="white" />
                </Pressable>
            </View>

            <View style={{ alignItems: 'center', marginBottom: 30 }}>
                <Ionicons name="phone-portrait" size={24} color={Colors.primary} style={{ marginBottom: 5 }} />
                <Text style={styles.currentDeviceText}>This Phone</Text>
            </View>

            <Text style={styles.deviceSectionTitle}>Select a device</Text>

            <View style={styles.deviceRow}>
                <Ionicons name="tv-outline" size={30} color="white" style={{ marginRight: 15 }} />
                <View>
                    <Text style={styles.deviceName}>BRAVIA 4K GB</Text>
                    <Text style={styles.deviceSub}>Google Cast</Text>
                </View>
            </View>

            <View style={styles.deviceRow}>
                <Ionicons name="laptop-outline" size={30} color="white" style={{ marginRight: 15 }} />
                <View style={{ flex: 1 }}>
                    <Text style={styles.deviceName}>Momitha's MacBook Pro</Text>
                </View>
                <Ionicons name="ellipsis-horizontal" size={20} color="#B3B3B3" />
            </View>

            <View style={styles.deviceRow}>
                <Ionicons name="bluetooth-outline" size={30} color="white" style={{ marginRight: 15 }} />
                <Text style={styles.deviceName}>Airplay or Bluetooth</Text>
            </View>

            <View style={styles.groupSessionCard}>
                <Text style={styles.groupTitle}>Start a Group Session</Text>
                <Text style={styles.groupSub}>Listen with friends, in real time.</Text>
                <View style={{ alignItems: 'center', marginTop: 15 }}>
                    <Image source={{ uri: 'https://i.pravatar.cc/150' }} style={{ width: 40, height: 40, borderRadius: 20, marginBottom: 10 }} />
                    <Pressable style={styles.groupBtn}>
                        <Text style={styles.groupBtnText}>Start Session</Text>
                    </Pressable>
                    <Text style={styles.scanText}>Scan to join</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    deviceContainer: { backgroundColor: '#121212', borderTopLeftRadius: 15, borderTopRightRadius: 15, padding: 25, height: '85%', width: '100%' },
    deviceHeader: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: 40 },
    deviceTitle: { color: 'white', fontSize: 16, fontWeight: '700' },
    currentDeviceText: { color: Colors.primary, fontSize: 14, fontWeight: '600' },
    deviceSectionTitle: { color: 'white', fontSize: 16, fontWeight: '700', marginBottom: 20 },
    deviceRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 25 },
    deviceName: { color: 'white', fontSize: 16, fontWeight: '500' },
    deviceSub: { color: '#B3B3B3', fontSize: 12 },
    groupSessionCard: { marginTop: 20, padding: 20 },
    groupTitle: { color: 'white', fontSize: 18, fontWeight: '700', textAlign: 'center', marginBottom: 5 },
    groupSub: { color: '#B3B3B3', fontSize: 13, textAlign: 'center' },
    groupBtn: { backgroundColor: '#1DB954', paddingVertical: 12, paddingHorizontal: 40, borderRadius: 30, marginBottom: 15 },
    groupBtnText: { color: 'black', fontWeight: 'bold', fontSize: 14 },
    scanText: { color: '#B3B3B3', fontSize: 12, textTransform: 'uppercase', letterSpacing: 1, borderWidth: 1, borderColor: '#555', paddingVertical: 8, paddingHorizontal: 20, borderRadius: 20 },
});