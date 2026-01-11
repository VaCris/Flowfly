export interface Track {
    id: string;
    title: string;
    artist: string;
    uri: string;
    artwork: string;
    duration: string;
}

export interface User {
    id: string;
    name: string;
    avatar: string;
    followers: string;
}

export interface Playlist {
    id: string;
    title: string;
    owner: string;
    cover: string;
}

export const fetchRecentTracks = async (): Promise<Track[]> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                {
                    id: '1',
                    title: 'Electro Vibe',
                    artist: 'SoundHelix',
                    uri: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
                    artwork: 'https://picsum.photos/id/10/300/300',
                    duration: '06:12'
                },
                {
                    id: '2',
                    title: 'Twisted Logic',
                    artist: 'SoundHelix',
                    uri: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
                    artwork: 'https://picsum.photos/id/11/300/300',
                    duration: '07:05'
                },
                {
                    id: '3',
                    title: 'Night Owl',
                    artist: 'SoundHelix Library',
                    uri: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
                    artwork: 'https://picsum.photos/id/12/300/300',
                    duration: '05:44'
                },
                {
                    id: '4',
                    title: 'Melody Rain',
                    artist: 'SoundHelix',
                    uri: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
                    artwork: 'https://picsum.photos/id/13/300/300',
                    duration: '04:20'
                },
            ]);
        }, 500);
    });
};

export const fetchTrack = async (): Promise<Track> => {
    const tracks = await fetchRecentTracks();
    return tracks[0];
};

export const searchData = async (query: string) => {
    return new Promise<{ users: User[], playlists: Playlist[] }>((resolve) => {
        setTimeout(() => {
            const allUsers: User[] = [
                { id: 'u1', name: 'Maria Garcia', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d', followers: '1.2k followers' },
                { id: 'u2', name: 'Juan Perez', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026024d', followers: '450 followers' },
                { id: 'u3', name: 'Flowfly Official', avatar: 'https://i.pravatar.cc/150?u=flowfly', followers: '50k followers' },
                { id: 'u4', name: 'FKA twigs', avatar: 'https://i.pravatar.cc/150?u=fka', followers: '2M followers' },
                { id: 'u5', name: 'Hozier', avatar: 'https://i.pravatar.cc/150?u=hozier', followers: '5M followers' },
            ];

            const allPlaylists: Playlist[] = [
                { id: 'p1', title: 'Rock Classics', owner: 'Spotify', cover: 'https://picsum.photos/id/20/300/300' },
                { id: 'p2', title: 'Study Lo-Fi', owner: 'Lofi Girl', cover: 'https://picsum.photos/id/21/300/300' },
                { id: 'p3', title: 'Gym Motivation', owner: 'Juan Perez', cover: 'https://picsum.photos/id/22/300/300' },
                { id: 'p4', title: 'Top Hits 2024', owner: 'Spotify', cover: 'https://picsum.photos/id/23/300/300' },
            ];

            if (!query) {
                resolve({ users: [], playlists: [] });
                return;
            }

            const lowerQ = query.toLowerCase();
            const filteredUsers = allUsers.filter(u => u.name.toLowerCase().includes(lowerQ));
            const filteredPlaylists = allPlaylists.filter(p => p.title.toLowerCase().includes(lowerQ));

            resolve({ users: filteredUsers, playlists: filteredPlaylists });
        }, 300);
    });
};

export const importTrackFromUrl = async (url: string, platform: string): Promise<Track> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                id: `imported-${Date.now()}`,
                title: platform === 'youtube' ? 'YouTube Stream' : 'Imported Song',
                artist: 'Unknown Artist',
                uri: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
                artwork: 'https://via.placeholder.com/300',
                duration: '04:20'
            });
        }, 1500);
    });
};