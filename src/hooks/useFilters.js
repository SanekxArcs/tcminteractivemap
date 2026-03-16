import { useState, useCallback } from 'react';
import { PLAYLISTS, ACTIVITIES, MISC_ITEMS, RIVALS_ITEMS } from '../data/playlistConfig';

function buildInitialState() {
  const playlists = {};
  PLAYLISTS.forEach(p => { playlists[p.filterKey] = true; });

  const activities = {};
  ACTIVITIES.forEach(a => { activities[a.id] = true; });

  const misc = {};
  MISC_ITEMS.forEach(m => { misc[m.id] = true; });

  const rivals = {};
  RIVALS_ITEMS.forEach(r => { rivals[r.id] = false; }); // rivals off by default

  return { playlists, activities, misc, rivals };
}

export function useFilters() {
  const [filters, setFilters] = useState(buildInitialState);

  const togglePlaylist = useCallback((key) => {
    setFilters(prev => ({
      ...prev,
      playlists: { ...prev.playlists, [key]: !prev.playlists[key] },
    }));
  }, []);

  const toggleActivity = useCallback((key) => {
    setFilters(prev => ({
      ...prev,
      activities: { ...prev.activities, [key]: !prev.activities[key] },
    }));
  }, []);

  const toggleMisc = useCallback((key) => {
    setFilters(prev => ({
      ...prev,
      misc: { ...prev.misc, [key]: !prev.misc[key] },
    }));
  }, []);

  const toggleRival = useCallback((key) => {
    setFilters(prev => ({
      ...prev,
      rivals: { ...prev.rivals, [key]: !prev.rivals[key] },
    }));
  }, []);

  const setAllPlaylists = useCallback((value) => {
    setFilters(prev => {
      const playlists = {};
      Object.keys(prev.playlists).forEach(k => { playlists[k] = value; });
      return { ...prev, playlists };
    });
  }, []);

  const hideAll = useCallback(() => {
    setFilters(prev => {
      const playlists = {};
      Object.keys(prev.playlists).forEach(k => { playlists[k] = false; });
      const activities = {};
      Object.keys(prev.activities).forEach(k => { activities[k] = false; });
      const misc = {};
      Object.keys(prev.misc).forEach(k => { misc[k] = false; });
      return { ...prev, playlists, activities, misc };
    });
  }, []);

  const showAll = useCallback(() => {
    setFilters(prev => {
      const playlists = {};
      Object.keys(prev.playlists).forEach(k => { playlists[k] = true; });
      const activities = {};
      Object.keys(prev.activities).forEach(k => { activities[k] = true; });
      const misc = {};
      Object.keys(prev.misc).forEach(k => { misc[k] = true; });
      return { ...prev, playlists, activities, misc };
    });
  }, []);

  // Toggle all playlists in a group (used by section headers)
  const toggleSection = useCallback((section) => {
    setFilters(prev => {
      const group = prev[section];
      const anyOn = Object.values(group).some(Boolean);
      const updated = {};
      Object.keys(group).forEach(k => { updated[k] = !anyOn; });
      return { ...prev, [section]: updated };
    });
  }, []);

  return {
    filters,
    togglePlaylist,
    toggleActivity,
    toggleMisc,
    toggleRival,
    setAllPlaylists,
    hideAll,
    showAll,
    toggleSection,
  };
}
