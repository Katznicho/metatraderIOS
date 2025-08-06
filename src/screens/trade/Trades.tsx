import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, StatusBar, Platform, ScrollView, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import CalendarImage from "../../assets/calendar.png";
import { useApi } from '../../hooks/useApi';
import AntDesign from 'react-native-vector-icons/AntDesign';
import axios from 'axios';


const Trades = () => {
  
    const { data, error, isLoading } = useApi<any>({
      endpoint: '/getTrades',
      queryOptions: {
        enabled: true,
        refetchOnWindowFocus: true,
        refetchOnMount: true,
        refetchInterval: 5000,
      },
    });


  // };

  const formatBalance = (value) => {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
      useGrouping: true,
    })
      .format(value)
      .replace(/,/g, ' '); // Replace commas with spaces
  };

    
  const [balance, setBalance] = useState(1000);
  const [equity, setEquity] = useState(0);
  const [freeMargin, setFreeMargin] = useState(0);
  const [marginLevel, setMarginLevel] = useState(0);

  const [minOpen, setMinOpen] = useState(99900);
  const [maxOpen , setMaxOpen] = useState(100000);

  const [minClose, setMinClose] = useState(99900);
  const [maxClose, setMaxClose] = useState(100000);

  const [minProfit, setMinProfit] = useState(-5);
  const [maxProfit, setMaxProfit] = useState(5);

  const [margin, setMargin] = useState(1000);

  const [minTotal, setMinTotal] = useState(100);
  const [maxTotal, setMaxTotal] = useState(1000);

  // const [total, setTotal] =  useState(140);

  const [currency, setCurrency] = useState('USD');

  //more settings
   const [minEquity, setMinEquity] = useState(100);
  const [maxEquity, setMaxEquity] = useState(1000);

   const [minFreeMargin, setMinFreeMargin] = useState(100);
  const [maxFreeMargin, setMaxFreeMargin] = useState(1000);

   const [minMarginLevel, setMinMarginLevel] = useState(100);
   const  [maxMarginLevel, setMaxMarginLevel] = useState(1000);
  //more settings

  const [positions, setPositions] = useState([]);

  useEffect(() => {
    if (data?.data) {
      setPositions(data.data);
    }
  }, [data]);



  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await fetch('https://metatrader.gianthunterai.com/api/getTradingSettings');
        console.log('Response Status:', response.status);
        console.log('Content-Type:', response.headers.get('Content-Type'));
  
        if (!response.ok) {
          const text = await response.text();
          console.log('Response Text:', text.slice(0, 200)); // Log first 200 chars
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
  
        if (!response.headers.get('Content-Type')?.includes('application/json')) {
          const text = await response.text();
          console.log('Non-JSON Response:', text.slice(0, 200));
          throw new Error('Response is not JSON');
        }
  
        const data = await response.json();
        console.log('======= Trading Settings ========');
        console.log('min_open:', data?.data?.min_open);
        console.log('======= Trading Settings ========');
  
        setMinOpen(parseFloat(data?.data?.min_open) || 0);
        setMaxOpen(parseFloat(data?.data?.max_open) || 0);
        setMinClose(parseFloat(data?.data?.min_close) || 0);
        setMaxClose(parseFloat(data?.data?.max_close) || 0);
        setMinProfit(parseFloat(data?.data?.min_profit) || 0);
        setMaxProfit(parseFloat(data?.data?.max_profit) || 0);
        setBalance(parseFloat(data?.data?.balance) || 0);
        setMargin(parseFloat(data?.data?.margin) || 0);
        setCurrency(data?.data?.currency || 'USD');
        setMinTotal(parseInt(data?.data?.min_total) || 0);
        setMaxTotal(parseInt(data?.data?.max_total) || 0);
        setMinEquity(parseInt(data?.data?.min_equity) || 0);
        setMaxEquity(parseInt(data?.data?.max_equity) || 0);
        setMinFreeMargin(parseInt(data?.data?.min_free_margin) || 0);
        setMaxFreeMargin(parseInt(data?.data?.max_free_margin) || 0);
        setMinMarginLevel(parseInt(data?.data?.min_margin_level) || 0);
        setMaxMarginLevel(parseInt(data?.data?.max_margin_level) || 0);
      } catch (error) {
        console.log('Error fetching settings:');
        console.error(error);
        console.log('Error fetching settings');
      }
    };
  
    fetchSettings();
    const interval = setInterval(fetchSettings, 5000); // Increased to 5s to avoid rate limits
  
    return () => clearInterval(interval);
  }, []);

  // Function to generate random number within a range
  const getRandomNumber = (min: number, max: number) => (Math.random() * (parseInt(max) - parseInt(min)) +parseInt(min))?.toFixed(2);




  const [total, setTotal] = useState(140);
  //const [positions, setPositions] = useState([]); // Ensure you have positions initialized
  
  const updatePositions = () => {
      
    setPositions((prevPositions) => {
      const updatedPositions = prevPositions.map((pos, index) => {
        let previousProfit = index > 0 ? prevPositions[index - 1].profit : pos.profit;
        let change = parseFloat(getRandomNumber(-1.1, 1.7)); 
        let newProfit = previousProfit + change;
  
          //  console.log(data?.data[index]?.close);
        return {
          ...pos,
          open: pos?.open, 
          close: parseFloat(getRandomNumber(data?.data[index]?.close, data?.data[index]?.max_close)),
          profit: parseFloat(newProfit.toFixed(2)), 
        };
      });
  
      // Update total profit
      const newTotal = updatedPositions.reduce((sum, pos) => sum + pos.profit, 0);
      setTotal(parseFloat(newTotal.toFixed(2))); 
  
      return updatedPositions;
    });
  };

  //Equity = Total + Balance
  // const [equity, setEquity] = useState(0);
  ///Margin = Balance/9.8
  //Free margin = Magin * 0.24
  //Margin level (%) = (Equity*100)/Magine
  
  
  // Run updatePositions every 800ms
  useEffect(() => {
    const interval = setInterval(updatePositions, 1200);
    return () => clearInterval(interval);
  }, []);
  


  // Update positions at regular intervals
  useEffect(() => {
    const interval = setInterval(updatePositions, 1200); // Update every 2 seconds
    return () => clearInterval(interval); // Cleanup on component unmount
  }, [minClose, maxClose, minOpen, maxOpen, minProfit, maxProfit]);

  // Recalculate financial metrics when positions update
  useEffect(() => {
    const totalProfit = positions?.reduce((acc, pos) => acc + pos?.profit, 0);
    const updatedEquity = balance + totalProfit;
    const updatedFreeMargin = parseFloat(updatedEquity) - parseFloat(margin);
    const updatedMarginLevel = parseInt(margin) > 0 ? (updatedEquity / margin) * 100 : 0;

    setEquity(updatedEquity);
    setFreeMargin(updatedFreeMargin);
    setMarginLevel(updatedMarginLevel);
  }, [positions]);

  const renderPositionItem = (item) => (
    <View key={item.id} style={styles.positionRow}>
      <View style={styles.positionDetails}>
        <Text style={styles.positionSymbol}>
          {item.symbol}{" "}
          <Text style={{ color: item.type === 'buy' ? '#0D71F3' : '#DE4949' }}>
            {item.type} {item.lot}
          </Text>
        </Text>
        <Text style={styles.positionPrice}>
          {Number(item?.open).toFixed(3)} → {!isNaN(item?.close) ? Number(item?.close).toFixed(3) : Number(item?.open).toFixed(3)}
        </Text>
      </View>
      <Text
        style={[
          styles.positionProfit,
          item.profit > 0 ? styles.profitPositive : styles.profitNegative,
        ]}
      >
        {item.profit.toFixed(2)}
      </Text>
    </View>
  );
  

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      {Platform.OS === 'ios' && <View style={{ height: StatusBar.currentHeight || 40 }} />}

      {/* Fixed Header */}
      <View style={styles.header}>
        <Image source={CalendarImage} style={styles.icon} />
        <Text style={styles.headerTitle}>{formatBalance(total)} {currency}</Text>
        {/* <Icon name="add-outline" size={24} style={styles.icon} /> */}
        <Image source={require("../../assets/plus_trade.png")} style={{ 
                resizeMode: 'contain',
                width: 20,
                height: 20,
                // fontWeight: 'bold',
          }}/>
      </View>

      {/* Scrollable Content */}
      <ScrollView 
      stickyHeaderIndices={[1]} contentContainerStyle={{ paddingBottom: 16 }}
      showsVerticalScrollIndicator={false}
      >
        {/* Non-scrollable Info Section */}
        <View style={styles.infoSection}>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Balance:</Text>
            <Text style={styles.infoValue}>{formatBalance(parseFloat(balance))}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Equity:</Text>
            <Text style={styles.infoValue}>{formatBalance(parseFloat(total) + parseFloat(balance))}</Text>
          </View>
          {/* <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Margin:</Text>
            <Text style={styles.infoValue}>{formatBalance(parseFloat(balance)/9.8)}</Text>
          </View> */}
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Free Margin:</Text>
            <Text style={styles.infoValue}>{formatBalance(parseFloat(total) + parseFloat(balance))}</Text>
          </View>
          {/* <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Margin Level (%):</Text>
            <Text style={styles.infoValue}>{formatBalance(((parseFloat(total) + parseFloat(balance))*100) / (parseFloat(balance)/9.8))}</Text>
          </View> */}
        </View>

        {/* Fixed "Positions" Header */}
        <View style={styles.fixedSectionTitle}>
          <View style={{flexDirection:"row", justifyContent:"space-between", alignItems:"center"}}>
          <Text style={styles.sectionTitle}>Positions</Text>
          {/* <Text>...</Text> */}
          {/* <AntDesign name="ellipsis1" size={26} style={styles.icon} color={'grey'} /> */}
          <Image source={require("../../assets/dots.png")} style={{ 
                resizeMode: 'contain',
                width: 20,
                height: 20,
                // fontWeight: 'bold',
          }}/>

          </View>

        </View>

        {/* Scrollable Positions Section */}
        <View>
          {positions.length>0 && positions.map((position) => renderPositionItem(position))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#fff',
    elevation: 2,
    zIndex: 1,
    marginTop: 10
  },
  headerTitle: {
    fontWeight: 'bold',
    fontSize: 23,
    color:"#0D71F3",
    fontFamily: "RobotoCondensed-SemiBold",
    transform: [{ scaleY: 1.35 }],
  },
  icon: {
    resizeMode: 'contain',
    width: 24,
    height: 24,
    fontWeight: 'bold',
    
  },
  infoSection: {
    paddingVertical: 12,
    paddingHorizontal: 5,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 2,
  },
  infoLabel: {
    color: '#000',
    fontSize: 14.5,
    //  fontFamily: "RobotoCondensed-SemiBold",
    transform: [{ scaleY: 1.2 }],
  },
  infoValue: {
    fontSize: 16,
    color: '#333',
    fontWeight: '600',
    // fontFamily: "RobotoCondensed-SemiBold",
     transform: [{ scaleY: 1.2 }],
  },
  fixedSectionTitle: {
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 16,
    paddingVertical: 4,
    elevation: 3,
    zIndex: 1,
    fontFamily: "RobotoCondensed-SemiBold",
    transform: [{ scaleY: 1.2 }],
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  sectionTitle: {
    fontSize: 16,
    marginLeft:-10,
    fontWeight: 'bold',
    color: '#333',
    fontFamily: "RobotoCondensed-SemiBold",
    transform: [{ scaleY: 1.2 }],
  },
  positionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  positionDetails: {
    flex: 1,
  },
  positionSymbol: {
    fontSize: 17,
    fontWeight: '700',
    color: '#333',
    fontFamily: "RobotoCondensed-SemiBold",
    transform: [{ scaleY: 1.3 }],
  },
  positionPrice: {
    color: '#000',
    fontSize: 15,
    // fontFamily: "RobotoCondensed-SemiBold",
    // transform: [{ scaleY: 1.3 }],
  },
  positionProfit: {
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'right',
    minWidth: 50,
    fontFamily: "RobotoCondensed-SemiBold",
    transform: [{ scaleY: 1.4 }],
  },
  profitPositive: {
    color: '#0D71F3',
    fontSize: 23,
    fontFamily: "RobotoCondensed-SemiBold",
    transform: [{ scaleY: 1.3 }],
  },
  profitNegative: {
    color: '#DE4949',
    fontSize: 23,
    fontFamily: "RobotoCondensed-SemiBold",
    transform: [{ scaleY: 1.3 }],
  },
});

export default Trades;