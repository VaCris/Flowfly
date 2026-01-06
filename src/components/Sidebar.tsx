import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Image, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Logo from '../assets/Logo_Flowfly_icon.png';
import { Colors } from '../constants/Colors';

interface MenuItem {
    icon: keyof typeof Ionicons.glyphMap;
    label: string;
    active: boolean;
}

const MenuSection = ({ title, items }: { title: string, items: MenuItem[] }) => (
    <View style={styles.section}>
        <Text style={styles.sectionTitle}>{title}</Text>
        {items.map((item, index) => (
            <TouchableOpacity key={index} style={styles.menuItem}>
                <Ionicons
                    name={item.icon}
                    size={22}
                    color={item.active ? Colors.primary : Colors.textDim}
                />
                <Text style={[
                    styles.menuLabel,
                    item.active && { color: Colors.text, fontWeight: '600' }
                ]}>
                    {item.label}
                </Text>
                {item.active && <View style={styles.activeIndicator} />}
            </TouchableOpacity>
        ))}
    </View>
);

export const Sidebar = () => {
    return (
        <View style={styles.container}>
            <View style={styles.logoArea}>
                <Image
                    source={Logo}
                    style={{ width: 70, height: 75}} 

                />

                <Text style={styles.logoText}>Flowfly</Text>
            </View>

            <View style={styles.searchContainer}>
                <Ionicons name="search" size={20} color={Colors.textDim} style={styles.searchIcon} />
                <TextInput
                    placeholder="Search"
                    placeholderTextColor={Colors.textDim}
                    style={styles.searchInput}
                />
            </View>

            <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
                <MenuSection title="Menu" items={[
                    { icon: 'home', label: 'Home', active: true },
                    { icon: 'play-circle-outline', label: 'Playlists', active: false },
                    { icon: 'person-outline', label: 'Artists', active: false },
                    { icon: 'headset-outline', label: 'Composers', active: false },
                ]} />

                <MenuSection title="Library" items={[
                    { icon: 'albums-outline', label: 'Albums', active: false },
                    { icon: 'musical-notes-outline', label: 'Songs', active: false },
                    { icon: 'film-outline', label: 'Music Videos', active: false },
                ]} />

                <MenuSection title="Other" items={[
                    { icon: 'settings-outline', label: 'Settings', active: false },
                    { icon: 'log-out-outline', label: 'Log out', active: false },
                ]} />
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: 260,
        backgroundColor: Colors.sidebar,
        padding: 30,
        height: '100%',
        borderRightWidth: 1,
        borderRightColor: '#1F1F1F',
    },
    logoArea: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        marginBottom: 30,
    },
    logoText: {
        color: Colors.text,
        fontSize: 28,
        fontWeight: '500',
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.inputBg,
        borderRadius: 25,
        paddingHorizontal: 15,
        height: 45,
        marginBottom: 40,
    },
    searchIcon: { marginRight: 10 },
    searchInput: {
        flex: 1,
        color: Colors.text,
        fontSize: 14,
        height: '100%',
        //outlineStyle: 'none',
        ...Platform.select({
            web: { outlineStyle: 'none' } as any
        }),
    },
    section: { marginBottom: 35 },
    sectionTitle: {
        color: Colors.textDim,
        fontSize: 12,
        fontWeight: '600',
        marginBottom: 15,
        textTransform: 'capitalize',
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        gap: 15,
    },
    menuLabel: {
        color: Colors.textDim,
        fontSize: 15,
        fontWeight: '500',
    },
    activeIndicator: {
        position: 'absolute',
        right: -30,
        width: 3,
        height: 20,
        backgroundColor: Colors.primary,
    }
});