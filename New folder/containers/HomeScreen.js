import React, { useEffect, useState, useRef, } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, TextInput, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import * as Font from 'expo-font';

import DeleteNoteAlert from '../components/DeleteNoteAlert';

const SuccessMessage = ({ message, onClose }) => {
  return (
    <Modal transparent visible={!!message} animationType="slide">
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>{message}</Text>
          <TouchableOpacity onPress={onClose}>
            <Text style={styles.closeText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const HomeScreen = ({ navigation }) => {
  const [notesData, setNotesData] = useState([]);
  const [deleteNoteId, setDeleteNoteId] = useState(null);
  const [sortBy, setSortBy] = useState(null);
  const [showSortOptions, setShowSortOptions] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [showSearchBar, setShowSearchBar] = useState(false);
  const alertRef = useRef(null);
  const [successMessage, setSuccessMessage] = useState('');

  const handleSuccessClose = () => {
    setSuccessMessage('');
  };


  
  
  
  const route = useRoute();
  const routeParams = route.params;

  useFocusEffect(
    React.useCallback(() => {
      // Use routeParams inside the callback
      return navigation.addListener('focus', () => {
        const message = routeParams?.successMessage || '';
        if (message) {
          setSuccessMessage(message);
        }
        refreshNotes();
      });
    }, [navigation, routeParams]) // Make sure to include routeParams in the dependency array
  );

  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    const loadFont = async () => {
      try {
        await Font.loadAsync({
        'JimNightshade-Regular': require('../assets/fonts/JimNightshade-Regular.ttf'),
        'Satisfy-Regular': require('../assets/fonts/Satisfy-Regular.ttf'),
        'Nunito': require('../assets/fonts/Nunito-Italic-VariableFont_wght.ttf'),
        'Sacramento-Regular': require('../assets/fonts/Sacramento-Regular.ttf'),
        'CarterOne-Regular': require('../assets/fonts/CarterOne-Regular.ttf'),
        'Nature': require('../assets/fonts/Nature.ttf'),
        'Brettley': require('../assets/fonts/Brettley.ttf'),
        'Houston': require('../assets/fonts/Houston.otf'),
        'InriaSerif-Regular': require('../assets/fonts/Inria_Serif/InriaSerif-Regular.ttf'),
        'InriaSerif-Bold': require('../assets/fonts/InriaSerif-Bold.ttf'),
        
        });

      setFontLoaded(true);
        } catch (error) {
      console.error("Error loading fonts", error);
        }
      };

      loadFont();
    }, []);

// useFocusEffect(
//   React.useCallback(() => {
//     const unsubscribe = navigation.addListener('focus', () => {
//       const successMessage = routeParams?.successMessage || '';
//       if (successMessage) {
//         alert(successMessage);
//       }
//       refreshNotes();
//     });

//     return unsubscribe;
//   }, [navigation, routeParams])
// );


const fetchAndSortNotes = async () => {
  try {
    const storedNotes = await AsyncStorage.getItem('notes');
    if (storedNotes !== null) {
      let parsedNotes = JSON.parse(storedNotes);
      if (sortBy === 'latestToOldest') {
        parsedNotes.sort((a, b) => moment(b.dateTime, 'MMMM DD, YYYY h:mm A ddd').valueOf() - moment(a.dateTime, 'MMMM DD, YYYY h:mm A ddd').valueOf());
      } else if (sortBy === 'alphabetically') {
        parsedNotes.sort((a, b) => a.title.localeCompare(b.title));
      }
      setNotesData(parsedNotes);
    }
  } catch (error) {
    console.error('Error fetching or sorting notes:', error);
  }
};
 
  const handleSort = (method) => {
    setSortBy(method);
    fetchAndSortNotes();
  };
 
  const refreshNotes = async () => {
    await fetchAndSortNotes();
  };
 
  useFocusEffect(() => {
    refreshNotes();
  });
 
  const handleEditNote = (id, title, note) => {
    navigation.navigate('EditNoteScreen', {
      noteId: id,
      existingTitle: title,
      existingNote: note,
    });
  };
 
  const handleDeleteNote = (id) => {
    setDeleteNoteId(id);
    alertRef.current.open();
  };
 
  const handleConfirmDelete = async () => {
    if (deleteNoteId !== null) {
      try {
        const existingNotes = await AsyncStorage.getItem('notes');
        let notes = [];
 
        if (existingNotes !== null) {
          notes = JSON.parse(existingNotes);
          const updatedNotes = notes.filter((note) => note.id !== deleteNoteId);
          await AsyncStorage.setItem('notes', JSON.stringify(updatedNotes));
          refreshNotes();
        }
      } catch (error) {
        console.error('Error deleting note:', error);
      } finally {
        alertRef.current?.close();
      }
    }
  };

  const handleProfileClick = () => {
    const { user } = route.params;
    navigation.navigate("ProfilePage", {user});
  };
 
  useEffect(() => {
    refreshNotes();
  }, [sortBy]);
 
  const renderNote = ({ item }) => {
    const truncatedNote = item.note.length > 50 ? `${item.note.substring(0, 25)}...` : item.note;

    // Use a combination of dateTime and id as key
    const uniqueKey = `${item.dateTime}-${item.id}`;

      
    return (
      <View style={styles.container}>
        {fontLoaded && (
          <TouchableOpacity
            key={uniqueKey} // Use the uniqueKey here
            style={styles.noteCard}
            onPress={() => navigation.navigate('ViewNoteScreen', { noteContent: item })}
          >
            <View style={styles.noteHeader}>
              <Text style={styles.noteTitle}>{item.title}</Text>
              <View style={styles.iconsContainer}>
                <TouchableOpacity onPress={() => handleEditNote(item.id, item.title, item.note)}>
                  <Ionicons name="create-outline" size={18} color="black" style={styles.icon} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleDeleteNote(item.id)}>
                  <Ionicons name="trash-outline" size={18} color="black" style={styles.icon} />
                </TouchableOpacity>
              </View>
            </View>
            <Text style={styles.noteContent}>{truncatedNote}</Text>
            <View style={styles.noteFooter}>
              <Text style={styles.noteDateTime}>
                {moment(item.dateTime, 'MMMM DD, YYYY h:mm:ss.SSS A ddd').format('MMM DD, YYYY h:mm A')}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      </View>
    );
    
 
  };
 
  const handleSearch = (text) => {
    setSearchText(text);
  };
 
 
 
  const filteredNotes = notesData.filter((note) => {
    return note.title.toLowerCase().includes(searchText.toLowerCase());
  });
 
  const handleProfileIconPress = () => {
    setShowSortOptions(!showSortOptions); // Toggle filter options
    setShowSearchBar(false); // Hide search bar when filter icon is clicked
    setSearchText(''); // Reset search text
  };
 
 
  const handleFilterIconPress = () => {
    setShowSortOptions(!showSortOptions); // Toggle filter options
    setShowSearchBar(false); // Hide search bar when filter icon is clicked
    setSearchText(''); // Reset search text
  };
 
  const handleSearchIconPress = () => {
    setShowSearchBar(!showSearchBar); // Toggle search bar
    setShowSortOptions(false); // Hide filter options when search icon is clicked
    setSearchText(''); // Reset search text
  };
 
 
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
          <View style={styles.titleContainer}>
          {fontLoaded && (
            <Text style={styles.titleText}>My Notes</Text> 
          )}
          </View>
 
        <View style={styles.iconsContainer}>
          <View style={styles.profileIconContainer}>
            <TouchableOpacity onPress={handleProfileClick}>
              <Ionicons name="person-circle-outline" size={30} color="black" style={styles.iconsTop} />
            </TouchableOpacity>
          </View>
 
          <View style={styles.searchAndFilterContainer}>
              <View style={styles.searchIconContainer}>
                <TouchableOpacity onPress={handleSearchIconPress}>
                  <Ionicons name="search-outline" size={30} color="black" style={styles.iconsTop} />
                </TouchableOpacity>
              </View>
 
              <View style={styles.filterIconContainer}>
                <TouchableOpacity onPress={handleFilterIconPress}>
                  <Ionicons name="filter" size={30} color="black" style={styles.iconsTop} />
                </TouchableOpacity>
              </View>
          </View>
        </View>
      </View>


      <SuccessMessage message={successMessage} onClose={handleSuccessClose} />

      


       {showSortOptions && (
        <View style={styles.sortOptions}>
          <TouchableOpacity onPress={() => handleSort('latestToOldest')}>
            <Text style={[styles.sortOptionText, styles.sortOptionMargin]}>Latest To Oldest</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleSort('alphabetically')}>
            <Text style={[styles.sortOptionText, styles.sortOptionMargin]}>Alphabetically</Text>
          </TouchableOpacity>
        </View>
      )}
 
      {showSearchBar && (
        <TextInput
          style={styles.searchBar}
          placeholder="Search notes..."
          onChangeText={handleSearch}
          value={searchText}
        />
      )}
 
      <FlatList
    data={filteredNotes}
    renderItem={renderNote}
    keyExtractor={(item) => `${item.dateTime}-${item.id}`} // Updated keyExtractor
      />
 
      <DeleteNoteAlert
        alertRef={alertRef}
        deleteNoteId={deleteNoteId}
        handleConfirmDelete={handleConfirmDelete}
      />

      <TouchableOpacity
              style={styles.addButton}
              onPress={() => navigation.navigate('AddNoteScreen')}
            >
              <View style={styles.addButtonContainer}>
              <Ionicons name="add" size={40} color="white" />
              </View>
      </TouchableOpacity>
      
   </View>
  );
};
 
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    paddingTop: 8,
    backgroundColor: '#FAF8F2',
  },
  headerContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    paddingTop: 80,
    marginBottom:15,
 
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
 
  iconsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between', // This ensures the icons are spaced evenly
    alignItems: 'center',
    marginBottom:10,
  },
 
  searchAndFilterContainer: {
    flexDirection: 'row',
    marginLeft: 'auto', // Pushes the search and filter container to the right
  },
 
  profileIconContainer: {
    marginLeft: 10,
  },
 
  searchIconContainer: {
    marginLeft: 'auto', // Pushes the search icon container to the right
    marginRight: 10,
  },
 
  filterIconContainer: {
    marginRight: 10,
  },
  topSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    paddingTop: 80,
  },
 
  titleText: {
    fontSize: 26,
    color: 'black',
    marginLeft: 0, // Adjust this margin as needed
    marginBottom: 55,
    fontFamily: 'InriaSerif-Bold'
  },
  noteCard: {
    backgroundColor: 'white',
    padding: 15,
    marginBottom: 0,
    borderRadius: 20,
    borderWidth:2,
    borderColor:'#CCCCCC',
    width: "97%",
    alignSelf: 'center',
  },
  noteHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  noteTitle: {
    fontSize: 18,
    fontFamily: 'InriaSerif-Bold',
    
  },
  noteContent: {
    fontSize: 16,
    marginTop: 0,
    marginLeft:15,
    fontFamily: 'InriaSerif-Regular'
  },
  noteDateTime: {
    fontSize: 12,
    color: '#666',
    marginTop: 5,
    textAlign: 'right',
  },
  noteFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    justifyContent: 'flex-end',
  },
 
  topIcon: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20, // Adjust this margin as needed
  },
  icon: {
    marginRight: 10,
  },
  addButtonContainer: {
    position: 'absolute',
    bottom: 2,
    right: -5,
    backgroundColor: '#E9B824',
    borderRadius: 40, // Half of the width/height to make it a perfect circle
    width: 80, // Set width to ensure it's a circle
    height: 80, // Set height to ensure it's a circle
    justifyContent: 'center', // Align the content (icon) to the center
    alignItems: 'center', // Align the content (icon) to the center
  },
 
  addButton: {
    // No need for borderRadius here
  },
 
  sortOptions: {
    backgroundColor: '#fff',
    padding: 10,
    position: 'absolute',
    top: 210,
    right: 30,
    elevation: 5,
    borderRadius: 5,
    zIndex: 1,
  },
  sortOptionMargin: {
    margin: 5,
    marginBottom: 5, 
  },
 
    sortOptionText: {
      fontSize: 17, 
      paddingVertical: 5,
    },
 
    iconsTop: {
      marginRight: 10,
    },
    searchBar: {
      backgroundColor: '#fff',
      paddingHorizontal: 10,
      paddingVertical: 8,
      marginHorizontal: 20,
      borderRadius: 8,
      marginBottom: 10,
    },
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
    },
    modalView: {
      backgroundColor: 'white',
      borderRadius: 10,
      padding: 20,
      alignItems: 'center',
      elevation: 5,
      width:300,
    },
    modalText: {
      marginBottom: 10,
      fontSize: 18,
      textAlign: 'center',
    },
    closeText: {
      color: 'blue',
      marginTop: 10,
    },
  });
 
 
 
 
 
export default HomeScreen;