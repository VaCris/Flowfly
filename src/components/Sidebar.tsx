import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

import { Colors } from '../constants/Colors';

const LogoImage = require('../assets/Logo_Flowfly_icon.png');

interface MenuItem {
    id: string;
    icon: keyof typeof Ionicons.glyphMap;
    label: string;
}

interface SidebarProps {
    onClose?: () => void;
    isMobile?: boolean;
    activeTab?: string;
    onTabChange?: (tab: string) => void;
}

export const Sidebar = ({ onClose, isMobile = false, activeTab = 'home', onTabChange }: SidebarProps) => {

    const handlePress = (tabId: string) => {
        if (onTabChange) onTabChange(tabId);
        if (isMobile && onClose) onClose();
    };

    const renderMenuItem = (item: MenuItem) => {
        const isActive = activeTab === item.id;
        return (
            <TouchableOpacity
                key={item.id}
                style={styles.menuItem}
                onPress={() => handlePress(item.id)}
            >
                <Ionicons
                    name={isActive ? item.icon : (item.icon + '-outline') as any}
                    size={24}
                    color={isActive ? Colors.text : Colors.textDim}
                />
                <Text style={[
                    styles.menuLabel,
                    isActive && { color: Colors.text, fontWeight: '700' }
                ]}>
                    {item.label}
                </Text>
                {isActive && <View style={styles.activeIndicator} />}
            </TouchableOpacity>
        );
    };

    return (
        <View style={[styles.container, isMobile && styles.mobileContainer]}>

            <View style={styles.logoArea}>
                <Image
                    source={LogoImage}
                    style={{ width: 40, height: 40, marginRight: 10 }}
                    resizeMode="contain"
                />
                <Text style={styles.logoText}>Flowfly</Text>

                {isMobile && (
                    <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
                        <Ionicons name="close" size={28} color="white" />
                    </TouchableOpacity>
                )}
            </View>

            {!isMobile && (
                <View style={styles.searchContainer}>
                    <Ionicons name="search" size={20} color={Colors.textDim} style={styles.searchIcon} />
                    <TextInput
                        placeholder="Search"
                        placeholderTextColor={Colors.textDim}
                        style={styles.searchInput}
                        onFocus={() => handlePress('search')}
                    />
                </View>
            )}

            <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Menu</Text>
                    {[
                        { id: 'home', icon: 'home', label: 'Home' },
                        { id: 'search', icon: 'search', label: 'Search' },
                        { id: 'library', icon: 'library', label: 'Library' },
                    ].map((item) => renderMenuItem(item as MenuItem))}
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Library</Text>
                    {[
                        { id: 'create', icon: 'add-circle', label: 'Create Playlist' },
                        { id: 'liked', icon: 'heart', label: 'Liked Songs' },
                    ].map((item) => renderMenuItem(item as MenuItem))}
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: 260,
        backgroundColor: Colors.sidebar,
        padding: 24,
        height: '100%',
        borderRightWidth: 1,
        borderRightColor: '#1F1F1F',
    },
    mobileContainer: {
        width: '100%',
        borderRightWidth: 0,
        paddingTop: 50,
        backgroundColor: '#000',
    },
    logoArea: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 30,
    },
    logoText: {
        color: Colors.text,
        fontSize: 24,
        fontWeight: 'bold',
        flex: 1,
    },
    closeBtn: {
        padding: 5,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.inputBg,
        borderRadius: 25,
        paddingHorizontal: 15,
        height: 45,
        marginBottom: 30,
    },
    searchIcon: { marginRight: 10 },
    searchInput: {
        flex: 1,
        color: Colors.text,
        fontSize: 14,
        height: '100%',
        ...Platform.select({
            web: { outlineStyle: 'none' } as any
        }),
    },
    section: { marginBottom: 30 },
    sectionTitle: {
        color: Colors.textDim,
        fontSize: 12,
        fontWeight: '600',
        marginBottom: 15,
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        gap: 15,
    },
    menuLabel: {
        color: Colors.textDim,
        fontSize: 16,
        fontWeight: '600',
    },
    activeIndicator: {
        position: 'absolute',
        right: -24,
        width: 4,
        height: 24,
        backgroundColor: Colors.primary,
        borderTopLeftRadius: 4,
        borderBottomLeftRadius: 4,
    }
});