// app/GlobalContextReport.jsx

import React, { useState, createContext, useEffect, useCallback } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const GlobalContextReport = createContext();

const GlobalProviderReport = ({ children }) => {
  const [apiData, setApiData] = useState({});
  const [notificationData, setNotificationData] = useState({});
  const [todayMatches, setTodayMatches] = useState({});
  const [loading, setLoading] = useState(false);

  // fetch all APIs
  const fetchAllData = useCallback(async (userid) => {
    if (!userid) return;
    console.log(userid);
    setLoading(true);
    try {
      await Promise.allSettled([
        axios
          .get('https://api.victoryvision.live/api/get-reports', {
            params: { userid },
            timeout: 10000  // Add this
          })
          .then(res => setApiData(res.data.reportResults))
          .catch(err => {
            console.error('Report error', err);
            // Optional: Set fallback empty data
            setApiData({});
          }),

        axios
          .get('https://api.victoryvision.live/api/get-notifications', {
            params: { userid },
            timeout: 10000  // Add this
          })
          .then(res => setNotificationData(res.data.notifydata))
          .catch(err => {
            console.error('Notification error', err);
            setNotificationData({});
          }),

        axios
          .get('https://api.victoryvision.live/api/current-matches', {
            timeout: 10000  // Add this
          })
          .then(res => setTodayMatches(res.data.matches || []))  // Fallback to empty array
          .catch(err => {
            console.error('Matches error', err);
            setTodayMatches([]);
          }),
      ]);
    } finally {
      setLoading(false);
    }
  }, []);

  // call fetch after login
  const init = useCallback(async () => {
    const storedData = await AsyncStorage.getItem('userData');
    const parsedData = storedData ? JSON.parse(storedData) : {};
    const userid = parsedData.userid;
    console.log('userid:', userid);
    if (userid) await fetchAllData(userid);
  }, [fetchAllData]);

  // run when component mounts OR when user logs in
  useEffect(() => {
    init();
  }, [init]);

  // expose refresh for manual trigger after login
  const refreshGlobalData = async () => {
    const storedData = await AsyncStorage.getItem('userData');
    const parsedData = storedData ? JSON.parse(storedData) : {};
    if (parsedData.userid) await fetchAllData(parsedData.userid);
  };

  return (
    <GlobalContextReport.Provider
      value={{
        apiData,
        notificationData,
        todayMatches,
        loading,
        refreshGlobalData,
      }}
    >
      {children}
    </GlobalContextReport.Provider>
  );
};

export default GlobalProviderReport;
