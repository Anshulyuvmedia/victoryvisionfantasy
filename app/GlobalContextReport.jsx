import React, { useState, createContext, useEffect } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const GlobalContextReport = createContext();
export const GlobalProviderReport = ({ children }) => {
  const [apiData, setApiData] = useState({});
  const [notificationapiData, setnotificationapiData] = useState({});
  const [todaymatches, settodaymatches] = useState({});

  const fetchReport = async () => {
    const storedData = await AsyncStorage.getItem('userData');
    const parsedData = storedData ? JSON.parse(storedData) : {};
    const userid = parsedData.userid;
    // console.log("GLOBAL USER userid :", userid);

    try {
      const response = await axios.get(`https://api.victoryvision.live/api/get-reports`, {
        params: { userid }
      });

      //console.log('Global Data:', JSON.stringify(response.data.reportResults, null, 2));
      setApiData(response.data.reportResults);
    } catch (error) {
      console.error('Global failed:', error);
      setisLoading(false);
    }
  };

  const fetchNotifications = async () => {
    const storedData = await AsyncStorage.getItem('userData');
    const parsedData = storedData ? JSON.parse(storedData) : {};
    const userid = parsedData.userid;
    // console.log("GLOBAL USER userid :", userid);

    try {
      const response = await axios.get(`https://api.victoryvision.live/api/get-notifications`, {
        params: { userid }
      });

      // console.log('Notifacation Data:', JSON.stringify(response.data.notifydata, null, 2));
      setnotificationapiData(response.data.notifydata);
    } catch (error) {
      console.error('Global failed:', error);
      setisLoading(false);
    }
  };

  const fetchCurrentMatches = async () => {
    try {
      const response = await axios.get(`https://api.victoryvision.live/api/current-matches`,
      );
      // console.log('Current Matches:', response.data.matches);
      settodaymatches(response.data.matches);
    } catch (error) {
      console.error('Global failed:', error);
      setisLoading(false);
    }
  };

  useEffect(() => {
    fetchReport();
    fetchNotifications();
    fetchCurrentMatches();
  }, []);


  return (
    <GlobalContextReport.Provider value={{ apiData, notificationapiData,todaymatches }}>
      {children}
    </GlobalContextReport.Provider>
  );
};